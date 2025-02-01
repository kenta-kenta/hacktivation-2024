import { useEffect, useState } from "react";
import { useNFTContract } from "../hooks/nft";
import TransferNFT from "../pages/transfer";

export const TextNFTList = () => {
  const { getOwnedTextNFTs, isLoading, error, textNFTs } = useNFTContract();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    getOwnedTextNFTs();
  }, []);

  const filteredNFTs = selectedTag
    ? [...textNFTs].reverse().filter((nft) => nft.tags?.includes(selectedTag))
    : [...textNFTs].reverse();

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">いままでの日記</h2>
        {selectedTag && (
          <div className="text-sm text-gray-600">
            タグ「{selectedTag}」で絞り込み中
            <button
              onClick={() => setSelectedTag(null)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              解除
            </button>
          </div>
        )}
        <button
          onClick={() => getOwnedTextNFTs()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          更新
        </button>
      </div>
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {filteredNFTs.map((nft, index) => (
            <>
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <p className="text-gray-800 mb-4 whitespace-pre-wrap">
                  {nft.text}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {nft.tags?.map((tag, tagIndex) => (
                    <button
                      key={tagIndex}
                      onClick={() => handleTagClick(tag)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        selectedTag === tag
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(Number(nft.timestamp) * 1000).toLocaleDateString(
                    "ja-JP"
                  )}
                </p>
              </div>
              <TransferNFT tokenId={nft.tokenId} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};
