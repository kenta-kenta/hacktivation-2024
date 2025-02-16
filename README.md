# Memorial

## 概要

このプロジェクトは、ブロックチェーンのハッカソンに参加したときに作成した Dapps である．交換日記をテーマにして日記を送ることができるようにした

## 特徴

- 日記の送信機能：相手のアドレスを入力すれば NFT 化した日記を送れるようにした

## 使用技術

- 言語: JavaScript / TypeScript, Solidity
- フロントエンド: React, Next.js, Tailwind CSS
- バックエンド/スマートコントラクト: Hardhat, ethers.js
- その他: Git

## 開発環境

- OS: [WindowsOS，WSL2]
- エディタ: [VS Code, etc.]

## セットアップ

### frontend

1. ディレクトリに移動:
   ```bash
   cd packages/frontend
   ```
2. 依存関係をインストール:
   ```bash
   npm install
   ```
3. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

### backend/contract

1. ディレクトリに移動:

   ```bash
   cd package/contract
   ```

2. 依存関係をインストール

   ```bash
   npm install
   ```

3. ノード通信を開始

   ```bash
   npm run node
   ```

4. デプロイ

   ```bash
   npm run deploy -- --network localhost
   ```

5. フロントエンドとの接続
   - /packages/contract/artifacts/contracts/NFT.sol にある MyNFT.json の abi をコピーして，/packages/frontend/src/ABI/MyNFT.json にペースト
   - hooks/nft.ts にデプロイ先のアドレスを貼り付ける

## 学んだこと・振り返り

- 技術的チャレンジ: はじめて Dapps 開発を行った．コントラクトとフロントエンドの接続が難しかった
- 工夫した点: 日記を NFT として保存して相手に送信できるようにした．
