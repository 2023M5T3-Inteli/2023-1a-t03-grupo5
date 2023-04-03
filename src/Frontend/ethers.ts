const { ethers } = require("ethers");
import Contract from "../Blockchain/build/contracts/DellFactory.json";

export const transferNFT = async (wallet: string, contractAddress: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(
    Contract.networks[5].address,
    Contract.abi,
    provider
  );
  await contractInstance.mintAchievement("", signer, 20);

  return { wallet, contractAddress };
};
