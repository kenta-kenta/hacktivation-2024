import { useState } from "react";
import { useNFTContract } from "../hooks/nft";

export const MintTextNFT = () => {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  const { mintTextNFT, currentTokenId } = useNFTContract();

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    setMintError(null);

    try {
      await mintTextNFT(text);
      setText("");
    } catch (error) {
      setMintError(
        error instanceof Error ? error.message : "ミントに失敗しました"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">日記を書く</h2>

      <form onSubmit={handleMint} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">内容</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            disabled={isProcessing}
          />
        </div>

        {mintError && <p className="text-red-500 text-sm">{mintError}</p>}

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-2 px-4 rounded ${
            isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-medium`}
        >
          {isProcessing ? "ミント中..." : "NFTをミント"}
        </button>

        {currentTokenId && (
          <p className="text-green-600 text-sm">
            TokenID: {currentTokenId} でミントされました
          </p>
        )}
      </form>
    </div>
  );
};
