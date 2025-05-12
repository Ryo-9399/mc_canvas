mc_canvas
=========
このプロジェクトは、福田直人氏の制作した「まさおコンストラクション」を、挙動をそのままに、
かつ全てのWebブラウザ上で動作するように改良するものです。

## 🛠️ 使用技術

- **言語**: TypeScript, JavaScript
- **ビルドツール**: Gulp
- **バンドラー**: Webpack
- **トランスパイラー**: Babel
- **テストフレームワーク**: Karma, Mocha, Chai
- **その他のツール**:
  - Prettier (コード整形)
  - JSDoc (ドキュメント生成)
  - Husky (Git hooks)

## 🚀 開発環境のセットアップ

### 必要条件
- [Node.js](https://nodejs.org/) (最新版推奨)
- npm (Node.jsとともにインストールされます)

### 📥 インストール
```bash
# リポジトリのクローン
git clone https://github.com/Ryo-9399/mc_canvas.git
cd mc_canvas

# 依存パッケージのインストール
npm install
```

## 🔨 ビルド方法

```bash
# 標準ビルド（FX版のビルド）
npm run build

# 特定のビルド
npm run build-fx     # FX版のビルド
npm run build-kani2  # 簡易ボスのビルド
npm run build-v28    # v28版のビルド

# 全てのビルド
npm run build-all
```

ビルド成果物は `Outputs` ディレクトリに出力されます。

## 🧪 テスト

自動自動正男テストは以下のコマンドで実行できます。

```bash
npm test
```

また、テスト結果の詳細確認には、

```bash
npm run inspect-test
```

## 🔄 CI/CD

このプロジェクトでは以下のCI/CD機能を実装しています。

1. **自動自動正男テスト** - masterブランチへのプッシュまたはプルリクエストで実行されます
2. **自動ビルドとリリース** - バージョンタグ（v*.*.*)が付けられた際に実行され、ビルド成果物が自動的にリリースされます

GitHub Actionsにより、これらの処理が自動化されています。
