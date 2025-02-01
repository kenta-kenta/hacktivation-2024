import { useState } from "react";
import { useNFTContract } from "../hooks/nft";

export const NFTManager = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const { mintNFT, currentTokenId, balance } = useNFTContract();

  const handleMint = async () => {
    setIsProcessing(true);
    setMintError(null);

    try {
      await mintNFT();
      console.log(`NFTがミントされました。TokenID: ${currentTokenId}`);
    } catch (error) {
      setMintError(
        error instanceof Error ? error.message : "ミントに失敗しました"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">NFTミント</h2>
      <p>現在の所持数: {balance}</p>

      <button
        onClick={handleMint}
        disabled={isProcessing}
        className={`px-4 py-2 rounded-md ${
          isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isProcessing ? "処理中..." : "NFTをミント"}
      </button>

      {mintError && <p className="text-red-500">{mintError}</p>}

      {currentTokenId && (
        <p className="text-green-600">
          TokenID: {currentTokenId} でミントされました
        </p>
      )}
    </div>
  );
};
