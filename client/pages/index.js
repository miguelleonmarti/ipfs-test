import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [address, setAddress] = useState(null);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") setElement(window);
  }, []);

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  }

  if (!element?.ethereum) {
    return <div>Please install an ethereum wallet</div>;
  }

  return <div>{address ? <div>{address}</div> : <button onClick={connectWallet}>Connect</button>}</div>;
}
