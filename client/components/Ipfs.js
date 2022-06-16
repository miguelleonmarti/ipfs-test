import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const add = async (file) => {
  if (!file) throw new Error("Invalid file");
  try {
    const { cid } = await ipfs.add(file);
    return cid.toString();
  } catch (error) {
    throw error;
  }
};
