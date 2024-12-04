const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const {deployer} = await getNamedAccounts()
    const fundMeDeployment = await deployments.get("FundMe");
    const fundMeAddress = fundMeDeployment.address;

    console.log(`Interacting with FundMe at ${fundMeAddress}`);
    
    const contract = await ethers.getContractAt('FundMe', fundMeAddress)
    console.log("Making withdraw .....")
    const transaction = await contract.withdraw()
    await transaction.wait(1)
    console.log("Got it successfully.....")
}
main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))