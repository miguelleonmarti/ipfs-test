import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const add = async (file) => {
  console.log("add");
  if (!file) throw new Error("Invalid file");
  try {
    const { cid } = await ipfs.add(file);
    console.log(cid.toString());
    return cid.toString();
  } catch (error) {
    throw error;
  }
};
