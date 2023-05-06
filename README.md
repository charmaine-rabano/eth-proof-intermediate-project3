# Create My Own ERC20 Token (ETH Proof Intermediate Project 3)

This program is a Solidity smart contract that creates a new ERC20 token (called Nebula) and is integrated to a React frontend.

This program was created as a project for the [Metacrafters ETH Proof Intermediate course](https://academy.metacrafters.io/content/solidity-intermediate).

## Description

The application allows the owner to mint Nebula tokens, and allows any user to connect their Metamask wallet and then transfer and burn Nebula tokens, as well as see the account balance and token's total supply.

The Solidity smart contract is a derived contract from OpenZeppelin's ERC20 that has 5 additional functions: `getBalance()`, `mintToken()`, `transferToken()`, `burnToken()`, and `getTotalSupply()`.

The React frontend connects to this contract and calls its functions to display the token info and to allow user to interact with their tokens.

## Getting Started

### Executing program

To run the smart contract alone, you can use [Remix](https://remix.ethereum.org/), an online Solidity IDE.

To run entire application, run the following in the project directory:

1. `npm install`
    - Installs dependencies
2. `npx hardhat node`
    - Creates a local Ethereum node on your computer
3. `npx hardhat run --network localhost scripts/deploy.js`
    - Deploys the contract on the local node using the deploy.js script
4. `npm start` (in the "frontend" directory)
    - Runs the frontend

## Video Walkthrough

Here's a video of me explaining my solution: [Video walkthrough](https://drive.google.com/file/d/1S2xn0BKqxdct2s9FQMVNoGONYGVFSVs2/view?usp=sharing)

## Author

Charmaine Eunice Rabano
