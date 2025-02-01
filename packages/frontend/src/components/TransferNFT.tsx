import { useState } from "react";
import { useNFTContract } from "../hooks/nft";

const TransferNFT = ({ tokenId }: { tokenId: number }) => {
  const [toAddress, setToAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { transferTextNFT } = useNFTContract();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toAddress) return;

    setIsProcessing(true);
    try {
      await transferTextNFT(toAddress, tokenId);
      setToAddress("");
    } catch (error) {
      console.error("転送エラー:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="mt-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="0x..."
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="flex-1 p-1 text-sm border rounded"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !toAddress}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          転送
        </button>
      </div>
    </form>
  );
};

// TextNFTListコンポーネント内での使用
// {
//   filteredNFTs.map((nft, index) => (
//     <div
//       key={index}
//       className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
//     >
//       ...existing code...
//       <TransferNFT tokenId={nft.tokenId} />
//     </div>
//   ));
// }

export default TransferNFT;
