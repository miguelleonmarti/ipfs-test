import { Contract } from "ethers";
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

export const getContract = (chainId, signer) => {
  if (!chainId) throw new Error("Invalid chain id");
  if (!signer) throw new Error("Invalid signer");
  return new Contract(contractAddress[chainId], Storage.abi, signer);
};

const contractAddress = {
  1337: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
};
