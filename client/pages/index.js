import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Uploader from "../components/Uploader";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") setElement(window);
  }, []);

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chainId = await signer.getChainId();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
      setChainId(chainId);
      console.log("HOLAAA");
    } catch (error) {
      console.log(error);
    }
  }

  if (!element?.ethereum) {
    return <div>Please install an ethereum wallet</div>;
  }

  return (
    <div>
      {signer ? (
        <div>
          <div>{address}</div>
          <Uploader chainId={chainId} signer={signer} />
        </div>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </div>
  );
}
