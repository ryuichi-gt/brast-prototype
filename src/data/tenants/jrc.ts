import type { TenantBundle } from "../types";

/**
 * JRCエンジニアリング — 医療ITソリューション事業部 (default tenant).
 *
 * Grounded in real public information (researched 2026-06):
 *  - JRCエンジニアリング株式会社 is a 100% subsidiary of 日本無線 (Japan Radio Co.),
 *    under 日清紡HD. ISO 9001 / ISO 27001 certified. Site: jrce.co.jp / jrce.jp.
 *  - Medical IT business is ORCA-centric (日医標準レセプトソフト): ORCA導入
 *    (オンプレ/クラウド WebORCA), 電子カルテ連携 (multi-vendor), オンライン資格確認,
 *    レセボット (請求自動化), Medical RPA, DICOM, サポートセンター.
 *  - 2024 spin-out 株式会社メディカル・オーシャン (医療DX対応の子会社).
 *  - No confirmed official X / LinkedIn / blog → matches the BRAST premise that
 *    they can't broadcast their value well.
 *
 * Real 2026 trends used: 電子カルテ情報共有サービス (三文書六情報 / HL7 FHIR,
 * 本格運用 2026年度冬), 医療DX推進体制整備加算 (要件段階強化), 安全管理GL第6.0版
 * (2027年度 二要素認証/BCP), 電子処方箋 病院導入<20%, 大阪のランサム被害(10億円和解).
 *
 * NOTE on numbers: scores / reach / relevance figures are realistic *estimates*
 * (Phase-1 prototype convention), not measured values. Article bodies are the
 * kind of content the Content agent would generate, grounded in the sources
 * listed on each piece.
 */
