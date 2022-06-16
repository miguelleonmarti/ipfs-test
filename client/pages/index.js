import { useState, useEffect, useContext } from "react";
import { Web3Context } from "../hooks/Web3Context";
import Uploader from "../components/Uploader";
import UserImage from "../components/UserImage";

export default function Home() {
  const { signer, chainId, address, connectWallet } = useContext(Web3Context);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") setElement(window);
  }, []);

  if (!element?.ethereum) {
    return <div>Please install an ethereum wallet</div>;
  }

  return (
    <div>
      {signer ? (
        <div>
          {address}
          <Uploader chainId={chainId} signer={signer} />
          <UserImage />
        </div>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </div>
  );
}
