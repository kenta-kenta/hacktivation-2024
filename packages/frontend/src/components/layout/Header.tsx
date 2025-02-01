import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-800 px-3 py-2 rounded-md text-m font-medium"
          >
            Memoria
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/diary"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              日記を書く
            </Link>
            <Link
              href="/diaries"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              日記一覧
            </Link>
          </div>
        </div>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Header;
