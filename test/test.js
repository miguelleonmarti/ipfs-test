const chai = require("chai");
chai.use(require("chai-as-promised"));
const { expect } = chai;

const { ethers } = require("hardhat");

describe("Storage contract", function () {
  let storageContract;
  let accountA, accountB, accounts;
  const mockId = "EXAMPLE_IDENTIFIER";

  before(async function () {
    const Storage = await ethers.getContractFactory("Storage");
    storageContract = await Storage.deploy();
    [accountA, accountB, ...accounts] = await ethers.getSigners();
    await storageContract.deployed();
  });

  describe("Deployment", function () {
    it("Should set files uploaded counter to 0", async function () {
      await expect(storageContract.filesUploaded()).to.eventually.equal(0);
    });

    it("Should not exist any files", async function () {
      await expect(storageContract.userFile(accountA.address)).to.eventually.be.empty;
      await expect(storageContract.userFile(accountB.address)).to.eventually.be.empty;
    });
  });

  describe("Uploading files", function () {
    it("Should fail due to invalid id", async function () {
      await expect(storageContract.uploadFile("")).to.be.revertedWith("Invalid id");
    });

    it("Should upload a file", async function () {
      await expect(storageContract.uploadFile(mockId)).to.emit(storageContract, "FileUploaded").withArgs(accountA.address, mockId);
    });

    it("Should have saved the file and incremented the counter", async function () {
      await expect(storageContract.filesUploaded()).to.eventually.equal(1);
      await expect(storageContract.userFile(accountA.address)).to.eventually.be.equal(mockId);
    });
  });
});
