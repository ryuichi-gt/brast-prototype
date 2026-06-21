import type { TenantBundle } from "../types";

/**
 * JRC エンジニアリング — 医療ITソリューション事業部.
 * Default tenant: ported 1:1 from the reviewed mockup (richest scenario).
 */
export const jrc: TenantBundle = {
  tenant: {
    id: "jrc",
    name: "JRCエンジニアリング",
    unit: "医療ITソリューション事業部",
    channels: ["オウンドメディア", "X", "LinkedIn"],
  },

  briefing: {
    weekLabel: "制度改定ウィーク",
    weekPill: { code: "2026 W25", date: "6/16" },
    deckSubtitle: "AIが全工程を自走 · あなたの承認待ち",
    pipeline: [
      { key: "know", n: "ナレッジ更新", d: "自社サイト・公開資料を再走査し差分を検出", meta: "差分 3件", state: "done" },
      { key: "trend", n: "トレンド調査", d: "制度・市場・SNSをリアルタイム収集", meta: "毎週月 06:00 自動 · ライブ", state: "done" },
      { key: "strat", n: "戦略統合", d: "複数エージェントの結論を統合し週次戦略を決定", meta: "2エージェントを統合", state: "done" },
      { key: "gen", n: "コンテンツ生成", d: "戦略に基づき記事・SNS草稿を生成", meta: "7本生成", state: "done" },
      { key: "img", n: "画像生成", d: "各記事のキービジュアルを生成", meta: "5点生成", state: "done" },
      {
        key: "review",
        n: "多段レビュー",
        d: "4体の審査エージェントが並列審査",
        meta: "全件通過",
        state: "done",
        subs: ["AIライティング検知", "法務・景表法", "レピュテーション", "IR・専門"],
      },
      { key: "score", n: "スコアリング", d: "90点しきい値で人間レビュー要否を判定", meta: "平均 94 / 100", state: "done" },
      { key: "you", n: "あなたのレビュー", d: "プレゼンを承認、または該当工程へ差し戻し", meta: "判断待ち", state: "you" },
      { key: "dist", n: "配信", d: "承認後、各チャネルへ自動／手動で配信", meta: "承認後に起動", state: "pending" },
    ],
    titles: {
      summary: "今週は「制度改定」を軸に、定常発信＋立ち上げキャンペーンの2本立てを提案します",
      knowledge: "ベースナレッジはおおむね最新。1領域だけ更新を提案します",
      trend: "医療IT制度改定の本格議論入りが、今週の最大のトレンド信号です",
      competitor: "競合2社が制度改定に先んじて発信を開始。空白が閉じる前に動くべきです",
      strategy: "なぜこの戦略か — 各エージェントの結論と統合",
      plan: "今週の具体プラン — 7本を生成済み、うち6本がしきい値通過",
      schedule: "配信スケジュール — 自動連携と手動投稿を1枚で",
    },
    slides: {
      summary: {
        lead: "先週比で医療IT制度改定の議論が一段進みました。<b>定常的なブランド発信</b>に加えて、改定対応を訴求する<b>立ち上げキャンペーン（1ヶ月）</b>の起動を提案します。下の2トラックを承認いただければ、今週分の配信まで自走します。",
        kpis: [
          { v: "7", unit: "本", l: "生成済みコンテンツ", d: "▲ 先週 +2", dTone: "up" },
          { v: "3", unit: "ch", l: "配信チャネル", d: "自動2 / 手動1" },
          { v: "94", unit: "/100", l: "平均審査スコア", d: "1本がしきい値未満", dTone: "warn" },
          { v: "~38", unit: "k", l: "想定リーチ（週）", d: "▲ +21%", dTone: "up" },
        ],
        tracks: [
          {
            kind: "steady",
            title: "定常発信",
            tag: "継続",
            body: "ブランドの専門性を継続的に積み上げる発信。今週は医療IT基盤の信頼性に関する解説記事を中心に。",
            meta: [
              { k: "記事", v: "3本" },
              { k: "SNS", v: "5投稿" },
              { k: "目的", v: "認知・信頼" },
            ],
          },
          {
            kind: "camp",
            title: "制度改定キャンペーン",
            tag: "新規・要承認",
            body: "来月の医療IT制度改定を商機と捉えた1ヶ月の集中施策。問い合わせ獲得（CV）を目標に設計しています。",
            meta: [
              { k: "期間", v: "4週" },
              { k: "記事", v: "4本" },
              { k: "目的", v: "CV・指名流入" },
            ],
          },
        ],
      },
      knowledge: {
        lead: "ブランドや会社の前提情報は、こちらが意図的に更新しない限り世の中が勝手に変えるものではありません。だから差分だけを検知してお知らせします。今週は<b>サービスラインの記述</b>に1件の更新候補があります。",
        cards: [
          {
            title: "会社・事業の前提",
            status: "fresh",
            statusLabel: "最新",
            items: ["ミッション／バリュー：変更なし", "提供価値・強み：変更なし", "最終走査：3日前"],
          },
          {
            title: "サービスライン",
            status: "stale",
            statusLabel: "更新候補",
            items: [
              "医療ITソリューション事業部のサービスサイトを新規検出",
              "「保守・運用」の記述を反映することを提案",
              "承認すると以降の戦略に反映されます",
            ],
          },
          {
            title: "ポジショニング",
            status: "fresh",
            statusLabel: "最新",
            items: ["エンタープライズ特化の方針：維持", "比較軸（星取り表）の前提：維持"],
          },
          {
            title: "トーン＆ボイス",
            status: "fresh",
            statusLabel: "最新",
            items: ["専門的・実直・誇張しない：維持", "禁則表現リスト：変更なし"],
          },
        ],
      },
      trend: {
        lead: "ナレッジを前提に、今週<b>自動で走った調査</b>の結果です。関連度の高い順に並べています。この信号群が、次のスライドの戦略の根拠になります。",
        signals: [
          { score: 96, h: "医療IT制度改定が国会で本格議論入り", src: "政府公開資料 · 業界紙3媒体", delta: "+340%", hot: true },
          { score: 88, h: "医療機関のIT予算が来期増額の見通し", src: "調査会社レポート · 2件", delta: "+62%" },
          { score: 74, h: "「電子カルテ標準化」の検索需要が上昇", src: "検索トレンド · SNS言及", delta: "+28%" },
          { score: 61, h: "院内システムのセキュリティ事故が報道", src: "ニュース · 1件", delta: "要監視", hot: true },
        ],
        foot: "毎週月曜 06:00 に自動実行。直近の調査は <b>本日 06:00</b> 完了。",
      },
      competitor: {
        lead: "同じトレンドに、競合も反応し始めています。先んじて発信し、検索・指名の<b>空白を埋める</b>のが今週の狙いです。",
        signals: [
          { score: 91, h: "競合A：制度改定の解説記事を2本公開", src: "競合オウンドメディア", delta: "新規", hot: true },
          { score: 83, h: "競合B：改定対応のウェビナー告知を開始", src: "LinkedIn · プレスリリース", delta: "新規" },
          { score: 58, h: "自社：当該テーマの発信はまだゼロ", src: "自社チャネル走査", delta: "空白", hot: true },
        ],
        foot: "競合調査は週1回。次回更新まで、検出した空白テーマを戦略へ自動反映します。",
      },
      strategy: {
        lead: "フルオートで作っていますが、<b>どう考えたか</b>は全部開示します。気に入らない結論があれば、その担当エージェントまで戻して下流だけ作り直せます。",
        nodes: [
          {
            nm: "市場分析",
            role: "Market Agent",
            says: "制度改定は来月施行。議論のピークは<b>今〜2週間</b>。この窓で発信した記事が最も指名流入を取りやすい。",
          },
          {
            nm: "競合分析",
            role: "Competitor Agent",
            says: "競合A・Bは解説型で先行。差別化は<b>「保守・運用まで含む実装の現実」</b>という当社の強み軸に寄せるべき。",
          },
          {
            nm: "統合判断",
            role: "Strategy Orchestrator",
            synth: true,
            says: "2つの結論を統合し、<b>定常発信（信頼の積み上げ）＋ 改定キャンペーン（CV獲得）</b>の2トラックを今週の戦略とする。キャンペーンは実装・運用の実体験を前面に出し、解説型の競合と差別化する。",
          },
        ],
      },
      plan: {
        lead: "戦略に紐づく今週の具体物です。各記事は <b>生成 → 4体レビュー → スコアリング</b> を通過済み。スコア90以上は基本そのまま、未満はあなたの確認を推奨します。",
        pieces: [
          { title: "医療IT制度改定で何が変わるか — 実装担当者向け要点整理", channels: ["オウンド", "LinkedIn"], score: 97, status: "pass", statusLabel: "97 通過", track: "キャンペーン" },
          { title: "改定対応で見落とされがちな「保守・運用」の論点", channels: ["オウンド"], score: 96, status: "pass", statusLabel: "96 通過", track: "キャンペーン" },
          { title: "電子カルテ標準化の現在地（解説）", channels: ["オウンド", "X"], score: 95, status: "pass", statusLabel: "95 通過", track: "定常" },
          { title: "院内システムのセキュリティ、最低限の備え", channels: ["オウンド"], score: 93, status: "pass", statusLabel: "93 通過", track: "定常" },
          { title: "制度改定チェックリスト（配布資料）", channels: ["オウンド", "X"], score: 95, status: "pass", statusLabel: "95 通過", track: "キャンペーン" },
          { title: "改定スケジュール早見表（SNS用カード）", channels: ["X", "LinkedIn"], score: 92, status: "pass", statusLabel: "92 通過", track: "キャンペーン" },
          { title: "当社の医療IT導入事例 vol.4", channels: ["オウンド"], score: 88, status: "review", statusLabel: "88 要確認", track: "定常" },
        ],
      },
      schedule: {
        lead: "自動連携できるチャネルはそのまま配信、できないチャネル（PR TIMESなど）は<b>「ここに出してね」と指示だけ</b>出します。承認後、自動分は自走します。",
        rows: [
          { ch: "オウンドメディア", auto: true, ev: { 0: ["t", "制度改定の要点整理"], 2: ["t", "標準化の現在地"], 4: ["t", "セキュリティの備え"] } },
          { ch: "X", auto: true, ev: { 1: ["t", "早見表カード"], 3: ["t", "チェックリスト告知"], 5: ["t", "記事ダイジェスト"] } },
          { ch: "LinkedIn", auto: true, ev: { 0: ["t", "要点整理（B2B）"], 3: ["t", "保守・運用の論点"] } },
          { ch: "PR TIMES", auto: false, ev: { 2: ["a", "改定対応の体制を発表"] } },
        ],
      },
    },
  },

  strategyArchive: [
    { w: "今週 · 6/16週", th: "制度改定ウィーク：定常発信＋立ち上げキャンペーン", st: "you", pieces: "7本", reach: "~38k" },
    { w: "6/9週", th: "導入事例を軸にした信頼構築の定常発信", st: "live", pieces: "5本", reach: "31k" },
    { w: "6/2週", th: "セキュリティ需要の高まりに合わせた解説強化", st: "live", pieces: "6本", reach: "34k" },
    { w: "5/26週", th: "展示会連動：来場前後の指名流入を狙う", st: "live", pieces: "8本", reach: "42k" },
  ],

  trends: {
    blips: [
      { x: 50, y: 50, hot: true, l: "制度改定 +340%" },
      { x: 68, y: 38, l: "IT予算増 +62%" },
      { x: 38, y: 66, l: "標準化 +28%" },
      { x: 72, y: 64, hot: true, l: "セキュリティ事故" },
      { x: 30, y: 40, l: "競合A 解説記事" },
      { x: 58, y: 72, l: "競合B ウェビナー" },
    ],
    cards: [
      {
        h: "制度改定が国会で本格議論入り",
        pill: { kind: "auto", label: "関連 96" },
        body: "来月施行に向けた議論のピーク。指名流入を取りやすい窓は今〜2週間。戦略の主軸として採用済み。",
      },
      {
        h: "医療機関のIT予算が増額見通し",
        pill: { kind: "auto", label: "関連 88" },
        body: "来期の予算編成が動く。中長期の定常発信テーマとして反映。",
      },
      {
        h: "院内システムのセキュリティ事故",
        pill: { kind: "man", label: "要監視" },
        body: "過度に煽らず、備えの実務情報として扱う方針。レピュテーション審査で表現を調整。",
      },
    ],
  },

  knowledge: [
    { title: "ミッション・バリュー", body: "会社の存在意義と価値観。戦略のトーンの土台。", statusLabel: "最新", status: "fresh" },
    { title: "提供価値・強み", body: "「実装と保守・運用まで含む現実」という差別化軸。", statusLabel: "最新", status: "fresh" },
    { title: "サービスライン", body: "医療ITソリューション事業部の新サービスサイトを検出。", statusLabel: "更新候補", status: "stale" },
    { title: "ポジショニング", body: "エンタープライズ特化／星取り表で選ばれる前提。", statusLabel: "最新", status: "fresh" },
    { title: "トーン＆ボイス", body: "専門的・実直・誇張しない。禁則表現を含む。", statusLabel: "最新", status: "fresh" },
    { title: "ターゲット／ペルソナ", body: "医療機関のIT責任者・情シス・経営層。", statusLabel: "最新", status: "fresh" },
  ],

  content: {
    upcoming: [
      { title: "医療IT制度改定で何が変わるか — 要点整理", channels: ["オウンド", "LinkedIn"], meta: "97 通過 · 木 09:00 配信予定", badge: "hot" },
      { title: "「保守・運用」の見落とされがちな論点", channels: ["オウンド"], meta: "96 通過 · 金 09:00 配信予定" },
      { title: "当社の医療IT導入事例 vol.4", channels: ["オウンド"], meta: "88 要確認 · 配信保留", badge: "review" },
    ],
    published: [
      { title: "電子カルテ標準化の現在地（解説）", channels: ["オウンド", "X"], meta: "6/12 配信 · リーチ 9.2k" },
      { title: "セキュリティの最低限の備え", channels: ["オウンド"], meta: "6/10 配信 · リーチ 6.1k" },
    ],
    versionCompare: {
      title: "展示会フォロー記事（戦略変更により再提示）",
      note: "戦略が「制度改定」に更新されたため文脈を調整",
      channels: ["オウンド"],
      old: { label: "旧版", ver: "v3", body: "展示会の来場お礼を主軸にした文脈。骨子は維持。" },
      next: { label: "新版", ver: "v4 · 推奨", body: "制度改定の文脈を追記し、指名流入に最適化。" },
    },
  },

  channels: {
    unitLabel: "医療ITソリューション",
    channels: [
      { ic: "OM", color: "var(--signal)", n: "オウンドメディア", role: "大型記事の母艦。専門性と検索流入を積み上げる中心チャネル。", auto: true, posts: "週3", reach: "18k" },
      { ic: "X", color: "#cfd6e2", n: "X", role: "記事を小出しに展開し、日次で接点を作る。即時性の高い拡散担当。", auto: true, posts: "週5", reach: "12k" },
      { ic: "in", color: "#7fb1ff", n: "LinkedIn", role: "B2B意思決定層への到達。実装・運用の専門性を訴求する。", auto: true, posts: "週2", reach: "8k" },
      { ic: "PR", color: "var(--amber)", n: "PR TIMES", role: "API連携不可。AIが「ここに出してね」と指示だけ出す手動チャネル。", auto: false, posts: "随時", reach: "—" },
    ],
  },
};
