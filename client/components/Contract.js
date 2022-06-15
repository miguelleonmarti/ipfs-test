import * as ethers from "ethers";
import Storage from "../contracts/Storage.sol/Storage.json";

export const uploadFile = async (id, chainId, signer) => {
  if (!id) throw new Error("Invalid id");
  try {
    const contract = getContract(chainId, signer);
    await contract.uploadFile(id);
  } catch (error) {
    console.log(error);
  }
};

export const getFile = async (chainId, signer) => {
  try {
    const contract = getContract(chainId, signer);
    console.log("AAAA");
    return await contract.userFile(signer.getAddress());
  } catch (error) {
    console.log(error);
  }
};

export const getFilesCounter = async (chainId, signer) => {
  try {
    const contract = getContract(chainId, signer);
    return await contract.filesUploaded();
  } catch (error) {
    console.log(error);
  }
};

const getContract = (chainId, signer) => {
  if (!chainId) throw new Error("Invalid chain id");
  if (!signer) throw new Error("Invalid signer");
  console.log(signer);
  console.log(chainId);
  return new ethers.Contract(contractAddress[chainId], Storage.abi, signer);
};

const contractAddress = {
  1337: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
};
