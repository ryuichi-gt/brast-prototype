import type { TenantBundle } from "../types";

/**
 * ツズリー / BCP — 事業継続ソリューション.
 * The pilot tenant from the transcript (Matsui's account).
 */
export const bcp: TenantBundle = {
  tenant: {
    id: "bcp",
    name: "ツズリー / BCP",
    unit: "事業継続ソリューション",
    channels: ["オウンドメディア", "X"],
  },

  briefing: {
    weekLabel: "防災需要ウィーク",
    weekPill: { code: "2026 W25", date: "6/16" },
    deckSubtitle: "AIが全工程を自走 · あなたの承認待ち",
    pipeline: [
      { key: "know", n: "ナレッジ更新", d: "自社サイト・公開資料を再走査し差分を検出", meta: "差分 2件", state: "done" },
      { key: "trend", n: "トレンド調査", d: "災害・制度・SNSをリアルタイム収集", meta: "毎週月 06:00 自動 · ライブ", state: "done" },
      { key: "strat", n: "戦略統合", d: "複数エージェントの結論を統合し週次戦略を決定", meta: "2エージェントを統合", state: "done" },
      { key: "gen", n: "コンテンツ生成", d: "戦略に基づき記事・SNS草稿を生成", meta: "5本生成", state: "done" },
      { key: "img", n: "画像生成", d: "各記事のキービジュアルを生成", meta: "3点生成", state: "done" },
      {
        key: "review",
        n: "多段レビュー",
        d: "4体の審査エージェントが並列審査",
        meta: "1件差し戻し",
        state: "done",
        subs: ["AIライティング検知", "法務・景表法", "レピュテーション", "IR・専門"],
      },
      { key: "score", n: "スコアリング", d: "90点しきい値で人間レビュー要否を判定", meta: "平均 91 / 100", state: "done" },
      { key: "you", n: "あなたのレビュー", d: "プレゼンを承認、または該当工程へ差し戻し", meta: "判断待ち", state: "you" },
      { key: "dist", n: "配信", d: "承認後、各チャネルへ自動／手動で配信", meta: "承認後に起動", state: "pending" },
    ],
    titles: {
      summary: "防災需要の急上昇を軸に、定常の啓発発信＋導入促進キャンペーンの2本立てを提案します",
      knowledge: "サービス内容と事例に更新候補。承認で以降の戦略に反映します",
      trend: "地震報道によるBCP検索需要の急上昇が、今週の最大のトレンド信号です",
      competitor: "競合が割引・煽り型で先行。誠実なトーンで空白を取りに行くべきです",
      strategy: "なぜこの戦略か — 各エージェントの結論と統合",
      plan: "今週の具体プラン — 5本を生成済み、うち4本がしきい値通過",
      schedule: "配信スケジュール — 全チャネル自動連携",
    },
    slides: {
      summary: {
        lead: "防災月間と直近の地震報道で、<b>BCP（事業継続）への関心</b>が急上昇しています。<b>定常的な啓発発信</b>に加え、需要の波を捉えた<b>導入促進キャンペーン</b>を提案します。",
        kpis: [
          { v: "5", unit: "本", l: "生成済みコンテンツ", d: "▲ 先週 +1", dTone: "up" },
          { v: "2", unit: "ch", l: "配信チャネル", d: "自動2 / 手動0" },
          { v: "91", unit: "/100", l: "平均審査スコア", d: "1本がしきい値未満", dTone: "warn" },
          { v: "~22", unit: "k", l: "想定リーチ（週）", d: "▲ +35%", dTone: "up" },
        ],
        tracks: [
          {
            kind: "steady",
            title: "定常発信",
            tag: "継続",
            body: "BCPの基礎知識と実務をわかりやすく届ける啓発コンテンツ。中長期の信頼を積み上げる。",
            meta: [
              { k: "記事", v: "2本" },
              { k: "SNS", v: "4投稿" },
              { k: "目的", v: "認知・信頼" },
            ],
          },
          {
            kind: "camp",
            title: "導入促進キャンペーン",
            tag: "新規・要承認",
            body: "防災需要の高まりを商機と捉えた集中施策。資料ダウンロードと問い合わせ獲得を目標に設計。",
            meta: [
              { k: "期間", v: "4週" },
              { k: "記事", v: "3本" },
              { k: "目的", v: "CV・問い合わせ" },
            ],
          },
        ],
      },
      knowledge: {
        lead: "前提情報は意図的に更新しない限り変わりません。今週は<b>サービス内容</b>と<b>事例</b>に更新候補があります。",
        cards: [
          { title: "会社・事業の前提", status: "fresh", statusLabel: "最新", items: ["ミッション／バリュー：変更なし", "提供価値・強み：変更なし", "最終走査：4日前"] },
          { title: "サービス内容", status: "stale", statusLabel: "更新候補", items: ["新プランの記述を新規検出", "料金体系の反映を提案", "承認すると以降の戦略に反映されます"] },
          { title: "導入事例", status: "stale", statusLabel: "更新候補", items: ["新規導入事例を1件検出", "実績数の更新を提案"] },
          { title: "トーン＆ボイス", status: "fresh", statusLabel: "最新", items: ["実直・不安を煽らない：維持", "禁則表現リスト：変更なし"] },
        ],
      },
      trend: {
        lead: "ナレッジを前提に、今週<b>自動で走った調査</b>の結果です。関連度の高い順に並べています。",
        signals: [
          { score: 94, h: "地震報道でBCPの検索需要が急上昇", src: "検索トレンド · ニュース", delta: "+280%", hot: true },
          { score: 86, h: "9月の防災月間に向けた関心の高まり", src: "SNS言及 · 業界紙", delta: "+54%" },
          { score: 70, h: "中小企業のBCP策定義務化の議論", src: "政府公開資料", delta: "+22%" },
          { score: 58, h: "同業の煽り型広告にネガティブ反応", src: "SNS · 1件", delta: "要監視", hot: true },
        ],
        foot: "毎週月曜 06:00 に自動実行。直近の調査は <b>本日 06:00</b> 完了。",
      },
      competitor: {
        lead: "同じトレンドに、競合も反応しています。誠実なトーンで<b>差別化</b>するのが今週の狙いです。",
        signals: [
          { score: 87, h: "競合E：防災需要に乗じた割引キャンペーン", src: "競合サイト · 広告", delta: "新規", hot: true },
          { score: 76, h: "競合F：BCP策定セミナーを告知", src: "プレスリリース", delta: "新規" },
          { score: 54, h: "自社：当該需要への発信はまだ少ない", src: "自社チャネル走査", delta: "空白", hot: true },
        ],
        foot: "競合調査は週1回。検出した空白テーマを戦略へ自動反映します。",
      },
      strategy: {
        lead: "フルオートで作っていますが、<b>どう考えたか</b>は全部開示します。気に入らない結論は担当エージェントまで戻せます。",
        nodes: [
          { nm: "市場分析", role: "Market Agent", says: "防災需要のピークは<b>今〜2週間</b>。検索流入を取りやすい窓。CV獲得効率が高い。" },
          { nm: "競合分析", role: "Competitor Agent", says: "競合は割引・煽り型で先行。差別化は<b>「不安を煽らない、実務に効く誠実さ」</b>に寄せるべき。" },
          { nm: "統合判断", role: "Strategy Orchestrator", synth: true, says: "<b>定常の啓発発信（信頼）＋ 導入促進キャンペーン（CV）</b>の2トラックを今週の戦略とする。実務的価値を前面に出し、煽り型の競合と差別化する。" },
        ],
      },
      plan: {
        lead: "戦略に紐づく今週の具体物です。各記事は <b>生成 → 4体レビュー → スコアリング</b> を通過済み。",
        pieces: [
          { title: "地震直後にまず確認すべきBCPチェック10項目", channels: ["オウンド", "X"], score: 97, status: "pass", statusLabel: "97 通過", track: "キャンペーン" },
          { title: "中小企業のためのBCP策定はじめの一歩", channels: ["オウンド"], score: 95, status: "pass", statusLabel: "95 通過", track: "定常" },
          { title: "防災月間に向けた社内訓練の設計", channels: ["オウンド"], score: 94, status: "pass", statusLabel: "94 通過", track: "定常" },
          { title: "導入促進キャンペーン告知（資料DL）", channels: ["X"], score: 93, status: "pass", statusLabel: "93 通過", track: "キャンペーン" },
          { title: "BCP策定義務化の動向まとめ", channels: ["オウンド"], score: 89, status: "review", statusLabel: "89 要確認", track: "キャンペーン" },
        ],
      },
      schedule: {
        lead: "全チャネルが自動連携対象です。承認後、自動で配信されます。",
        rows: [
          { ch: "オウンドメディア", auto: true, ev: { 0: ["t", "BCPチェック10項目"], 2: ["t", "策定はじめの一歩"], 4: ["t", "社内訓練の設計"] } },
          { ch: "X", auto: true, ev: { 1: ["t", "チェックリスト告知"], 3: ["t", "資料DL告知"], 5: ["t", "記事ダイジェスト"] } },
        ],
      },
    },
  },

  strategyArchive: [
    { w: "今週 · 6/16週", th: "防災需要ウィーク：啓発発信＋導入促進キャンペーン", st: "you", pieces: "5本", reach: "~22k" },
    { w: "6/9週", th: "BCP基礎の啓発を軸にした定常発信", st: "live", pieces: "4本", reach: "16k" },
    { w: "6/2週", th: "策定義務化の議論に合わせた解説強化", st: "live", pieces: "5本", reach: "19k" },
    { w: "5/26週", th: "導入事例を軸にした信頼構築", st: "live", pieces: "4本", reach: "15k" },
  ],

  trends: {
    blips: [
      { x: 50, y: 50, hot: true, l: "BCP需要 +280%" },
      { x: 66, y: 40, l: "防災月間 +54%" },
      { x: 38, y: 64, l: "義務化 +22%" },
      { x: 70, y: 66, hot: true, l: "煽り広告に反発" },
      { x: 32, y: 44, l: "競合E 割引" },
      { x: 60, y: 70, l: "競合F セミナー" },
    ],
    cards: [
      { h: "地震報道でBCP検索需要が急上昇", pill: { kind: "auto", label: "関連 94" }, body: "CV獲得の窓は今〜2週間。導入促進キャンペーンの主軸として採用済み。" },
      { h: "9月の防災月間に向けた関心", pill: { kind: "auto", label: "関連 86" }, body: "中長期の定常発信テーマとして反映。" },
      { h: "同業の煽り型広告にネガティブ反応", pill: { kind: "man", label: "要監視" }, body: "不安を煽らず、実務に効く誠実なトーンで差別化する方針。" },
    ],
  },

  knowledge: [
    { title: "ミッション・バリュー", body: "事業を止めない社会をつくる。戦略のトーンの土台。", statusLabel: "最新", status: "fresh" },
    { title: "提供価値・強み", body: "策定から訓練・運用まで伴走する実務性。", statusLabel: "最新", status: "fresh" },
    { title: "サービス内容", body: "新プランの記述を新規検出。", statusLabel: "更新候補", status: "stale" },
    { title: "導入事例", body: "新規導入事例を1件検出。", statusLabel: "更新候補", status: "stale" },
    { title: "トーン＆ボイス", body: "実直・不安を煽らない。禁則表現を含む。", statusLabel: "最新", status: "fresh" },
    { title: "ターゲット／ペルソナ", body: "中小企業の経営者・総務・情シス担当。", statusLabel: "最新", status: "fresh" },
  ],

  content: {
    upcoming: [
      { title: "地震直後にまず確認すべきBCPチェック10項目", channels: ["オウンド", "X"], meta: "97 通過 · 月 09:00 配信予定", badge: "hot" },
      { title: "中小企業のためのBCP策定はじめの一歩", channels: ["オウンド"], meta: "95 通過 · 水 09:00 配信予定" },
      { title: "BCP策定義務化の動向まとめ", channels: ["オウンド"], meta: "89 要確認 · 配信保留", badge: "review" },
    ],
    published: [
      { title: "防災月間に向けた社内訓練の設計", channels: ["オウンド"], meta: "6/12 配信 · リーチ 5.4k" },
      { title: "導入事例：製造業A社の事業継続", channels: ["オウンド"], meta: "6/9 配信 · リーチ 4.1k" },
    ],
    versionCompare: {
      title: "BCP入門記事（戦略変更により再提示）",
      note: "戦略が「防災需要」に更新されたため文脈を調整",
      channels: ["オウンド"],
      old: { label: "旧版", ver: "v1", body: "通年向けの基礎解説を主軸にした文脈。骨子は維持。" },
      next: { label: "新版", ver: "v2 · 推奨", body: "直近の地震・防災月間の文脈を追記し、CV導線を最適化。" },
    },
  },

  channels: {
    unitLabel: "事業継続ソリューション",
    channels: [
      { ic: "OM", color: "var(--signal)", n: "オウンドメディア", role: "啓発記事の母艦。検索流入と信頼を積み上げる中心チャネル。", auto: true, posts: "週3", reach: "14k" },
      { ic: "X", color: "#cfd6e2", n: "X", role: "速報性の高い防災・BCP情報を日次で発信。即時拡散担当。", auto: true, posts: "週5", reach: "8k" },
    ],
  },
};
