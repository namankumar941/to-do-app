const { Web3 } = require("web3");
const abi = require("./TaskManagerABI.json");
require("dotenv").config();

const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

const myContract = new web3.eth.Contract( // Create a new contract object using the ABI and address
  abi,
  process.env.DEPLOYED_CONTRACT_ADDRESS
);
myContract.handleRevert = true;

//----------------------------------------------Interact class----------------------------------------------

class Interact {
  constructor(taskDetails, completionDate) {
    this.taskDetails = taskDetails;
    this.completionDate = completionDate;
  }

  //Function to interact with contract and save transaction-------
  async sendTx() {
    try {
      const taskHash = web3.utils.keccak256(this.taskDetails); //convert task details to hash to store in blockchain

      const parts = this.completionDate.split("/"); //steps to convert date to timestamp
      const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      const timestamp = Math.floor(date.getTime() / 1000);

      const tx = {
        // Create the transaction object
        from: process.env.WALLET_ADDRESS,
        to: process.env.DEPLOYED_CONTRACT_ADDRESS,
        data: myContract.methods.storeTask(taskHash, timestamp).encodeABI(),
        gas: 3000000, // Adjust gas limit as needed
        gasPrice: await web3.eth.getGasPrice(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        // Sign the transaction
        tx,
        process.env.PRIVATE_KEY
      );

      const receipt = await web3.eth.sendSignedTransaction(
        // Send the signed transaction
        signedTx.rawTransaction
      );

      console.log("Transaction successful!");
      console.log("Transaction Hash:", receipt.transactionHash);
      return true;
    } catch (err) {
      return false;
    }
  }

  //Function to interact with contract and verify transaction-------
  async verify() {
    const taskHash = web3.utils.keccak256(this.taskDetails);

    const parts = this.completionDate.split("/"); // Split into day, month, year
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Reorder as YYYY-MM-DD
    const timestamp = Math.floor(date.getTime() / 1000);

    const result = await myContract.methods
      .verifyTask(taskHash, timestamp)
      .call({ from: process.env.WALLET_ADDRESS });

    return result;
  }
}

module.exports = Interact;
