import { providers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { getContract, getFile } from "../components/Contract";

export const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [{ provider, signer, chainId, address, contract, file }, setWeb3] = useState({});

  useEffect(() => {
    if (!chainId || !signer) return;

    async function getData() {
      const contract = getContract(chainId, signer);
      const file = await getFile(chainId, signer);
      setWeb3((prev) => ({ ...prev, contract, file }));
    }

    getData();
  }, [chainId, signer]);

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chainId = await signer.getChainId();
      const address = await signer.getAddress();

      setWeb3((prev) => ({ ...prev, provider, signer, chainId, address }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Web3Context.Provider value={{ provider, signer, chainId, address, contract, file, connectWallet }}>{children}</Web3Context.Provider>
  );
};
