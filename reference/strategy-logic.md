# 戦略導出ロジック仕様 (strategy-logic.md)

> **この文書の位置づけ:** BRAST の心臓部。「集めた情報から、どういうロジックで毎週の戦略を導くか」を定義する。
> Long さんが「情報は習得できたが、そこから戦略にするアルゴリズム/ロジックが決まらない」と止まっている、まさにその部分の v1 仕様。
> これは同時に、UI の「推論グラフ（Salesforce 的プログレス＋ドリルダウン）」のノード定義にもなる。各ステージ = 1ノード。
>
> **v1 / 叩き台。** 確定ではなく、Long さんと回しながら詰める前提。確定できない箇所は「要確認」と明記。

---

## 0. なぜこのロジックが要るか

現状のプロトタイプは戦略スライドの**出力**だけが立派で、「**なぜその戦略なのか**」が辿れない。岡本さんの核心的な問い ―「このアウトプットは何を根拠に正しいと言えるのか」― は、この導出ロジックを定義し可視化して初めて答えられる。

設計原則：**決定論的に説明できる骨格 ＋ 要所だけ LLM 判断**。全部を LLM のブラックボックスにしない。各ステージは「入力（根拠）→ 操作 → 出力（結論）」を構造体で持ち、UI からドリルダウンできる。

---

## 1. 全体の位置づけ（パイプライン内）

```
① ナレッジベース
② ブランド運用ルール（★新設・brand-rules。制約＆KPIを供給）
③ トレンド調査 + 競合調査（情報習得。ここまでは習得済み）
────────────────────────────────────────────
④ 戦略導出 ◀━━ この文書（S1〜S6）
────────────────────────────────────────────
⑤ メディアプラン → コンテンツ生成 → 多段レビュー → スコア
⑥ 人間レビュー → 配信 → 結果計測
```

④の入力は ①②③ の出力。④の出力（戦略ベット群＋メディアプラン）が⑤の入力になる。

---

## 2. 入力（Inputs）

| 入力 | 供給元 | 形 |
|---|---|---|
| `brandKnowledge` | ① | ミッション/提供価値/強み軸/ポジショニング/トーン |
| `brandRules` | ② | ガードレール（禁止/必須）＋KPI＋出面(チャネル)戦略 ★新 |
| `trendSignals[]` | ③ | 各信号: { topic, sources[], magnitude, velocity, recency } |
| `competitorCoverage[]` | ③ | 競合がどのトピックをどの角度でどれだけ発信しているか |
| `selfCoverage[]` | ③ | 自社が当該トピックをどれだけ発信済みか（=空白の裏返し） |

---

## 3. ステージ定義（S1〜S6）＝推論グラフのノード

### S1. 信号の選別（Relevance Filtering）★Longの実機バグの解決点

**問題:** 現状、BCP のリサーチに「仙台市議会中継」「アパレル備品管理DX」など無関連が混入している。原因は**キーワード一致**で拾っているから。

**解決:** キーワード一致ではなく、ブランドの**概念定義に照らした関連度判定**を行う。
- まず②③の段階で、対象テーマの*概念境界*を LLM に定義させて保持する。
  例: 「BCP = 災害時の事業継続だけでなく、補助金・経営持続まで含む経営継続の概念」。この境界定義を持った上で、各候補が概念に入るかを判定する。
- 各候補信号に **relevanceScore (0–100)** を付ける。算出は LLM 判断（概念適合）＋ 機械的特徴（出典の質、トピック一致度）の合成。
- しきい値（暫定 60）未満は除外。除外理由も保持（UIで「なぜ落としたか」を見せると信頼が上がる）。

出力: `scoredSignals[] = { topic, relevanceScore, conceptMatchReason, magnitude, velocity, recency, sources[] }`

> ⚠️ 要確認: relevance しきい値 60、概念境界の定義をどこまで人間が編集可能にするか。

### S2. 機会（空白）の検出（White-space Detection）★戦略の核

需要があり、自社の強みに合い、競合が手薄な交点＝ホワイトスペースを抽出する。

各トピックについて：
```
demand        = f(relevanceScore, magnitude, velocity)      // 世の中の需要
brandFit      = 強み軸との適合度 (LLM, 0–100)                // 自社が語る資格
competitorGap = 1 - normalize(competitorCoverage[topic])    // 競合の手薄さ
selfGap       = 1 - normalize(selfCoverage[topic])          // 自社の未発信度

opportunityScore = w1*demand + w2*brandFit + w3*competitorGap + w4*selfGap
```
- 重み `w1..w4` は config 定数（暫定 0.35 / 0.30 / 0.20 / 0.15）。
- `competitorGap` が高い＝「競合が解説で先行しているが、保守・運用の現実は空白」のような*角度の空白*も含む（単なる量だけでなく、カバーされている角度を見る）。

出力: `opportunities[] = { topic, opportunityScore, demand, brandFit, competitorGap, selfGap, angle }`
（`angle` = 「競合が手薄な切り口」。例: 実装・運用・マルチベンダー移行の現実）

### S3. 目的への割付（Intent Assignment）

各機会を、②の KPI に照らして **定常発信（信頼）** か **キャンペーン（CV）** に分類。
- 期限/イベント性が強い、CV に直結 → キャンペーン（期間付き）。
- 継続的に専門性を積む性質 → 定常発信。
- 分類は「どの KPI に効くか」を根拠として保持する。

出力: 各 opportunity に `intent ∈ {steady, campaign}` と `targetKPI` を付与。

