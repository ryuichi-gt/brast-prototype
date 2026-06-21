# BRAST → Claude Code 移行パッケージ

Claude Code でプロトタイピングを始めるための一式です。**この通りに進めれば OK。**

## 中身

```
brast-claude-code-handoff/
├── README.md            ← これ（人間用の手順書）
├── CLAUDE.md            ← Claude Code が毎回読む確定仕様。リポジトリ直下に置く
└── reference/
    ├── brast-mockup.html      ← UI の正（レビュー済みの画面。ブラウザで開けば動く）
    ├── meeting-transcript.md  ← 意図の原典（議事録・原文）
    └── build-brief.md         ← 貼り付け用のキックオフ／マイルストーン別プロンプト
```

## 進め方（この順番）

1. **GitHub** で空のリポジトリを1つ作成（例: `brast-prototype`）。README なしの空でよい。
2. このフォルダの中身を**フォルダ構造そのまま**リポジトリにアップロード（`CLAUDE.md` は直下、`reference/` はそのまま）。
   - GitHub のウェブ画面に**フォルダごとドラッグ&ドロップ**すれば構造を保ったまま上がります。
   - この `README.md` は上げても上げなくても可。
3. **`claude.ai/code`** を開き、GitHub 連携（初回のみ）→ このリポジトリを選択 → 環境を作成（最初はデフォルトのまま「Create environment」でOK）。
4. セッションが開いたら、**`reference/build-brief.md` の「M1」プロンプトをコピペ**して送信。
5. 完了報告が来たら **M2 → M3 → M4** を順に貼る。
6. レビューは **Vercel プレビュー URL をスマホで確認 + GitHub Mobile で PR**。

## メモ

- 確定が必要な既知項目: **スコアしきい値（mockup=95 / 議事録=90）**。決めたら `CLAUDE.md` を直す。
- UI が ~60% 固まったら、バックエンド・実データ・配信は **DIGITRAN** に引き継ぎ。
