const { ethers, upgrades } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("Contract");
  const contract = await upgrades.deployProxy(Contract);
  await contract.deployed();
  console.log("Contract deployed on address : ", contract.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
