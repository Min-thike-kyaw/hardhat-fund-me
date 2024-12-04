const { getNamedAccounts, ethers, deployments } = require("hardhat")

async function main() {
    try{
        const { deployer } = await getNamedAccounts()
        const fundMeDeployment = await deployments.get("FundMe");
        const fundMeAddress = fundMeDeployment.address;
    
        console.log(`Interacting with FundMe at ${fundMeAddress}`);
        
        const contract = await ethers.getContractAt('FundMe', fundMeAddress)
    
    
        console.log("Funding .....")
        const transaction = await contract.fund({
            value: ethers.parseEther("0.04")
        })
        await transaction.wait()
        console.log("Funded successfully.....")

        const balance = await ethers.provider.getBalance(deployer);
        console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);

    } catch (e) {
        console.log(e)
    }
}
main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))