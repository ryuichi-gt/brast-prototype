import type { TenantBundle } from "../types";

/**
 * Libero — エンタープライズ開発.
 * Kubo's company; the enterprise-dev lens that shaped BRAST's positioning.
 */
export const libero: TenantBundle = {
  tenant: {
    id: "libero",
    name: "Libero",
    unit: "エンタープライズ開発",
    channels: ["オウンドメディア", "LinkedIn"],
  },

  briefing: {
    weekLabel: "AI開発内製化ウィーク",
    weekPill: { code: "2026 W25", date: "6/16" },
    deckSubtitle: "AIが全工程を自走 · あなたの承認待ち",
    pipeline: [
      { key: "know", n: "ナレッジ更新", d: "自社サイト・公開資料を再走査し差分を検出", meta: "差分なし", state: "done" },
      { key: "trend", n: "トレンド調査", d: "技術・市場・SNSをリアルタイム収集", meta: "毎週月 06:00 自動 · ライブ", state: "done" },
      { key: "strat", n: "戦略統合", d: "複数エージェントの結論を統合し週次戦略を決定", meta: "2エージェントを統合", state: "done" },
      { key: "gen", n: "コンテンツ生成", d: "戦略に基づき記事・SNS草稿を生成", meta: "4本生成", state: "done" },
      { key: "img", n: "画像生成", d: "各記事のキービジュアルを生成", meta: "3点生成", state: "done" },
      {
        key: "review",
        n: "多段レビュー",
        d: "4体の審査エージェントが並列審査",
        meta: "全件通過",
        state: "done",
        subs: ["AIライティング検知", "法務・景表法", "レピュテーション", "技術的正確性"],
      },
      { key: "score", n: "スコアリング", d: "95点しきい値で人間レビュー要否を判定", meta: "平均 97 / 100", state: "done" },
      { key: "you", n: "あなたのレビュー", d: "プレゼンを承認、または該当工程へ差し戻し", meta: "判断待ち", state: "you" },
      { key: "dist", n: "配信", d: "承認後、各チャネルへ自動／手動で配信", meta: "承認後に起動", state: "pending" },
    ],
    titles: {
      summary: "AI内製化への関心を軸に、定常の技術発信＋ソートリーダーシップの2本立てを提案します",
      knowledge: "今週は更新候補なし。すべて最新です",
      trend: "エンタープライズのAI内製化志向の高まりが、今週の最大のトレンド信号です",
      competitor: "競合が事例先行で動き出し。実装の深さで空白を取りに行くべきです",
      strategy: "なぜこの戦略か — 各エージェントの結論と統合",
      plan: "今週の具体プラン — 4本を生成済み、全本がしきい値通過",
      schedule: "配信スケジュール — 全チャネル自動連携",
    },
    slides: {
      summary: {
        lead: "エンタープライズの<b>AI開発内製化</b>への関心が高まっています。<b>定常的な技術発信</b>に加え、意思決定層に向けた<b>ソートリーダーシップ施策</b>を提案します。",
        kpis: [
          { v: "4", unit: "本", l: "生成済みコンテンツ", d: "▲ 先週 +1", dTone: "up" },
          { v: "2", unit: "ch", l: "配信チャネル", d: "自動2 / 手動0" },
          { v: "97", unit: "/100", l: "平均審査スコア", d: "全件しきい値超", dTone: "up" },
          { v: "~16", unit: "k", l: "想定リーチ（週）", d: "▲ +9%", dTone: "up" },
        ],
        tracks: [
          {
            kind: "steady",
            title: "定常発信",
            tag: "継続",
            body: "実装の現実に根ざした技術解説。エンジニアと意思決定層の双方に専門性を示す。",
            meta: [
              { k: "記事", v: "2本" },
              { k: "SNS", v: "3投稿" },
              { k: "目的", v: "認知・信頼" },
            ],
          },
          {
            kind: "camp",
            title: "ソートリーダーシップ施策",
            tag: "新規・要承認",
            body: "AI内製化を検討する意思決定層へのリード獲得施策。比較検討時に想起される立ち位置を狙う。",
            meta: [
              { k: "期間", v: "8週" },
              { k: "記事", v: "2本" },
              { k: "目的", v: "リード獲得" },
            ],
          },
        ],
      },
      knowledge: {
        lead: "前提情報は意図的に更新しない限り変わりません。今週は<b>更新候補なし</b>。すべて最新です。",
        cards: [
          { title: "会社・事業の前提", status: "fresh", statusLabel: "最新", items: ["ミッション／バリュー：変更なし", "提供価値・強み：変更なし", "最終走査：1日前"] },
          { title: "技術スタック・実績", status: "fresh", statusLabel: "最新", items: ["主要技術領域：維持", "導入実績数：変更なし"] },
          { title: "ポジショニング", status: "fresh", statusLabel: "最新", items: ["エンタープライズ特化／伴走型：維持", "比較軸（星取り表）の前提：維持"] },
          { title: "トーン＆ボイス", status: "fresh", statusLabel: "最新", items: ["技術的・実直・誇張しない：維持", "禁則表現リスト：変更なし"] },
        ],
      },
      trend: {
        lead: "ナレッジを前提に、今週<b>自動で走った調査</b>の結果です。関連度の高い順に並べています。",
        signals: [
          { score: 90, h: "エンタープライズのAI内製化志向が強まる", src: "業界レポート · SNS", delta: "+72%", hot: true },
          { score: 84, h: "生成AIのガバナンス・統制への関心", src: "業界紙 · 2件", delta: "+41%" },
          { score: 68, h: "レガシー刷新と内製化の同時進行", src: "検索トレンド", delta: "+19%" },
          { score: 57, h: "内製化失敗事例の共有が増加", src: "SNS · 1件", delta: "要監視", hot: true },
        ],
        foot: "毎週月曜 06:00 に自動実行。直近の調査は <b>本日 06:00</b> 完了。",
      },
      competitor: {
        lead: "同じトレンドに、競合も動いています。実装の現実に基づく深さで<b>差別化</b>するのが今週の狙いです。",
        signals: [
          { score: 85, h: "競合G：AI内製化の事例記事を公開", src: "競合オウンドメディア", delta: "新規", hot: true },
          { score: 77, h: "競合H：内製化支援サービスを発表", src: "プレスリリース", delta: "新規" },
          { score: 53, h: "自社：内製化テーマの発信は手薄", src: "自社チャネル走査", delta: "空白", hot: true },
        ],
        foot: "競合調査は週1回。検出した空白テーマを戦略へ自動反映します。",
      },
      strategy: {
        lead: "フルオートで作っていますが、<b>どう考えたか</b>は全部開示します。気に入らない結論は担当エージェントまで戻せます。",
        nodes: [
          { nm: "市場分析", role: "Market Agent", says: "内製化検討の波は<b>中期で継続</b>。比較検討フェーズで想起されることがリード獲得に効く。" },
          { nm: "競合分析", role: "Competitor Agent", says: "競合は事例先行だが浅い。差別化は<b>「実装と運用の現実」に踏み込む深さ</b>に寄せるべき。" },
          { nm: "統合判断", role: "Strategy Orchestrator", synth: true, says: "<b>定常の技術発信（信頼）＋ ソートリーダーシップ施策（リード）</b>の2トラックを今週の戦略とする。実装の深さを前面に出し、事例先行の競合と差別化する。" },
        ],
      },
      plan: {
        lead: "戦略に紐づく今週の具体物です。各記事は <b>生成 → 4体レビュー → スコアリング</b> を通過済み。",
        pieces: [
          { title: "AI内製化、最初の90日で決まること", channels: ["オウンド", "LinkedIn"], score: 98, status: "pass", statusLabel: "98 通過", track: "キャンペーン" },
          { title: "生成AIガバナンスの実装パターン", channels: ["オウンド"], score: 97, status: "pass", statusLabel: "97 通過", track: "定常" },
          { title: "レガシー刷新と内製化を同時に進める設計", channels: ["オウンド", "LinkedIn"], score: 96, status: "pass", statusLabel: "96 通過", track: "定常" },
          { title: "内製化の落とし穴と回避策（意思決定層向け）", channels: ["LinkedIn"], score: 95, status: "pass", statusLabel: "95 通過", track: "キャンペーン" },
        ],
      },
      schedule: {
        lead: "全チャネルが自動連携対象です。承認後、自動で配信されます。",
        rows: [
          { ch: "オウンドメディア", auto: true, ev: { 0: ["t", "最初の90日"], 3: ["t", "ガバナンス実装"] } },
          { ch: "LinkedIn", auto: true, ev: { 1: ["t", "落とし穴と回避策"], 4: ["t", "刷新と内製化の設計"] } },
        ],
      },
    },
  },

  strategyArchive: [
    { w: "今週 · 6/16週", th: "AI開発内製化ウィーク：技術発信＋ソートリーダーシップ", st: "you", pieces: "4本", reach: "~16k" },
    { w: "6/9週", th: "ガバナンス需要に合わせた実装解説", st: "live", pieces: "3本", reach: "13k" },
    { w: "6/2週", th: "レガシー刷新テーマの定常発信", st: "live", pieces: "4本", reach: "14k" },
    { w: "5/26週", th: "実装の現実を軸にした信頼構築", st: "live", pieces: "3本", reach: "12k" },
  ],

  trends: {
    blips: [
      { x: 50, y: 50, hot: true, l: "内製化 +72%" },
      { x: 66, y: 40, l: "AIガバナンス +41%" },
      { x: 38, y: 64, l: "レガシー刷新 +19%" },
      { x: 70, y: 66, hot: true, l: "内製化失敗事例" },
      { x: 32, y: 44, l: "競合G 事例" },
      { x: 60, y: 70, l: "競合H 支援" },
    ],
    cards: [
      { h: "エンタープライズのAI内製化志向が強まる", pill: { kind: "auto", label: "関連 90" }, body: "比較検討フェーズでの想起が鍵。ソートリーダーシップ施策の主軸として採用済み。" },
      { h: "生成AIのガバナンスへの関心", pill: { kind: "auto", label: "関連 84" }, body: "実装パターンの解説需要が増加。定常発信テーマとして反映。" },
      { h: "内製化失敗事例の共有が増加", pill: { kind: "man", label: "要監視" }, body: "失敗を煽らず、回避策を実務的に示す方針。" },
    ],
  },

  knowledge: [
    { title: "ミッション・バリュー", body: "実装で事業を前に進める。戦略のトーンの土台。", statusLabel: "最新", status: "fresh" },
    { title: "提供価値・強み", body: "実装と運用の現実に踏み込む伴走型開発。", statusLabel: "最新", status: "fresh" },
    { title: "技術スタック・実績", body: "主要技術領域と導入実績。変更なし。", statusLabel: "最新", status: "fresh" },
    { title: "ポジショニング", body: "エンタープライズ特化／星取り表で選ばれる前提。", statusLabel: "最新", status: "fresh" },
    { title: "トーン＆ボイス", body: "技術的・実直・誇張しない。禁則表現を含む。", statusLabel: "最新", status: "fresh" },
    { title: "ターゲット／ペルソナ", body: "大企業のCTO・開発責任者・DX推進層。", statusLabel: "最新", status: "fresh" },
  ],

  content: {
    upcoming: [
      { title: "AI内製化、最初の90日で決まること", channels: ["オウンド", "LinkedIn"], meta: "98 通過 · 火 09:00 配信予定", badge: "hot" },
      { title: "生成AIガバナンスの実装パターン", channels: ["オウンド"], meta: "97 通過 · 木 09:00 配信予定" },
      { title: "内製化の落とし穴と回避策", channels: ["LinkedIn"], meta: "95 通過 · 金 09:00 配信予定" },
    ],
    published: [
      { title: "レガシー刷新と内製化を同時に進める設計", channels: ["オウンド", "LinkedIn"], meta: "6/12 配信 · リーチ 6.2k" },
      { title: "伴走型開発という選択肢", channels: ["オウンド"], meta: "6/9 配信 · リーチ 4.8k" },
    ],
    versionCompare: {
      title: "DX推進記事（戦略変更により再提示）",
      note: "戦略が「AI内製化」に更新されたため文脈を調整",
      channels: ["LinkedIn"],
      old: { label: "旧版", ver: "v2", body: "一般的なDX推進を主軸にした文脈。骨子は維持。" },
      next: { label: "新版", ver: "v3 · 推奨", body: "AI内製化の意思決定文脈を追記し、リード導線を最適化。" },
    },
  },

  channels: {
    unitLabel: "エンタープライズ開発",
    channels: [
      { ic: "OM", color: "var(--signal)", n: "オウンドメディア", role: "技術解説の母艦。専門性と検索流入を積み上げる中心チャネル。", auto: true, posts: "週2", reach: "10k" },
      { ic: "in", color: "#7fb1ff", n: "LinkedIn", role: "意思決定層への到達。比較検討時の想起を狙うソートリーダーシップ担当。", auto: true, posts: "週2", reach: "6k" },
    ],
  },
};
