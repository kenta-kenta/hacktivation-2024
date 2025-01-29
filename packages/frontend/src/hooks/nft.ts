import React, { useState, useEffect } from "react";
import { useAccount,useReadContract, useWriteContract } from "wagmi";
import nftAbi from "../ABI/MyNFT.json";

export const useNFTContract = () => {
    const { address } = useAccount();

    const nftAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

    // Read NFT balance with error handling
    const { data: nftBalance, isError: isBalanceError, isLoading: isBalanceLoading, error } = useReadContract({
      address: nftAddress,
      abi: nftAbi,
      functionName: "balanceOf",
      args: [address],
      onError: (error) => {
        console.error('Balance fetch error:', error);
      },
    });

    useEffect(() => {
      if (isBalanceError) {
        console.error('Balance error details:', error);
      }
    }, [isBalanceError, error]);

    const { writeContract: mintNFT, isPending: isMinting, isError: isMintError } = useWriteContract();
  
    const onMintNFT = async () => {
      try {
        mintNFT({
          address: nftAddress,
          abi: nftAbi,
          functionName: "mint",
          args: [address, "test"],
        });
        console.log("Minting NFT...");
      } catch (error) {
        console.error("Error minting NFT:", error);
      }
    };
    return {
        address,
      balance: nftBalance ?  Number(nftBalance): 0,
      isBalanceError,
      isBalanceLoading,
      balanceError: error,
      onMintNFT,
      isMinting,
      isMintError,
    };
  }