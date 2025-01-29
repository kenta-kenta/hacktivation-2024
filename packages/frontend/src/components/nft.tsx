import { useNFTContract } from "../hooks/nft";
import { useEffect, useState } from "react";

export const NFTManager = () => {
  const [mounted, setMounted] = useState(false);
  const {
    address,
    balance,
    isBalanceLoading,
    isBalanceError,
    onMintNFT,
    isMinting,
    isMintError,
  } = useNFTContract();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          NFT Manager
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            NFT Balance
          </h2>
          {isBalanceLoading ? (
            <p className="text-gray-600">Loading NFT balance...</p>
          ) : isBalanceError ? (
            <p className="text-red-500">Error fetching balance.</p>
          ) : (
            <p className="text-gray-800 font-medium">
              Your NFT balance: {balance}
            </p>
          )}
        </div>

        {/* Mint NFT */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Mint a new NFT
          </h2>
          <div className="flex justify-center">
            <button
              onClick={async () => {
                onMintNFT();
              }}
              disabled={isMinting || !onMintNFT}
              className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                isMinting || !onMintNFT
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </button>
          </div>
          {isMintError && (
            <p className="mt-4 text-red-500 text-sm text-center">
              Error minting NFT.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