### S4. 戦略ベットの定式化（Strategy Bet Formulation）

各機会を、実行可能な「賭け」に変換する。これがスライド「戦略」の中身であり、推論グラフの中核ノード。

```
StrategyBet = {
  id,
  thesis,            // 一文の主張（例: 制度改定の窓で『実装と運用の現実』で指名を取る）
  basisSignals[],    // 根拠にした scoredSignals の id（→ドリルダウンで実データへ）
  angle,             // S2 の差別化角度
  channels[],        // ②の出面戦略から選択
  intent, targetKPI, // S3
  expectedOutcome,   // 期待成果（ブランドイメージ/フィードバック/CV見込み）
  priority           // 後述
}
priority = impact(期待成果) × brandFit × feasibility
```

S4 は「市場分析エージェントの結論」「競合分析エージェントの結論」を**統合（Strategy Orchestrator）**して bet を作る、現プロトタイプの戦略スライドの構造と一致する。違いは、各 bet が `basisSignals[]` で根拠に逆リンクし、辿れること。

### S5. ブランド規範チェック（Brand Conformance Gate）★第3の柱と接続

各 `StrategyBet`（および後段の各コンテンツ）を、②の `brandRules` のガードレールに照合する。
- 適合 → 通過。
- 逸脱 → 除外、または「ルール X に反します。それでも実行しますか？」と人間に確認（＝山本さんが要求した押し返し挙動）。
- この判定は**外部からの修正指示にも適用**する（content-edit chat 経由の指示がブランドに反する場合に跳ね返す）。

出力: 各 bet に `conformance ∈ {pass, violation(ruleId, reason)}`。

### S6. メディアプラン化（Plan Materialization）

通過した bet を具体物に展開：
- bet → 必要なコンテンツ群（記事/SNS/配布資料）× チャネル × スケジュール。
- 「必要な数だけ必要な媒体に」出す（記事1本2本に限定しない）。
- 各コンテンツは生成元の bet に逆リンク（traceability）。

出力: `mediaPlan = { pieces[]: { title, channels[], schedule, fromBet, intent } }`
→ これが⑤コンテンツ生成への入力。

---

## 4. データ構造まとめ（実装の単一の真実）

```ts
ScoredSignal      { topic; relevanceScore; conceptMatchReason; magnitude; velocity; recency; sources[] }
Opportunity       { topic; opportunityScore; demand; brandFit; competitorGap; selfGap; angle }
StrategyBet       { id; thesis; basisSignals[]; angle; channels[]; intent; targetKPI;
                    expectedOutcome; priority; conformance }
MediaPlanPiece    { title; channels[]; schedule; fromBet; intent }
WeeklyStrategy    { week; tenant; channel; bets[]; mediaPlan; reasoningTrace }
```
`reasoningTrace` = S1〜S6 各ノードの { inputsRef, operation, outputsRef } の連鎖。**UIの推論グラフはこれを描画する。**

---

## 5. 推論グラフUIへの写像（Pillar 1）

S1〜S6 がそのまま Salesforce 的ステージ（プログレス）になる：

```
[S1 信号選別] → [S2 空白検出] → [S3 目的割付] → [S4 戦略ベット] → [S5 規範チェック] → [S6 プラン化]
```
- 各ステージをクリック → そのノードの「入力した根拠 / 適用したルール・重み / 出した結論」を表示。
- 結論（スライドの主張）から「← この戦略ベット ← この opportunity ← この signal（実データ）」と下流から上流へドリルダウン。
- これで「何を根拠に正しいか」が常に辿れる。スライドは各ノードの*詳細表示*に格下げ。

---

## 6. 何が決定論で、何が LLM 判断か（実装指針）

- **決定論（コード）:** opportunityScore/priority の合成、しきい値判定、KPI割付の規則、規範ゲートの突合、traceability の保持。
- **LLM 判断:** 概念境界の定義、conceptMatch、brandFit、angle 抽出、thesis 文の生成、規範違反の説明文。
- LLM 判断には必ず「根拠と理由」を構造化出力させ、`reasoningTrace` に格納する（後で人間が辿れるように）。

---

## 7. ワークドエグザンプル（JRC 医療IT・概略）

S1: 厚労省/業界紙から信号収集 → 「電子カルテ情報共有サービス本格運用接近」relevance 96、無関連は除外。
S2: 需要高 × 強み軸（実装・運用の現実）適合 × 競合は解説止まりで角度に空白 → opportunityScore 高、angle=「保守・運用・マルチベンダー移行の現実」。
S3: 施行期限あり・CV直結 → campaign。並行して ORCA 実務は steady。
S4: bet「本格運用の窓で“実装と運用の現実”の角度で指名を取る」、basisSignals=該当信号群。
S5: トーン規範（不安を煽らない/薬機法）に照合 → pass。
S6: 記事4本（解説/加算実務/チェックリスト/早見表）× オウンド/X/LinkedIn × スケジュール化。

各段が逆リンクで辿れる ＝ グラスボックス。

---

## 8. 未確定（要確認）

- relevance しきい値（暫定60）、opportunity 重み w1..w4（暫定 0.35/0.30/0.20/0.15）。
- 概念境界・重みを人間が編集可能にする範囲。
- multi-source（Web＋TikTok/YouTube/SNS/ニュース/検索順位）の統合重み。
- 規範違反時のデフォルト挙動（自動除外 か 人間確認 か）。