export const jrc: TenantBundle = {
  tenant: {
    id: "jrc",
    name: "JRCエンジニアリング",
    unit: "医療ITソリューション事業部",
    channels: ["オウンドメディア", "X", "PR TIMES"],
  },

  briefing: {
    weekLabel: "電子カルテ情報共有サービス対応ウィーク",
    weekPill: { code: "2026 W26", date: "6/22" },
    deckSubtitle: "AIが全工程を自走 · あなたの承認待ち",
    pipeline: [
      { key: "know", n: "ナレッジ更新", d: "自社サイト(jrce.jp)・子会社・公開資料を再走査し差分を検出", meta: "差分 2件", state: "done" },
      { key: "trend", n: "トレンド調査", d: "厚労省・デジタル庁・業界紙をリアルタイム収集", meta: "毎週月 06:00 自動 · ライブ", state: "done" },
      { key: "strat", n: "戦略統合", d: "市場・競合エージェントの結論を統合し週次戦略を決定", meta: "2エージェントを統合", state: "done" },
      { key: "gen", n: "コンテンツ生成", d: "戦略に基づきORCA/医療DXの記事・SNS草稿を生成", meta: "7本生成", state: "done" },
      { key: "img", n: "画像生成", d: "各記事のキービジュアルを生成", meta: "5点生成", state: "done" },
      {
        key: "review",
        n: "多段レビュー",
        d: "4体の審査エージェントが並列審査",
        meta: "1件が要確認",
        state: "done",
        subs: ["AIライティング検知", "法務・景表法", "レピュテーション", "IR・専門(医療IT)"],
      },
      { key: "score", n: "スコアリング", d: "90点しきい値で人間レビュー要否を判定", meta: "平均 94 / 100", state: "done" },
      { key: "you", n: "あなたのレビュー", d: "プレゼンを承認、または該当工程へ差し戻し", meta: "判断待ち", state: "you" },
      { key: "dist", n: "配信", d: "承認後、各チャネルへ自動／手動で配信", meta: "承認後に起動", state: "pending" },
    ],
    titles: {
      summary: "電子カルテ情報共有サービスの本格運用を前に、ORCA定常発信＋対応支援キャンペーンの2本立てを提案します",
      knowledge: "ベースナレッジはおおむね最新。サービスラインに更新候補が1件",
      trend: "電子カルテ情報共有サービス（FHIR）の本格運用接近が、今週の最大のトレンド信号です",
      competitor: "大手は製品と「解説」で先行。保守・運用とマルチベンダー移行の現実は空白のままです",
      strategy: "なぜこの戦略か — 各エージェントの結論と統合",
      plan: "今週の具体プラン — 7本を生成済み、うち6本がしきい値通過",
      schedule: "配信スケジュール — 自動連携と手動投稿を1枚で",
    },
    slides: {
      summary: {
        lead: "電子カルテ情報共有サービス（三文書六情報・HL7 FHIR）の全国本格運用が<b>2026年度冬</b>に迫り、ORCA利用施設からの対応相談が増えています。<b>ORCA・レセプト効率化の定常発信</b>に加え、共有サービス対応を後押しする<b>立ち上げキャンペーン（1ヶ月）</b>の起動を提案します。下の2トラックを承認いただければ、今週分の配信まで自走します。",
        kpis: [
          { v: "7", unit: "本", l: "生成済みコンテンツ", d: "▲ 先週 +2", dTone: "up" },
          { v: "3", unit: "ch", l: "配信チャネル", d: "自動2 / 手動1" },
          { v: "94", unit: "/100", l: "平均審査スコア", d: "1本がしきい値未満", dTone: "warn" },
          { v: "~24", unit: "k", l: "想定リーチ（週・推定）", d: "▲ +18%", dTone: "up" },
        ],
        tracks: [
          {
            kind: "steady",
            title: "定常発信",
            tag: "継続",
            body: "ORCA・レセプト業務の効率化や医療DXの実務を、現場目線で解説。専門性と信頼を継続的に積み上げる。",
            meta: [
              { k: "記事", v: "2本" },
              { k: "SNS", v: "4投稿" },
              { k: "目的", v: "認知・信頼" },
            ],
          },
          {
            kind: "camp",
            title: "共有サービス対応キャンペーン",
            tag: "新規・要承認",
            body: "2026年度冬の本格運用に向け、ORCA利用施設の「三文書六情報・FHIR対応」を後押しする1ヶ月の集中施策。問い合わせ獲得（CV）を目標に設計。",
            meta: [
              { k: "期間", v: "4週" },
              { k: "記事", v: "4本" },
              { k: "目的", v: "CV・問い合わせ" },
            ],
          },
        ],
      },
      knowledge: {
        lead: "会社や事業の前提情報は、こちらが意図的に更新しない限り世の中が勝手に変えるものではありません。差分だけを検知してお知らせします。今週は<b>サービスラインの記述</b>に更新候補があります（子会社メディカル・オーシャンの事業内容）。",
        cards: [
          {
            title: "会社・事業の前提",
            status: "fresh",
            statusLabel: "最新",
            items: ["日本無線（JRC）グループ／日清紡HD傘下：変更なし", "ISO 9001・ISO 27001 認証：維持", "最終走査：3日前"],
          },
          {
            title: "サービスライン",
            status: "stale",
            statusLabel: "更新候補",
            items: [
              "子会社メディカル・オーシャン（2024設立）の事業内容を新規検出",
              "レセボット・Medical RPA の最新提供範囲の反映を提案",
              "承認すると以降の戦略に反映されます",
            ],
          },
          {
            title: "ポジショニング",
            status: "fresh",
            statusLabel: "最新",
            items: ["ORCA一貫サポート×マルチベンダー連携×保守運用の現実：維持", "標準型電子カルテ(無償)に対し付加価値で差別化：維持"],
          },
          {
            title: "トーン＆ボイス",
            status: "fresh",
            statusLabel: "最新",
            items: ["実直・誇張しない・不安を煽らない：維持", "薬機法・景表法の禁則表現：変更なし"],
          },
        ],
      },
      trend: {
        lead: "ナレッジを前提に、今週<b>自動で走った調査</b>の結果です。関連度の高い順に並べています。出典は厚労省・デジタル庁・業界紙。この信号群が、次のスライドの戦略の根拠になります。",
        signals: [
          { score: 96, h: "電子カルテ情報共有サービス（三文書六情報・HL7 FHIR）が2026年度冬の本格運用へ", src: "厚労省 健康・医療・介護情報利活用検討会 資料", delta: "本格運用目前", hot: true },
          { score: 89, h: "医療DX推進体制整備加算、マイナ保険証利用率のしきい値を段階的に引き上げ（25/10・26/3）", src: "2024年度診療報酬改定 · 厚労省通知", delta: "要件強化" },
          { score: 82, h: "医療情報システムの安全管理GL第6.0版、2027年度に二要素認証・BCPを要請", src: "厚労省ガイドライン · 業界紙", delta: "義務化進行", hot: true },
          { score: 71, h: "電子処方箋の病院導入は依然2割未満、未対応層が商機", src: "デジタル庁 普及状況ダッシュボード", delta: "導入余地大" },
        ],
        foot: "毎週月曜 06:00 に自動実行。出典：厚労省／デジタル庁／業界紙。直近の調査は <b>本日 06:00</b> 完了。",
      },
      competitor: {
        lead: "同じトレンドに、競合も反応しています。各社とも<b>製品起点 ＋ 制度・標準化の「解説」</b>に寄っており、<b>保守・運用・マルチベンダー混在の移行の現実</b>は空白のままです。先んじて埋めるのが今週の狙いです。",
        signals: [
          { score: 92, h: "ウィーメックス（旧PHC・メディコム）：電子カルテ情報共有サービスの解説記事を相次ぎ公開", src: "Park オウンドメディア", delta: "発信強化", hot: true },
          { score: 88, h: "NEC：生成AI電子カルテ MegaOak/iS の導入事例・働き方改革訴求を継続", src: "プレスリリース · 業界紙", delta: "継続" },
          { score: 84, h: "富士通Japan：病院向けDX支援「デジタルホスピタル」へ事業を発信", src: "業界紙 · 自社サイト", delta: "新規" },
          { score: 71, h: "トレンドマイクロ／TXOne：安全管理ガイドライン第6.0版の解説でセキュリティ需要に対応", src: "セキュリティベンダー各社", delta: "継続", hot: true },
          { score: 55, h: "自社：これらに対し「保守・運用まで含む実装の現実」での発信はまだ空白", src: "自社チャネル走査", delta: "空白", hot: true },
        ],
        foot: "競合調査は週1回。製品・解説で先行する大手に対し、<b>マルチベンダー混在の運用・移行の現実</b>という空白テーマを戦略へ自動反映します。",
      },
      strategy: {
        lead: "フルオートで作っていますが、<b>どう考えたか</b>は全部開示します。気に入らない結論があれば、その担当エージェントまで戻して下流だけ作り直せます。",
        nodes: [
          {
            nm: "市場分析",
            role: "Market Agent",
            says: "電子カルテ情報共有サービスの本格運用が<b>2026年度冬</b>に迫り、ORCA利用施設で「三文書六情報・FHIR対応」の相談が増える局面。いまが準備支援で指名を取りやすい窓。",
          },
          {
            nm: "競合分析",
            role: "Competitor Agent",
            says: "ウィーメックス・NEC・富士通は製品と制度「解説」で先行。だが保守・運用・マルチベンダー混在の移行の現実は空白。差別化は<b>「ORCA一貫サポートと多ベンダー連携の実績」</b>という当社の強み軸に寄せるべき。",
          },
          {
            nm: "統合判断",
            role: "Strategy Orchestrator",
            synth: true,
            says: "2つの結論を統合し、<b>定常発信（ORCA・レセプト効率化・医療DX実務の信頼積み上げ）＋ 共有サービス対応キャンペーン（問い合わせ獲得）</b>の2トラックを今週の戦略とする。解説型の大手に対し、実装と運用の現実で差別化する。",
          },
        ],
      },
      plan: {
        lead: "戦略に紐づく今週の具体物です。各記事は <b>生成 → 4体レビュー → スコアリング</b> を通過済み。スコア90以上は基本そのまま、未満はあなたの確認を推奨します。<b>タイトルをタップで本文を確認できます。</b>",
        pieces: [
          { title: "電子カルテ情報共有サービスとは何か — ORCAユーザーが「三文書六情報」にどう備えるか", channels: ["オウンド", "X"], score: 97, status: "pass", statusLabel: "97 通過", track: "キャンペーン", articleId: "fhir-guide" },
          { title: "医療DX推進体制整備加算を取り切る — 要件と運用の実務チェック", channels: ["オウンド"], score: 96, status: "pass", statusLabel: "96 通過", track: "キャンペーン", articleId: "kasan-checklist" },
          { title: "月末のレセプト残業をなくす — レセボットで請求業務を自動化する実務", channels: ["オウンド", "X"], score: 95, status: "pass", statusLabel: "95 通過", track: "定常", articleId: "recebot" },
          { title: "安全管理ガイドライン第6.0版、クリニックが2027年度までにやること", channels: ["オウンド"], score: 93, status: "pass", statusLabel: "93 通過", track: "定常", articleId: "security60" },
          { title: "電子カルテ情報共有サービス対応チェックリスト（配布資料）", channels: ["オウンド", "X"], score: 94, status: "pass", statusLabel: "94 通過", track: "キャンペーン", articleId: "fhir-checklist" },
          { title: "医療DX推進体制整備加算の要件 早見表（SNS用カード）", channels: ["X"], score: 92, status: "pass", statusLabel: "92 通過", track: "キャンペーン", articleId: "kasan-card" },
          { title: "ORCA＋電子カルテ連携 導入事例 vol.4（医療法人A様）", channels: ["オウンド"], score: 88, status: "review", statusLabel: "88 要確認", track: "定常", articleId: "case-orca" },
        ],
      },
      schedule: {
        lead: "自動連携できるチャネルはそのまま配信、できないチャネル（PR TIMES）は<b>「ここに出してね」と指示だけ</b>出します。承認後、自動分は自走します。",
        rows: [
          { ch: "オウンドメディア", auto: true, ev: { 0: ["t", "共有サービス解説"], 2: ["t", "レセボット実務"], 4: ["t", "GL6.0版の備え"] } },
          { ch: "X", auto: true, ev: { 1: ["t", "加算 早見表カード"], 3: ["t", "チェックリスト告知"], 5: ["t", "記事ダイジェスト"] } },
          { ch: "PR TIMES", auto: false, ev: { 2: ["a", "共有サービス対応の体制を発表"] } },
        ],
      },
    },
  },

  strategyArchive: [
    { w: "今週 · 6/22週", th: "共有サービス対応ウィーク：ORCA定常発信＋FHIR対応キャンペーン", st: "you", pieces: "7本", reach: "~24k" },
    { w: "6/15週", th: "レセプト効率化（レセボット）を軸にした定常発信", st: "live", pieces: "5本", reach: "20k" },
    { w: "6/8週", th: "安全管理ガイドライン第6.0版に合わせたセキュリティ解説", st: "live", pieces: "6本", reach: "22k" },
    { w: "6/1週", th: "医療DX推進体制整備加算の取得支援を軸に", st: "live", pieces: "5本", reach: "19k" },
  ],

  trends: {
    blips: [
      { x: 50, y: 50, hot: true, l: "共有サービス/FHIR" },
      { x: 67, y: 40, l: "加算 引き上げ" },
      { x: 37, y: 64, hot: true, l: "GL6.0版/二要素認証" },
      { x: 71, y: 65, l: "電子処方箋 <20%" },
      { x: 31, y: 43, l: "ウィーメックス 解説" },
      { x: 60, y: 71, l: "NEC 生成AIカルテ" },
    ],
    cards: [
      {
        h: "電子カルテ情報共有サービスが2026年度冬に本格運用",
        pill: { kind: "auto", label: "関連 96" },
        body: "三文書六情報・HL7 FHIR対応が事実上の標準に。ORCA利用施設の対応相談が増える局面。キャンペーンの主軸として採用済み。",
      },
      {
        h: "医療DX推進体制整備加算の要件が段階強化",
        pill: { kind: "auto", label: "関連 89" },
        body: "マイナ保険証利用率のしきい値引き上げ（25/10・26/3）。投資回収（ROI）の説明材料として定常発信に反映。",
      },
      {
        h: "安全管理GL第6.0版・2027年度の二要素認証/BCP",
        pill: { kind: "man", label: "要監視" },
        body: "大阪の医療センターのランサム被害（3社計10億円で和解）も背景。不安を煽らず、実務情報として扱う方針。",
      },
    ],
  },

  knowledge: [
    { title: "ミッション・事業基盤", body: "日本無線（JRC）グループ／日清紡HD傘下。ISO 9001・27001取得。", statusLabel: "最新", status: "fresh" },
    { title: "提供価値・強み", body: "ORCA導入から運用・保守まで一貫サポート。マルチベンダー電子カルテ連携の実績。", statusLabel: "最新", status: "fresh" },
    { title: "サービスライン", body: "ORCA・レセボット・Medical RPA・DICOM。子会社メディカル・オーシャンを新規検出。", statusLabel: "更新候補", status: "stale" },
    { title: "ポジショニング", body: "標準型電子カルテ(無償)に対し、実装と運用の現実で付加価値を出す。", statusLabel: "最新", status: "fresh" },
    { title: "トーン＆ボイス", body: "実直・誇張しない・不安を煽らない。薬機法／景表法に配慮。", statusLabel: "最新", status: "fresh" },
    { title: "ターゲット／ペルソナ", body: "ORCA利用の診療所・中小病院の院長／事務長、医療IT事業者。", statusLabel: "最新", status: "fresh" },
  ],

  content: {
    upcoming: [
      { title: "電子カルテ情報共有サービスとは何か — ORCAユーザーの備え方", channels: ["オウンド", "X"], meta: "97 通過 · 木 09:00 配信予定", badge: "hot", articleId: "fhir-guide" },
      { title: "医療DX推進体制整備加算を取り切る 実務チェック", channels: ["オウンド"], meta: "96 通過 · 金 09:00 配信予定", articleId: "kasan-checklist" },
      { title: "ORCA＋電子カルテ連携 導入事例 vol.4（医療法人A様）", channels: ["オウンド"], meta: "88 要確認 · 配信保留", badge: "review", articleId: "case-orca" },
    ],
    published: [
      { title: "月末のレセプト残業をなくす レセボット活用", channels: ["オウンド", "X"], meta: "6/12 配信 · リーチ 7.1k", articleId: "recebot" },
      { title: "安全管理ガイドライン第6.0版の備え", channels: ["オウンド"], meta: "6/10 配信 · リーチ 5.3k", articleId: "security60" },
    ],
    versionCompare: {
      title: "オンライン資格確認の解説記事（戦略変更により再提示）",
      note: "戦略が「共有サービス対応」に更新されたため文脈を調整",
      channels: ["オウンド"],
      old: { label: "旧版", ver: "v3", body: "オンライン資格確認の導入手順を主軸にした文脈。骨子は維持。" },
      next: { label: "新版", ver: "v4 · 推奨", body: "電子カルテ情報共有サービスへの接続を見据えた文脈に更新し、問い合わせ導線を最適化。" },
    },
  },

  channels: {
    unitLabel: "医療ITソリューション",
    channels: [
      { ic: "OM", color: "var(--signal)", n: "オウンドメディア", role: "ORCA・医療DXの実務解説の母艦。検索流入と信頼を積み上げる中心チャネル（jrce.jp）。", auto: true, posts: "週2-3", reach: "12k" },
      { ic: "X", color: "#cfd6e2", n: "X", role: "記事の小出し展開と速報。新規開設し日次の接点を作る想定の拡散担当。", auto: true, posts: "週5", reach: "6k" },
      { ic: "PR", color: "var(--amber)", n: "PR TIMES", role: "API連携不可。AIが配信指示のみ出す手動チャネル。重要発表に使用。", auto: false, posts: "随時", reach: "—" },
    ],
  },

  brandRules: {
    summary:
      "ブランドの憲法です。戦略・コンテンツ・外部からの修正指示は、すべてこのルールに照合されます（規範チェック S5）。各ルールはまずAIが提案し、あなたが承認・編集します。",
    channelStrategy: [
      { name: "オウンドメディア (jrce.jp)", role: "ORCA・医療DXの実務解説の母艦。検索流入と信頼の中心。", auto: true, status: "approved" },
      { name: "X", role: "記事の小出し・速報。日次の接点づくり。", auto: true, status: "approved" },
      { name: "PR TIMES", role: "重要発表の手動配信チャネル（API連携不可）。", auto: false, status: "approved" },
      {
        name: "【AI提案】医療機関向け 制度対応 専用メディアサイトの新設",
        role: "ORCA/医療DXの導入検討層に特化した独立メディア。オウンド内の一記事群では埋もれる「制度対応の意思決定支援」を専用ドメインで束ねる。",
        auto: true,
        status: "proposed",
        aiProposed: true,
        reason: "電子カルテ情報共有サービスの本格運用（2026年度冬）に向け検討需要が増大。検索意図が『製品』ではなく『制度対応』に寄るため、専用サイトで信頼と指名を獲得できると判断。",
      },
    ],
    guardrails: [
      { kind: "must", category: "トーン", text: "実直・誇張しない・不安を煽らない。専門家として淡々と伝える。", status: "approved" },
      { kind: "forbidden", category: "薬機法・景表法", text: "医療広告ガイドライン／景表法に抵触する効果の断定・最上級表現を使わない。", status: "approved" },
      { kind: "forbidden", category: "主張の制約", text: "他社製品を名指しで優劣比較・断定批判しない（比較は事実ベースに限る）。", status: "approved" },
      { kind: "forbidden", category: "レピュテーション", text: "ランサム・事故で患者の不安を煽る表現を禁止。事例は施設名匿名・本人許諾を前提とする。", status: "approved" },
      {
        kind: "must",
        category: "トーン",
        text: "生成AI・自動化の説明では『人の判断を置き換えず、支える』前提を必ず明記する。",
        status: "proposed",
        aiProposed: true,
        reason: "現場の置き換え不安への配慮と、差別化メッセージの一貫性を担保するため。",
      },
    ],
    kpis: [
      { track: "steady", label: "認知・信頼", definition: "オウンドの検索流入、記事リーチ、指名検索数の継続的な増加。", status: "approved" },
      { track: "campaign", label: "CV・問い合わせ", definition: "資料DL数・問い合わせ件数・該当LPのCVR。", status: "approved" },
      {
        track: "campaign",
        label: "加算取得相談の獲得",
        definition: "医療DX推進体制整備加算に関する相談・問い合わせ件数。",
        status: "proposed",
        aiProposed: true,
        reason: "加算は投資回収の文脈でCVに直結し、当社サービスへの導線になるため、独立KPIとして追跡を提案。",
      },
    ],
    revisions: [
      { date: "2026-06-22", who: "AI · Strategy Orchestrator", note: "共有サービス対応に伴い、制度対応専用メディアの新設とKPI追加を提案" },
      { date: "2026-06-15", who: "岡本 龍一", note: "トーン規範『不安を煽らない』を承認" },
      { date: "2026-06-01", who: "AI · Strategy Orchestrator", note: "初期ブランド運用ルール（出面・ガードレール・KPI）を提案" },
    ],
  },

  articles: {
    "fhir-guide": {
      id: "fhir-guide",
      kind: "article",
      title: "電子カルテ情報共有サービスとは何か — ORCAユーザーが「三文書六情報」にどう備えるか",
      dek: "2026年度冬の本格運用に向けて、ORCAを使う診療所が「三文書六情報」とHL7 FHIRにどう備えればよいかを、実装と運用の観点から整理します。",
      channels: ["オウンドメディア", "X"],
      track: "キャンペーン",
      score: 97,
      status: "pass",
      keyVisual: "医療機関同士が共有サービスを介して診療情報をやり取りする様子を、落ち着いたティール基調のフラットイラストで表現。",
      reviews: [
        { label: "AIライティング検知", score: 96, note: "人間の編集痕跡あり。機械的な定型文は検出されず。" },
        { label: "法務・景表法", score: 98, note: "誇大表現なし。「事実上の基準」は断定を避けた表現に調整済み。" },
        { label: "レピュテーション", score: 97, note: "不安を煽る表現なし。中立的なトーン。" },
        { label: "IR・専門(医療IT)", score: 96, note: "三文書六情報・FHIR・本格運用時期の記述は公開資料と整合。" },
      ],
      body: [
        { type: "h2", text: "電子カルテ情報共有サービスとは" },
        { type: "p", html: "厚生労働省が進める医療DXの中核として、医療機関の間で診療情報を共有する「電子カルテ情報共有サービス」の全国本格運用が、<b>2026年度の冬ごろ</b>に予定されています。オンライン資格確認の既存ネットワークを土台に、施設をまたいで患者情報を参照できる仕組みです。" },
        { type: "p", html: "共有の対象は、<b>3文書</b>（診療情報提供書・退院時サマリー・健康診断結果報告書）と<b>6情報</b>（傷病名・アレルギー・感染症・薬剤禁忌・検査・処方）。国際標準の <b>HL7 FHIR</b> を採用しており、これに沿った出力ができるかどうかが、今後のシステム選定の事実上の基準になりつつあります。" },
        { type: "h2", text: "ORCA利用施設が、いま確認しておくべきこと" },
        { type: "ul", items: [
          "お使いのORCA・電子カルテが、三文書六情報の出力とFHIR連携に対応する見込みか",
          "オンライン資格確認の運用が安定しているか（共有サービスは同じ基盤の上に乗ります）",
          "院内の運用フロー（誰がいつ情報を登録・確認するか）を整理できているか",
        ] },
        { type: "p", html: "重要なのは、製品を新しくすること自体が目的ではない点です。既存のORCA運用を活かしながら、共有サービスに「つながる」状態を、無理のない移行計画で整えることが現実的な備えになります。" },
        { type: "h2", text: "「つなぐ」ところでつまずかないために" },
        { type: "p", html: "実際の現場では、電子カルテとORCA、オンライン資格確認端末、各種周辺機器が複数ベンダーで混在しているケースがほとんどです。標準に対応していても、この<b>混在環境での接続・移行</b>でつまずくことが少なくありません。当社は各社電子カルテとの連携設定に豊富な経験があり、導入から運用・保守までを一貫して支援します。" },
        { type: "quote", html: "「標準対応」はゴールではなく出発点です。動かし続けられる運用に落とすところまでが、本当の対応です。" },
        { type: "p", html: "本格運用に向けて、まずは自院の対応状況を棚卸しすることをおすすめします。セルフチェック用のチェックリストもご用意しています。" },
      ],
      sources: [
        { label: "厚労省：電子カルテ情報共有サービス／三文書六情報・FHIR（健康・医療・介護情報利活用検討会 資料）", url: "https://www.mhlw.go.jp/content/10808000/001608497.pdf" },
        { label: "厚労省：医療DX令和ビジョン2030", url: "https://www.mhlw.go.jp/stf/shingi/other-isei_210261_00003.html" },
        { label: "JRCエンジニアリング 医療ITソリューション（JRCE-ORCA）", url: "https://www.jrce.jp/" },
      ],
    },

    "kasan-checklist": {
      id: "kasan-checklist",
      kind: "article",
      title: "医療DX推進体制整備加算を取り切る — 要件と運用の実務チェック",
      dek: "2024年度改定で新設された医療DX推進体制整備加算。要件と、取得後に効いてくる運用面の実務を、チェック形式で整理します。",
      channels: ["オウンドメディア"],
      track: "キャンペーン",
      score: 96,
      status: "pass",
      keyVisual: "診療報酬の加算要件をチェックリスト化したクリップボードを、紙の質感とアンバーのアクセントで。",
      reviews: [
        { label: "AIライティング検知", score: 95, note: "定型的な羅列を避け、実務の文脈で再構成済み。" },
        { label: "法務・景表法", score: 97, note: "点数の具体額は明記せず、要件の趣旨に絞っており適切。" },
        { label: "レピュテーション", score: 96, note: "中立的。煽りなし。" },
        { label: "IR・専門(医療IT)", score: 95, note: "区分・しきい値引き上げ時期は公開情報と整合。" },
      ],
      body: [
        { type: "h2", text: "医療DX推進体制整備加算とは" },
        { type: "p", html: "2024年度の診療報酬改定で新設された加算で、オンライン資格確認で取得した情報の活用、電子処方箋・電子カルテ情報共有サービスの導入、マイナ保険証の利用促進などに取り組む体制を評価するものです。医療DXへの投資を、診療報酬という形で回収する道筋になります。" },
        { type: "p", html: "区分はマイナ保険証の利用率に応じて段階化されており、しきい値は <b>2025年10月・2026年3月</b> と段階的に引き上げられてきました。要件は固定ではなく、継続的に基準を満たし続ける運用が前提になります。" },
        { type: "h2", text: "取得のためのチェックポイント" },
        { type: "ul", items: [
          "オンライン資格確認を導入し、取得した診療情報を実際に活用しているか",
          "電子処方箋を導入しているか（病院での導入はまだ2割未満で、ここが差になります）",
          "電子カルテ情報共有サービスへの対応・参加の方針があるか",
          "マイナ保険証の利用率が該当区分のしきい値を満たしているか",
          "医療DX推進の体制を、院内掲示と自院サイトで掲示しているか",
        ] },
        { type: "h2", text: "取った後に効いてくる「運用」" },
        { type: "p", html: "加算は取得して終わりではありません。マイナ保険証の利用率は患者対応の積み重ねで動きますし、しきい値の引き上げに合わせて体制を維持する必要があります。日々のレセプト業務や資格確認の運用が安定していてこそ、無理なく基準を満たし続けられます。" },
        { type: "quote", html: "加算は「投資の回収」であると同時に、医療DXの体制が回っているかを映す鏡でもあります。" },
        { type: "p", html: "要件の最新情報は改定のたびに更新されます。自院の状況に合わせた整理が必要な場合は、お気軽にご相談ください。" },
      ],
      sources: [
        { label: "厚労省：医療DX推進体制整備加算 通知", url: "https://www.mhlw.go.jp/content/10200000/001277499.pdf" },
        { label: "デジタル庁：電子処方箋 普及状況ダッシュボード", url: "https://www.digital.go.jp/en/resources/govdashboard/electronic-prescription" },
      ],
    },

    "recebot": {
      id: "recebot",
      kind: "article",
      title: "月末のレセプト残業をなくす — レセボットで請求業務を自動化する実務",
      dek: "月末に集中するレセプト業務。レセボット（Rece-Bot）で請求の確認・点検を自動化し、残業と人的ミスを減らす実務を解説します。",
      channels: ["オウンドメディア", "X"],
      track: "定常",
      score: 95,
      status: "pass",
      keyVisual: "月末カレンダーと自動化を象徴する歯車を、ティール基調で穏やかに。",
      reviews: [
        { label: "AIライティング検知", score: 94, note: "実務トーンで自然。問題なし。" },
        { label: "法務・景表法", score: 96, note: "効果を断定せず「補助」「軽減」に留めており適切。" },
        { label: "レピュテーション", score: 95, note: "中立的。" },
        { label: "IR・専門(医療IT)", score: 95, note: "レセプト・ORCAの記述は実務と整合。" },
      ],
      body: [
        { type: "h2", text: "なぜ月末だけ忙しくなるのか" },
        { type: "p", html: "レセプト（診療報酬明細書）の作成・点検は、月初の数日に業務が集中します。件数が多いほど目視チェックの負担と返戻・査定のリスクが高まり、残業の常態化につながりがちです。" },
        { type: "h2", text: "レセボットでできること" },
        { type: "ul", items: [
          "請求点検のルールに沿った自動チェックで、人手の確認を補助",
          "形式的なエラーや記載漏れの早期検出",
          "月末作業のピークを平準化し、属人化をやわらげる",
        ] },
        { type: "p", html: "ポイントは、人を置き換えるのではなく<b>人の判断を支える</b>ことです。最終的な確認は人が行いつつ、機械的に拾える部分を自動化することで、本来時間をかけるべき判断に集中できます。" },
        { type: "h2", text: "ORCAと一体で考える" },
        { type: "p", html: "レセボットはORCAの運用と組み合わせることで効果を発揮します。当社はORCA導入から運用・保守までを一貫して支援しており、請求業務の現実に即した形での自動化をご提案できます。" },
        { type: "quote", html: "自動化のゴールは「楽をすること」ではなく、ミスを減らし、人にしかできない判断に時間を戻すことです。" },
      ],
      sources: [
        { label: "JRCエンジニアリング 医療ITソリューション（レセボット）", url: "https://www.jrce.co.jp/medical/" },
        { label: "JRCエンジニアリング Medical RPA", url: "https://www.jrce.co.jp/products/medicalrpa.html" },
      ],
    },

    "security60": {
      id: "security60",
      kind: "article",
      title: "安全管理ガイドライン第6.0版、クリニックが2027年度までにやること",
      dek: "医療情報システムの安全管理ガイドライン第6.0版。クリニックが2027年度までに整えるべきこと（二要素認証・BCP）を、過度に不安を煽らず実務目線で整理します。",
      channels: ["オウンドメディア"],
      track: "定常",
      score: 93,
      status: "pass",
      keyVisual: "鍵とネットワークのアイコンを落ち着いた配色で。脅威を煽らない穏やかなトーン。",
      reviews: [
        { label: "AIライティング検知", score: 93, note: "問題なし。" },
        { label: "法務・景表法", score: 95, note: "義務の範囲を正確に記述。過度な恐怖訴求なし。" },
        { label: "レピュテーション", score: 94, note: "ランサム事例は施設名を出さず一般化。不安を煽らないトーンを維持。" },
        { label: "IR・専門(医療IT)", score: 93, note: "6.0版・ゼロトラスト・2027年度二要素認証/BCPの記述は公開情報と整合。" },
      ],
      body: [
        { type: "h2", text: "何が変わったのか" },
        { type: "p", html: "医療情報システムの安全管理に関するガイドラインは第6.0版で、従来の「境界防御」中心の考え方から、内部も信頼しすぎない<b>ゼロトラスト</b>の考え方へと軸足を移しました。あわせて、医療法の規定により、医療機関の管理者にはサイバーセキュリティ確保のための措置が求められています。" },
        { type: "p", html: "チェックリストでは、<b>二要素認証の導入</b>やサイバー攻撃に備えた <b>BCP（事業継続計画）</b> の策定が、2027年度を一つの目安として求められています。" },
        { type: "h2", text: "クリニックが現実的にやること" },
        { type: "ul", items: [
          "重要システムへのアクセスに二要素認証を導入する",
          "インシデント時の連絡・初動・復旧の手順をBCPとして文書化する",
          "バックアップを取得し、実際に復旧できることを確認する",
          "外部委託先・保守経路（VPN等）の管理を見直す",
        ] },
        { type: "p", html: "近年は、委託先の経路を入口に院内システムが被害を受けた事例など、<b>取引先や保守経路を経由した攻撃</b>が現実になっています。自院の対策だけでなく、つながっている相手まで含めて点検することが重要です。" },
        { type: "quote", html: "目的は「完璧な防御」ではなく、止まっても素早く戻せること。検知・初動・復旧まで含めて備えるのが第6.0版の考え方です。" },
        { type: "p", html: "何から手を付けるべきか迷う場合は、現状の棚卸しからお手伝いします。" },
      ],
      sources: [
        { label: "厚労省：医療情報システムの安全管理に関するガイドライン 第6.0版", url: "https://www.mhlw.go.jp/stf/shingi/0000516275_00006.html" },
        { label: "日経xTECH：大阪急性期・総合医療センターのランサム被害（解決金10億円で和解）", url: "https://xtech.nikkei.com/atcl/nxt/news/24/02754/" },
      ],
    },

    "fhir-checklist": {
      id: "fhir-checklist",
      kind: "asset",
      title: "電子カルテ情報共有サービス対応チェックリスト（配布資料）",
      dek: "自院の電子カルテ情報共有サービス対応状況を、5分で棚卸しできるチェックリスト（配布用）。",
      channels: ["オウンドメディア", "X"],
      track: "キャンペーン",
      score: 94,
      status: "pass",
      keyVisual: "印刷して使えるA4チェックシートのレイアウトプレビュー。",
      reviews: [
        { label: "AIライティング検知", score: 95, note: "問題なし。" },
        { label: "法務・景表法", score: 96, note: "断定・誇大なし。" },
        { label: "レピュテーション", score: 95, note: "中立的。" },
        { label: "IR・専門(医療IT)", score: 94, note: "設問は公開資料の要件に沿う。" },
      ],
      body: [
        { type: "h2", text: "対応状況セルフチェック" },
        { type: "ul", items: [
          "□ ORCA／電子カルテが三文書六情報の出力に対応（予定含む）",
          "□ HL7 FHIR連携の対応見込みをベンダーに確認済み",
          "□ オンライン資格確認が安定稼働している",
          "□ 院内の情報登録・確認の運用フローが決まっている",
          "□ 移行スケジュールの大枠を描けている",
        ] },
        { type: "p", html: "3つ以上チェックが付かない場合は、本格運用前に準備を始めることをおすすめします。詳しい解説記事もあわせてご覧ください。" },
      ],
      sources: [
        { label: "厚労省：電子カルテ情報共有サービス（健康・医療・介護情報利活用検討会 資料）", url: "https://www.mhlw.go.jp/content/10808000/001608497.pdf" },
      ],
    },

    "kasan-card": {
      id: "kasan-card",
      kind: "sns",
      title: "医療DX推進体制整備加算の要件 早見表（SNS用カード）",
      dek: "医療DX推進体制整備加算の要件を、X用に1枚へ要約したカード原稿。",
      channels: ["X"],
      track: "キャンペーン",
      score: 92,
      status: "pass",
      keyVisual: "正方形のSNSカード。要点3つをアンバーの見出しで。",
      reviews: [
        { label: "AIライティング検知", score: 93, note: "問題なし。" },
        { label: "法務・景表法", score: 94, note: "断定・誇大なし。" },
        { label: "レピュテーション", score: 93, note: "中立的。" },
        { label: "IR・専門(医療IT)", score: 92, note: "要件の要約は妥当。" },
      ],
      body: [
        { type: "h2", text: "投稿本文（草案）" },
        { type: "p", html: "【医療DX推進体制整備加算 早わかり】<br>① オンライン資格確認の情報を“活用”しているか<br>② 電子処方箋・電子カルテ情報共有サービスへの対応<br>③ マイナ保険証の利用率（しきい値は段階的に引き上げ）<br>取得は投資の回収。運用が回っているかの確認にも。詳しくは記事で→" },
        { type: "p", html: "ハッシュタグ案：#医療DX #ORCA #診療報酬改定" },
      ],
      sources: [
        { label: "厚労省：医療DX推進体制整備加算 通知", url: "https://www.mhlw.go.jp/content/10200000/001277499.pdf" },
      ],
    },

    "case-orca": {
      id: "case-orca",
      kind: "article",
      title: "ORCA＋電子カルテ連携 導入事例 vol.4（医療法人A様）",
      dek: "医療法人A様におけるORCA＋電子カルテ連携の導入事例。複数ベンダー混在環境での移行を、診療を止めずに実施しました。",
      channels: ["オウンドメディア"],
      track: "定常",
      score: 88,
      status: "review",
      keyVisual: "受付業務がスムーズに流れるクリニックの様子。実写ではなくイラストで匿名性を確保。",
      reviews: [
        { label: "AIライティング検知", score: 91, note: "問題なし。" },
        { label: "法務・景表法", score: 90, note: "効果は「参考値」「施設により異なる」と明記済み。" },
        { label: "レピュテーション", score: 82, note: "施設名は匿名だが、具体的な数値・画像の利用は<b>本人許諾の確認が未完了</b>。公開前に要確認。" },
        { label: "IR・専門(医療IT)", score: 89, note: "技術記述は妥当。ただし定量効果の出典が社内ヒアリングのみで、表現の裏取りを推奨。" },
      ],
      body: [
        { type: "h2", text: "課題" },
        { type: "p", html: "既存の電子カルテと会計・レセプトの連携に手作業が残り、月末の請求業務に負担が集中していました。電子カルテは他社製で、オンライン資格確認端末や周辺機器も複数ベンダーが混在していました。" },
        { type: "h2", text: "対応" },
        { type: "ul", items: [
          "既存の他社電子カルテを活かしたまま、ORCAとの連携を設定",
          "オンライン資格確認・周辺機器を含めて一体で調整",
          "移行は診療を止めない段階導入で実施",
          "導入後はサポートセンターで運用を継続支援",
        ] },
        { type: "h2", text: "結果（参考値）" },
        { type: "p", html: "月末の請求関連作業の負担が軽減し、手作業による転記の手間が減少しました。<b>※効果は施設の状況により異なります。</b>" },
        { type: "quote", html: "「使っているものを活かしながら、つなぐ」という進め方が、現場の負担を最小限にしました。" },
      ],
      sources: [
        { label: "JRCエンジニアリング 医療ITソリューション", url: "https://www.jrce.co.jp/medical/" },
        { label: "JRCエンジニアリング 医療ITソリューション（JRCE-ORCA）", url: "https://www.jrce.jp/" },
      ],
    },
  },
};
