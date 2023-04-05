import { ethers } from "ethers";
import Contract from "../../../../../Blockchain/build/contracts/DellFactory.json";
import nft from "../../../../nft/lakitu.png";
import { useState } from "react";
import axios from "axios";
// const dotenv = require("dotenv").config();

const Mint = () => {
  const sendFileToIPFS = async (file: any) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "bf67cf4376213d9d9cb0", // `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key:
              "5250eddb652c2e750bdf57d8ed79ee762564fed74c4ebfd78bb35dd4dbbe5a17", // `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;

        return fileHash;
      } catch (err) {
        console.log("Error sending file to IPFS: ", err);
      }
    }
  };

  const [metamask, setMetamask] = useState("");

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setMetamask(res[0]);
        const mumbaiNetwork = "0x13881";
        if (window.ethereum.chainId !== mumbaiNetwork) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: mumbaiNetwork }],
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Install MetaMask");
    }
  };

  const transferNFT = async (image: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // const contractAddress = "0xe31906e9bd75F5D6662c5B0E7a5cd5ABF2F5bd07";
    // const contractAddress = "0x0B7cC8444Ba8Ceb1aC41E3d6832B4Eaf4D1A6684";
    const contractAddress = "0xD4cd70Ef63F0470917d07b6f297C6c8a73612B75";
    // window.ethereum.request({ method: 'eth_requestAccounts' })

    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    //console.log(metamask);

    const contractInstance = new ethers.Contract(
      contractAddress,
      Contract.abi,
      signer
    );

    const image_hash = await sendFileToIPFS(image);
    console.log(image_hash);

    await contractInstance.mintAchievement(image_hash);

    // console.log(
    //   await sendFileToIPFS(nft)
    //     .then((res) => res)
    //     .catch((err) => err)
    // );
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log(image);

    transferNFT(image);
  };

  const [image, setImage] = useState();

  return (
    <div>
      <button onClick={(e: any) => connectToMetamask()}>
        Connect to Metamask
      </button>
      {/* <button onClick={(e: any) => transferNFT()}> Mint NFT </button> */}
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Mint;
