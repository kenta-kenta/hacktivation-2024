import React from "react";
import {
  WalletIcon,
  PencilIcon,
  SparklesIcon,
  LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Welcome: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Memoriaへようこそ！
        </h1>
        <p className="text-gray-600">
          あなたの思い出をNFTとして永遠に残しませんか？
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">使い方</h2>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <WalletIcon className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">1. ウォレットを接続する</h3>
              <p className="text-gray-600">
                右上のボタンからウォレットを接続してください
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <PencilIcon className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">2. 日記を書く</h3>
              <p className="text-gray-600">
                今日あった出来事や感じたことを記録しましょう
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SparklesIcon className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">3. NFT化される</h3>
              <p className="text-gray-600">
                あなたの日記は自動的にNFTとして保存されます
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-center">特徴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <LockClosedIcon className="h-6 w-6 text-orange-500" />
              <span>ブロックチェーンで安全に保管</span>
            </div>
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="h-6 w-6 text-teal-500" />
              <span>コミュニティと共有可能</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
