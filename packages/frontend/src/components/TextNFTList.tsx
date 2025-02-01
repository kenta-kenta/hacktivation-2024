import { useEffect } from "react";
import { useNFTContract } from "../hooks/nft";

export const TextNFTList = () => {
  const { getOwnedTextNFTs, isLoading, error, textNFTs } = useNFTContract();

  useEffect(() => {
    getOwnedTextNFTs();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">テキストNFT一覧</h2>
        <button
          onClick={() => getOwnedTextNFTs()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          更新
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {textNFTs?.map((nft, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{nft.title}</h3>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                {nft.text}
              </p>
              <p className="text-sm text-gray-500">
                作成日:{" "}
                {new Date(Number(nft.timestamp) * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
