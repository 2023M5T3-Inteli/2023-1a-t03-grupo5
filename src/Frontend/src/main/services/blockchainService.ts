import { ethers } from "ethers"
import Contract from "../../../../Blockchain/build/contracts/DellFactory.json"
import axios from "axios"
import { toast } from 'react-toastify'

const BlockchainService = {
  sendFileToIPFS: async (file: any) => {
    if (file) {
      try {
        const formData = new FormData()
        formData.append("file", file)

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
        })

        const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`
        return fileHash

      } catch (err) {
        return err
      }
    }
  },
  connectToMetamask: async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        const mumbaiNetwork = "0x13881"
        if (window.ethereum.chainId !== mumbaiNetwork) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: mumbaiNetwork }],
          })
        }
        return res[0]

      } catch (err) {
        console.error(err)
      }
    } else {
      toast.error("Install MetaMask")
    }
  },
  transferNFT: async (image: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const contractAddress = "0xe31906e9bd75F5D6662c5B0E7a5cd5ABF2F5bd07"
    // window.ethereum.request({ method: 'eth_requestAccounts' })

    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // })
    console.log(metamask)

    const contractInstance = new ethers.Contract(
      contractAddress,
      Contract.abi,
      signer
    )

    await contractInstance.mintAchievement(image, metamask, 1)

    // console.log(
    //   await sendFileToIPFS(nft)
    //     .then((res) => res)
    //     .catch((err) => err)
    // )

    return 200
  }
}

export default BlockchainService