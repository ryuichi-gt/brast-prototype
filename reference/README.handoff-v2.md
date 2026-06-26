# BRAST → Claude Code / Long さん 移行パッケージ v2

「触れるプロトタイプ」を3本柱の最終形態へ拡張するための仕様書一式。
**この仕様書は二役を兼ねる:** Claude Code が読む実装指示であり、同時に Long さんが本番実装で読む設計書。

## 中身

```
brast-handoff-v2/
├── README.md                       ← これ（人間用）
├── CLAUDE.md                       ← Claude Codeが毎回読む確定仕様（v2・3本柱）
└── reference/
    ├── strategy-logic.md           ← ★戦略導出ロジックの仕様（Longのブロッカー解消）
    ├── ux-flow.md                  ← ★全体UXフロー＋画面仕様（新画面含む）
    ├── build-brief.md              ← 貼り付け用プロンプト（M5〜M9）
    ├── brast-mockup.html           ← 既存UIの正（※前パッケージから引き継いで入れる）
    ├── meeting-transcript.md       ← 原典1（※前パッケージから引き継いで入れる）
    └── meeting-transcript-2.md     ← 原典2（※レビュー会の文字起こしを各自で入れる）
```

> `brast-mockup.html` と `meeting-transcript.md` は前回パッケージのものをそのまま `reference/` に置いてください。`meeting-transcript-2.md` はレビュー会の文字起こし全文を貼って保存（原典としてのニュアンス保持のため要約しない）。

## 進め方（既存リポジトリの続きから）

既存の `brast-prototype` リポジトリ（M1〜M4実装済み）にこの v2 を上書き反映します。

1. `CLAUDE.md` を v2 で差し替え、`reference/` に新3ファイル（strategy-logic / ux-flow / build-brief）を追加。
2. claude.ai/code で同リポジトリのセッションを開く。
3. `reference/build-brief.md` の **M5 → M6 → M7 → M8 → M9** を順に貼る（各完了報告を待ってから次へ）。**一度に全部投げない。**
4. 各 M 完了ごとに Vercel プレビューをスマホで確認。特に **M6（推論グラフ）と M7（修正チャット＋ブランド押し返し）** の手触りを最優先で検証。

## Long さんへの渡し方

「触れるプロトタイプ（Vercel URL）」＋「この仕様書一式」をセットで。
本番実装で最初に効くのは **strategy-logic.md**（情報→戦略のロジック、Long さんが詰まっていた部分の v1）。次に **ux-flow.md**（全体像と新画面）。CLAUDE.md は全体方針のサマリ。

## 確定事項 / 未確定

- 確定: スコアしきい値 90、製品の重心＝3本柱（ガバナンス層新設）。
- 未確定（要確認）: strategy-logic.md の関連度しきい値・重み、概念境界の人間編集範囲、規範違反時のデフォルト挙動。Long さんと回しながら詰める。
