import type { TenantBundle } from "../types";

/**
 * SympaFit — 血糖データ × アルゴリズム.
 * A research-led company whose substance is science, not branding (the
 * archetypal BRAST customer from the transcript).
 */
export const sympafit: TenantBundle = {
  tenant: {
    id: "sympafit",
    name: "SympaFit",
    unit: "血糖データ×アルゴリズム",
    channels: ["main", "athlete", "femtech"],
  },

  briefing: {
    weekLabel: "アスリート需要ウィーク",
    weekPill: { code: "2026 W25", date: "6/16" },
    deckSubtitle: "AIが全工程を自走 · あなたの承認待ち",
    pipeline: [
      { key: "know", n: "ナレッジ更新", d: "研究データ・公開論文を再走査し差分を検出", meta: "差分 1件", state: "done" },
      { key: "trend", n: "トレンド調査", d: "スポーツ栄養・血糖トレンドをリアルタイム収集", meta: "毎週月 06:00 自動 · ライブ", state: "done" },
      { key: "strat", n: "戦略統合", d: "複数エージェントの結論を統合し週次戦略を決定", meta: "2エージェントを統合", state: "done" },
      { key: "gen", n: "コンテンツ生成", d: "戦略に基づき記事・SNS草稿を生成", meta: "6本生成", state: "done" },
      { key: "img", n: "画像生成", d: "各記事のキービジュアルを生成", meta: "4点生成", state: "done" },
      {
        key: "review",
        n: "多段レビュー",
        d: "4体の審査エージェントが並列審査",
        meta: "全件通過",
        state: "done",
        subs: ["AIライティング検知", "法務・薬機法", "レピュテーション", "科学的根拠"],
      },
      { key: "score", n: "スコアリング", d: "90点しきい値で人間レビュー要否を判定", meta: "平均 96 / 100", state: "done" },
      { key: "you", n: "あなたのレビュー", d: "プレゼンを承認、または該当工程へ差し戻し", meta: "判断待ち", state: "you" },
      { key: "dist", n: "配信", d: "承認後、各チャネルへ自動／手動で配信", meta: "承認後に起動", state: "pending" },
    ],
    titles: {
      summary: "夏季のアスリート需要を軸に、定常の科学解説＋登録キャンペーンの2本立てを提案します",
      knowledge: "エビデンスベースに1件の更新候補。その他は最新です",
      trend: "持久系トレーニングへの関心上昇が、今週の最大のトレンド信号です",
      competitor: "競合が訴求先行で動き出し。科学的厳密さで空白を取りに行くべきです",
      strategy: "なぜこの戦略か — 各エージェントの結論と統合",
      plan: "今週の具体プラン — 6本を生成済み、うち5本がしきい値通過",
      schedule: "配信スケジュール — 全チャネル自動連携",
    },
    slides: {
      summary: {
        lead: "持久系アスリートの<b>血糖管理</b>への関心が季節要因で上昇しています。<b>定常的な科学解説</b>に加え、夏季トレーニング期に向けた<b>アスリート訴求キャンペーン</b>を提案します。",
        kpis: [
          { v: "6", unit: "本", l: "生成済みコンテンツ", d: "▲ 先週 +1", dTone: "up" },
          { v: "3", unit: "ch", l: "配信チャネル", d: "自動3 / 手動0" },
          { v: "96", unit: "/100", l: "平均審査スコア", d: "1本がしきい値未満", dTone: "warn" },
          { v: "~52", unit: "k", l: "想定リーチ（週）", d: "▲ +14%", dTone: "up" },
        ],
        tracks: [
          {
            kind: "steady",
            title: "定常発信",
            tag: "継続",
            body: "血糖データの読み解き方を一次研究ベースで丁寧に解説する科学コンテンツ。専門性と信頼を積み上げる。",
            meta: [
              { k: "記事", v: "3本" },
              { k: "SNS", v: "6投稿" },
              { k: "目的", v: "認知・信頼" },
            ],
          },
          {
            kind: "camp",
            title: "アスリート訴求キャンペーン",
            tag: "新規・要承認",
            body: "夏季トレーニング期に向けた持久系アスリート向けの集中施策。アプリ無料トライアル登録を目標に設計。",
            meta: [
              { k: "期間", v: "6週" },
              { k: "記事", v: "3本" },
              { k: "目的", v: "CV・登録" },
            ],
          },
        ],
      },
      knowledge: {
        lead: "研究知見は意図的に更新しない限り変わりません。今週は<b>新規公開論文</b>に1件の更新候補があります。",
        cards: [
          { title: "ミッション・研究方針", status: "fresh", statusLabel: "最新", items: ["科学的誠実性の原則：維持", "提供価値・強み：変更なし", "最終走査：2日前"] },
          { title: "エビデンスベース", status: "stale", statusLabel: "更新候補", items: ["持久運動と血糖変動の新規論文を検出", "解説記事への引用反映を提案", "承認すると以降の戦略に反映されます"] },
          { title: "ポジショニング", status: "fresh", statusLabel: "最新", items: ["研究主導／非・誇大広告の方針：維持", "セグメント（一般/アスリート/femtech）：維持"] },
          { title: "トーン＆ボイス", status: "fresh", statusLabel: "最新", items: ["科学的・誠実・断定しない：維持", "薬機法の禁則表現：変更なし"] },
        ],
      },
      trend: {
        lead: "ナレッジを前提に、今週<b>自動で走った調査</b>の結果です。関連度の高い順に並べています。",
        signals: [
          { score: 92, h: "夏季の持久系トレーニングへの関心が上昇", src: "検索トレンド · SNS言及", delta: "+120%", hot: true },
          { score: 85, h: "CGM（持続血糖測定）の一般利用が拡大", src: "業界レポート · 2件", delta: "+48%" },
          { score: 71, h: "femtech領域でのホルモンと血糖の話題", src: "SNS · メディア", delta: "+33%" },
          { score: 60, h: "競合の科学的根拠への疑義が一部で拡散", src: "ニュース · 1件", delta: "要監視", hot: true },
        ],
        foot: "毎週月曜 06:00 に自動実行。直近の調査は <b>本日 06:00</b> 完了。",
      },
      competitor: {
        lead: "同じトレンドに、競合も動き始めています。科学的厳密さで<b>差別化</b>するのが今週の狙いです。",
        signals: [
          { score: 88, h: "競合C：アスリート向けキャンペーンを開始", src: "競合SNS · 広告", delta: "新規", hot: true },
          { score: 79, h: "競合D：CGM連携機能を訴求", src: "プレスリリース", delta: "新規" },
          { score: 55, h: "自社：夏季アスリート文脈の発信は手薄", src: "自社チャネル走査", delta: "空白", hot: true },
        ],
        foot: "競合調査は週1回。検出した空白テーマを戦略へ自動反映します。",
      },
      strategy: {
        lead: "フルオートで作っていますが、<b>どう考えたか</b>は全部開示します。気に入らない結論は担当エージェントまで戻して作り直せます。",
        nodes: [
          { nm: "市場分析", role: "Market Agent", says: "夏季のアスリート需要は<b>今〜6週</b>がピーク。トライアル登録の獲得効率が最も高い窓。" },
          { nm: "競合分析", role: "Competitor Agent", says: "競合は訴求先行だが根拠が薄い。差別化は<b>一次研究に基づく科学的厳密さ</b>に寄せるべき。" },
          { nm: "統合判断", role: "Strategy Orchestrator", synth: true, says: "<b>定常の科学解説（信頼）＋ アスリートキャンペーン（登録）</b>の2トラックを今週の戦略とする。エビデンス引用を前面に出し、訴求先行の競合と差別化する。" },
        ],
      },
      plan: {
        lead: "戦略に紐づく今週の具体物です。各記事は <b>生成 → 4体レビュー → スコアリング</b> を通過済み。",
        pieces: [
          { title: "持久運動時の血糖変動を科学的に読み解く", channels: ["main", "athlete"], score: 98, status: "pass", statusLabel: "98 通過", track: "キャンペーン" },
          { title: "アスリートのための補給タイミング設計", channels: ["athlete"], score: 96, status: "pass", statusLabel: "96 通過", track: "キャンペーン" },
          { title: "CGMデータの基本的な見方（入門）", channels: ["main", "X"], score: 96, status: "pass", statusLabel: "96 通過", track: "定常" },
          { title: "femtech：ホルモン周期と血糖の関係", channels: ["femtech"], score: 95, status: "pass", statusLabel: "95 通過", track: "定常" },
          { title: "夏季トレーニング期の登録キャンペーン告知", channels: ["X", "athlete"], score: 94, status: "pass", statusLabel: "94 通過", track: "キャンペーン" },
          { title: "研究レビュー：運動と代謝 vol.2", channels: ["main"], score: 89, status: "review", statusLabel: "89 要確認", track: "定常" },
        ],
      },
      schedule: {
        lead: "全チャネルが自動連携対象です。承認後、自動で配信されます。",
        rows: [
          { ch: "main", auto: true, ev: { 0: ["t", "血糖変動の科学"], 3: ["t", "CGM入門"] } },
          { ch: "athlete", auto: true, ev: { 1: ["t", "補給タイミング設計"], 4: ["t", "キャンペーン告知"] } },
          { ch: "femtech", auto: true, ev: { 2: ["t", "ホルモンと血糖"] } },
        ],
      },
    },
  },

  strategyArchive: [
    { w: "今週 · 6/16週", th: "アスリート需要ウィーク：科学解説＋登録キャンペーン", st: "you", pieces: "6本", reach: "~52k" },
    { w: "6/9週", th: "CGM一般利用の拡大に合わせた入門解説", st: "live", pieces: "5本", reach: "48k" },
    { w: "6/2週", th: "femtechセグメントの認知拡大", st: "live", pieces: "4本", reach: "39k" },
    { w: "5/26週", th: "一次研究の信頼構築を軸にした定常発信", st: "live", pieces: "6本", reach: "44k" },
  ],

  trends: {
    blips: [
      { x: 50, y: 50, hot: true, l: "持久トレ +120%" },
      { x: 66, y: 42, l: "CGM普及 +48%" },
      { x: 36, y: 62, l: "femtech +33%" },
      { x: 70, y: 66, hot: true, l: "競合への疑義" },
      { x: 32, y: 44, l: "競合C 広告" },
      { x: 60, y: 70, l: "競合D CGM連携" },
    ],
    cards: [
      { h: "夏季の持久系トレーニング需要が上昇", pill: { kind: "auto", label: "関連 92" }, body: "登録獲得の窓は今〜6週。アスリートキャンペーンの主軸として採用済み。" },
      { h: "CGMの一般利用が拡大", pill: { kind: "auto", label: "関連 85" }, body: "入門解説の需要が増加。定常発信テーマとして反映。" },
      { h: "競合の科学的根拠への疑義", pill: { kind: "man", label: "要監視" }, body: "煽らず、自社の一次研究ベースの誠実さを淡々と示す方針。" },
    ],
  },

  knowledge: [
    { title: "ミッション・研究方針", body: "科学的誠実性を最優先する研究主導の姿勢。", statusLabel: "最新", status: "fresh" },
    { title: "提供価値・強み", body: "一次研究に基づくアルゴリズムという差別化軸。", statusLabel: "最新", status: "fresh" },
    { title: "エビデンスベース", body: "持久運動と血糖変動の新規論文を検出。", statusLabel: "更新候補", status: "stale" },
    { title: "ポジショニング", body: "研究主導／非・誇大広告。3セグメント運用。", statusLabel: "最新", status: "fresh" },
    { title: "トーン＆ボイス", body: "科学的・誠実・断定しない。薬機法に配慮。", statusLabel: "最新", status: "fresh" },
    { title: "ターゲット／ペルソナ", body: "一般健康層・持久系アスリート・femtech層。", statusLabel: "最新", status: "fresh" },
  ],

  content: {
    upcoming: [
      { title: "持久運動時の血糖変動を科学的に読み解く", channels: ["main", "athlete"], meta: "98 通過 · 火 09:00 配信予定", badge: "hot" },
      { title: "アスリートのための補給タイミング設計", channels: ["athlete"], meta: "96 通過 · 水 09:00 配信予定" },
      { title: "研究レビュー：運動と代謝 vol.2", channels: ["main"], meta: "89 要確認 · 配信保留", badge: "review" },
    ],
    published: [
      { title: "CGMデータの基本的な見方（入門）", channels: ["main", "X"], meta: "6/12 配信 · リーチ 14k" },
      { title: "femtech：ホルモン周期と血糖", channels: ["femtech"], meta: "6/10 配信 · リーチ 7.8k" },
    ],
    versionCompare: {
      title: "栄養セミナー告知記事（戦略変更により再提示）",
      note: "戦略が「アスリート需要」に更新されたため文脈を調整",
      channels: ["athlete"],
      old: { label: "旧版", ver: "v2", body: "一般向けセミナー告知を主軸にした文脈。骨子は維持。" },
      next: { label: "新版", ver: "v3 · 推奨", body: "持久系アスリート向けに焦点を絞り、登録導線を最適化。" },
    },
  },

  channels: {
    unitLabel: "血糖データ×アルゴリズム",
    channels: [
      { ic: "M", color: "var(--signal)", n: "main", role: "科学解説の母艦。一般健康層への信頼構築の中心チャネル。", auto: true, posts: "週3", reach: "26k" },
      { ic: "A", color: "#cfd6e2", n: "athlete", role: "持久系アスリート特化。トレーニング期に合わせた実践コンテンツ。", auto: true, posts: "週3", reach: "18k" },
      { ic: "F", color: "#e69ac0", n: "femtech", role: "女性の健康と血糖をつなぐ専門発信。新規セグメント開拓。", auto: true, posts: "週2", reach: "8k" },
    ],
  },
};
