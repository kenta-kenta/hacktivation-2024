import { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">NFT Gallery</h1>
          <ConnectButton />
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 pt-20 pb-8">{children}</main>

      {/* フッター */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © 2024 NFT Gallery. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
