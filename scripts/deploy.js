// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  const NebulaToken = await hre.ethers.getContractFactory("NebulaToken");
  const nebulaToken = await NebulaToken.deploy();
  await nebulaToken.deployed();

  saveFrontendFiles(nebulaToken);
}

function saveFrontendFiles(contract) {
  const contractsDir = path.join(__dirname, "/../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ address: contract.address }, null, 2)
  );

  const ContractArtifact = artifacts.readArtifactSync("NebulaToken");

  fs.writeFileSync(
    contractsDir + "/contract-artifact.json",
    JSON.stringify(ContractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
