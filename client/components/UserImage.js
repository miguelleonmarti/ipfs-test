import { useContext } from "react";
import { Web3Context } from "../hooks/Web3Context";
import Image from "next/image";

const UserImage = () => {
  const { file } = useContext(Web3Context);
  return <div>{file ? <Image src={`https://ipfs.infura.io/ipfs/${file}`} width={200} height={200} /> : <div>No image</div>}</div>;
};

export default UserImage;
