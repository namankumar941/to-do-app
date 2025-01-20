# To-do Application
**Video 1:-** The video below showcases the signup process and provides a detailed, step-by-step guide for users on how to add, edit, delete, and mark to-do tasks as complete.

[Watch the video](https://1drv.ms/v/c/995ef548607f74fd/EdogPTk3cZhMnaS6lElqPacB8F7cMHE9yS69_sgBwnBuXw)

**Video 2:-** The video demonstrates the process of verifying whether a task has been successfully completed and stored on the blockchain. Additionally, it highlights how any modifications made to the task in the server database can be detected, as they would no longer align with the blockchain data, ensuring data integrity and tamper-proof verification.

[Watch the video](https://1drv.ms/v/c/995ef548607f74fd/EZ9dJXqI4ENDtgqJ8XM31KABe1vjM_aM3udn3LRUV-sNiw)

# About This Project
In this project, I integrated blockchain with React and Node.js to enhance task verification systems.That allows users to create a to-do list with tasks prioritized by OpenAI. The tasks appear to users according to the priority set by the AI. Once a task is marked as completed, it is securely recorded on the blockchain, ensuring that it cannot be altered or tampered with. The blockchain serves as a reliable source of truth for task verification, offering transparency and immutability.

# Setup Instructions

## 1. Install Dependencies
Run `npm install` in the following directories:
- `./server`
- `./smart-contract`
- `./to-do-app`

## 2. Configure Smart Contract
Create a `.env` file in ./smart-contract with the following variables:
Run `npm install` in the following directories:
- `PRIVATE_KEY=""`
- `SEPOLIA_RPC_URL=""`

**Replace:**

- `PRIVATE_KEY with your wallet's private key`

- `SEPOLIA_RPC_URL with the Ethereum Sepolia RPC URL.`

## 3. Deploy Smart Contract
Navigate to ./smart-contract and run:
- `npx hardhat compile`
- `npx hardhat run scripts/deploy.js --network sepolia`

## 4. Configure Server

Create a `.env` file in ./server with the following variables:

- `WALLET_ADDRESS=""`
- `DEPLOYED_CONTRACT_ADDRESS=""`
- `PRIVATE_KEY=""`
- `SEPOLIA_RPC_URL=""`
- `API_KEY=""`
- 
**Replace:**

- `WALLET_ADDRESS with your wallet address.`

- `DEPLOYED_CONTRACT_ADDRESS with the address of the deployed contract.`

- `PRIVATE_KEY and SEPOLIA_RPC_URL with the same values from Step 2.`

- `API_KEY with your OpenAI API key.`

## 5. Start Server

Navigate to ./server and run:

- `npm run dev`

## 6. Start Frontend

Navigate to ./to-do-app and run:

- `npm start`

# Architecture
# 1) Blockchain Integration
In this project, I integrated blockchain with React and Node.js to enhance task verification systems. The project involves developing a smart contract using Solidity, deployed on the Ethereum Sepolia testnet, to store and verify completed task details. Using Infura as the Sepolia RPC provider, the smart contract records task hashes and their completion dates directly on the blockchain, ensuring immutable proof of completion.

The integration employs Web3.js to interact seamlessly with the smart contract, allowing the application to store task data only when the task is marked as completed. This ensures both transparency and traceability while leveraging blockchain's decentralized and tamper-proof nature. The system adds an extra layer of security and reliability, making it ideal for environments requiring high trust and accountability in task management workflows.
# 2) OpenAI Integration
I have integrated OpenAI technologies to determine task priorities efficiently. By leveraging advanced AI models, I enabled intelligent prioritization of tasks based on various parameters such as urgency, importance, and contextual data, ensuring optimized task management and streamlined workflows.



# 2) Frontend Overview
The frontend of this application is built using React, a powerful JavaScript library for building interactive user interfaces. It provides a dynamic and responsive experience for users, allowing seamless interaction with the application's features.
