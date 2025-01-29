import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { BrowserProvider, ethers } from "ethers";
import nftAbi from "../ABI/MyNFT.json";

// ローカルIPFSノードの設定
const ipfs = create({
  host: "localhost",
  port: 5001,
  protocol: "http",
});

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    // ファイルサイズのチェック
    if (file.size > 10 * 1024 * 1024) {
      // 10MB制限
      throw new Error("File size too large");
    }

    const added = await ipfs.add(file);
    const imageURI = `ipfs://${added.path}`;

    const metadata: NFTMetadata = {
      name: "My NFT",
      description: "My NFT Description",
      image: imageURI,
    };

    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    return `ipfs://${metadataAdded.path}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
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
