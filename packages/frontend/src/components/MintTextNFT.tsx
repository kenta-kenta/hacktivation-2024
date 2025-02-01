import { useState } from "react";
import { useNFTContract } from "../hooks/nft";

// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

export const MintTextNFT = () => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState<string>("");

  const { mintTextNFT, currentTokenId } = useNFTContract();

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    setMintError(null);

    try {
      await mintTextNFT(text, tags);
      setText("");
    } catch (error) {
      setMintError(
        error instanceof Error ? error.message : "ミントに失敗しました"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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
          <label className="block text-sm text-gray-500 mt-1">タグ</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              disabled={isProcessing}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={isProcessing}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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
