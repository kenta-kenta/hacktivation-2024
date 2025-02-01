import { useEffect, useState } from "react";
import Head from "next/head";
import { useAccount, useConnect } from "wagmi";
import Welcome from "../components/Welcome";

const Home = () => {
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 初期レンダリング時は何も表示しない
  }

  return (
    <div>
      <Head>
        <title>Memoria</title>
        <meta name="description" content="Your memories as NFTs" />
      </Head>
      <main>
        <Welcome />
      </main>
    </div>
  );
};

export default Home;
