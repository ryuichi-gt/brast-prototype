# BRAST — Brand Strategy OS（Phase 1 プロトタイプ）

> 「AIが週次でメディア戦略を作り切ってプレゼンしてくる、超優秀な部下」というUXのプロダクト。
> 人間は上司として **レビュー → 承認 or 差し戻し** をするだけ。

このリポジトリは **Phase 1 = フロントエンドのプロトタイプ**です。すべてダミーJSON駆動で、
バックエンドにはまだ接続していません。確定仕様は [`CLAUDE.md`](./CLAUDE.md)、UIの正は
[`reference/brast-mockup.html`](./reference/brast-mockup.html)（レビュー済み）。

## 技術スタック

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS**
- デザイントークンは `src/app/globals.css` に集約（mockup の配色・タイポを踏襲）
- データはダミー（`src/data/`）。取得は `src/lib/api.ts` の **fetch 層に分離**（Phase 2 で差し替え）

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（型チェック + lint 込み）
```

Vercel にそのままプレビューデプロイ可能。

## ディレクトリ構成

```
src/
├── app/
│   ├── globals.css        # デザイントークン + コンポーネントスタイル（mockupを正に移植）
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Icon.tsx
│   ├── shell/             # AppShell / LeftRail / TopBar / Toast
│   ├── briefing/          # 週次ブリーフィング（Deck / PipeRail / slides / BriefingView）
│   └── views/             # 戦略アーカイブ / トレンド / ナレッジ / コンテンツ / チャネル / エージェント
├── data/                  # ダミーJSON（型付き）。テナント別 bundle
│   ├── config.ts          # SCORE_THRESHOLD（しきい値・要確認）
│   ├── types.ts
│   ├── product.ts         # NAV / AGENTS / トレースバック・ロジック
│   └── tenants/           # jrc / sympafit / bcp / libero
├── lib/
│   └── api.ts             # ★ fetch 層（Phase 2 でバックエンド接続に差し替え）
└── state/
    └── store.tsx          # React state（localStorage は不使用）
```

## 実装済み（Phase 1 範囲）

- **共通シェル**: 左ナビ（テナント切替 + 7項目）+ 上部バー + トースト。
- **週次ブリーフィング（中核画面）**:
  - 紙のデッキ7スライド（サマリー / ナレッジ状態 / トレンド / 競合 / 戦略 / メディアプラン / 配信スケジュール）
    を **縦に全部並べて一画面スクロール**（横カルーセルは廃止＝デッキは「読む」消費面）。
  - 右レール: 思考プロセス（エージェント9工程のパイプライン）+ **AIチャット（操作面）**。
    PC では長いデッキをスクロールしてもチャットが追従するよう右レールを sticky 化。
  - **操作は全てチャット経由**（"AI部下"への指示）。**差し戻し → トレースバック → 下流再実行**:
    チャットに自然文で指示する／各スライドの「直す」を押すと、原因のエージェント工程をハイライトし、
    そこから下流（スコアゲートまで）だけを再実行（承認済みの成果物は残す）。チャット内の「ここから再実行」で実行。
  - **承認は固定フッター**（amber ボタン）。常時追従し、PC/スマホで同一UI構成。
- **残りの画面**: 戦略アーカイブ / トレンド・レーダー / ブランドナレッジ / コンテンツ（旧版vs新版の並列提示）/
  チャネル（自動連携 vs 手動の区別・役割可視化）/ エージェント（閲覧のみ・編集不可）。
- **テナント切替**: SympaFit / JRC医療IT / ツズリーBCP / Libero。テナントごとにダミーデータを切り替え。
- **レスポンシブ**: PC / タブレット / スマホ対応。狭幅では思考プロセスとAIチャットがデッキの下にスタック。承認フッターは常時表示。
- **アクセシビリティ**: キーボードフォーカス可視、`prefers-reduced-motion` 尊重、`localStorage` 不使用。
- **色の意味付け**: teal = AIの自律/ライブ、amber = 人間の判断が必要、を全画面で厳守。

## 確定済みの仕様メモ

- **スコアしきい値**: **90 / 100** で確定（2026-06-21 岡本さん。議事録の発言準拠）。
  実装は `src/data/config.ts` の `SCORE_THRESHOLD` に集約（変更は一箇所）。`CLAUDE.md` §4 も同値に更新済み。

## Phase 2（DIGITRAN）へ引き継ぐべき項目

UI が固まった段階（~60%）で以下をバックエンド側に引き継ぐ。fetch 層を分離済みのため差し替えは局所的。

- **バックエンド接続 / 実データ**: `src/lib/api.ts` の各関数を実APIに差し替え
  （現状はダミーを同期返却。`return (await fetch(...)).json()` へ）。FastAPI + MySQL + Celery + Redis。
- **Agent SDK オーケストレーション**: 思考プロセス（9工程）の実体。トレースバック＝下流工程の実再実行。
  マルチAI 品質ループ（Claude / GPT-4o / Gemini）とスコアゲート。
- **SNS OAuth フロー**: 各チャネルの自動連携認証。
- **配信**: 自動連携（API）と手動投稿（指示のみ）の実行。スケジューラ。
- **トレンド調査の定期実行**: 毎週月 06:00 の自動収集と関連度スコアリング。
- **状態の永続化**: 承認・差し戻し・採用バージョン等の保存（顧客の「癖」の蓄積＝コンテキストロック）。
- **テナント / チャネル**: `tenant > channel` 構造の実データ化、`{tenant}.mediaops.internnect.ai` ドメイン。
- **Slack 日次レポート連携**。

---

開発フロー: Claude Code (web) → GitHub Mobile で PR レビュー → Vercel プレビュー。
1画面ずつ act & report で進行。
