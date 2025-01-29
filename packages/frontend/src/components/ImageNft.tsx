import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { BrowserProvider } from "ethers";
import nftAbi from "../ABI/MyNFT.json";

// InfuraのAPIキーのみを使用
const apiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

if (!apiKey) {
  throw new Error("Infura API Keyが設定されていません");
}

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Bearer ${apiKey}`,
  },
});

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("ファイルサイズが大きすぎます（上限: 10MB）");
    }

    console.log("アップロード開始...");
    const added = await ipfs.add(file, {
      progress: (prog) => console.log(`アップロード進捗: ${prog}`),
    });
    console.log("ファイルアップロード完了:", added.path);

    const imageURI = `ipfs://${added.path}`;
    const metadata: NFTMetadata = {
      name: "My NFT",
      description: "My NFT Description",
      image: imageURI,
    };

    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    console.log("メタデータアップロード完了:", metadataAdded.path);

    return `ipfs://${metadataAdded.path}`;
  } catch (error) {
    console.error("IPFSアップロードエラー:", error);
    throw new Error("IPFSへのアップロードに失敗しました");
  }
};

const mintNFT = async (
  file: File,
  contractAddress: string,
  signer: ethers.Signer
) => {
  const tokenURI = await uploadToIPFS(file);
  const contract = new ethers.Contract(contractAddress, nftAbi, signer);
  const tx = await contract.mint(await signer.getAddress(), tokenURI);
  await tx.wait();
  console.log("Minted NFT with tokenURI:", tokenURI);
};

const connectWallet = async () => {
  try {
    if (window.ethereum) {
      // 新しい構文でプロバイダーを作成
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return signer;
    } else {
      throw new Error("Metamaskがインストールされていません");
    }
  } catch (error) {
    console.error("ウォレット接続エラー:", error);
    throw error;
  }
};

const ImageNft = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleMint = async () => {
    if (!file) return;

    const signer = await connectWallet();
    const contractAddress = "0xYourContractAddress"; // 正しいコントラクトアドレスを設定

    try {
      await mintNFT(file, contractAddress, signer);
      console.log("Minting NFT...");
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <button onClick={handleMint} disabled={!file}>
        Mint NFT
      </button>
    </div>
  );
};

export default ImageNft;
