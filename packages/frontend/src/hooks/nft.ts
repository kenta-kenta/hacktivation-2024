import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import nftAbi from "../ABI/MyNFT.json";
import { text } from "stream/consumers";

interface TextNFTMetadata {
  text: string;
  title: string;
  timestamp: number;
}

export const useNFTContract = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [currentTokenId, setCurrentTokenId] = useState<number | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [textNFTs, setTextNFTs] = useState<TextNFTMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nftAddress = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707";

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAddress(address);

          const contract = new ethers.Contract(nftAddress, nftAbi, signer);
          const balance = await contract.balanceOf(address);
          setBalance(Number(balance));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const mintTextNFT = async (text: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(nftAddress, nftAbi, signer);
      
      const tx = await contract.mintTextNFT(address, text);
      const receipt = await tx.wait();
      
      const event = receipt.logs[0];
      const tokenId = event.args[2];
      setCurrentTokenId(Number(tokenId));
    } catch (error) {
      console.error("Mint error:", error);
      throw error;
    }
  }

  const getOwnedTextNFTs = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      const contract = new ethers.Contract(nftAddress, nftAbi, signer);
      const nfts = await contract.getOwnedTextNFTs(address);
      
      setTextNFTs(nfts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      setTextNFTs([]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    address,
    balance,
    isLoading,
    error,
    mintTextNFT,
    getOwnedTextNFTs,
    textNFTs,
    currentTokenId
  };
};