import { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8">{children}</main>
      <Footer />
    </div>
  );
};
