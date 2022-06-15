import { useState } from "react";
import { add } from "./Ipfs";
import { uploadFile } from "./Contract";

const Uploader = ({ chainId, signer }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    try {
      // upload file
      const id = await add(file);
      // store file id on the smart contract
      await uploadFile(id, chainId, signer);
    } catch (error) {
      alert("Error while uploading the file");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Uploader;
