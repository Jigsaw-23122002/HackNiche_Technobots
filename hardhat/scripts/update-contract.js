// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const upgradeContract = await ethers.getContractFactory("Contract");
  const upgradedContract = await upgrades.upgradeProxy(
    process.env.CONTRACT_ADDRESS,
    upgradeContract
  );
  console.log("Contract upgraded on the same address");
}

main();
