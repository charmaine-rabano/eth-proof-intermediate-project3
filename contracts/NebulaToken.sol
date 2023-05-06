// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/*
    For this project, you will write a smart contract to create your own token on a local HardHat network. 
    Once you have your contract, create a front-end that can interact with your smart contract. 
    It should be able to display the balance of the connected wallet address. 
    From the front-end, the contract owner should be able to mint tokens to a user provided address. 
    Any user should be able to burn and transfer tokens.

    Rubric
    -   A new token is created on Ethereum
    -   Tokens are minted to your wallet
    -   Includes a front-end

    In summary: create own token, get balance, mint to address (if owner), burn, transfer, and create frontend
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NebulaToken is ERC20 {

    address public owner;

    // Create the Nebula token
    constructor() ERC20("Nebula", "NBL") {
        owner = msg.sender;
    }

    // Get balance of an account
    function getBalance(address account) public view returns(uint) {
        return balanceOf(account) / 10**decimals();
    }
    
    modifier isOwner {
		require (owner == msg.sender, "Only the owner can mint.");
		_;
	}

    // Mint new tokens to an address
    function mintToken(address to, uint amount) public isOwner {
        uint actualAmount = amount * 10**decimals();
        _mint(to, actualAmount);
        increaseAllowance(to, actualAmount);
    }

    // Transfer tokens
    function transferToken(address from, address to, uint amount) public {
        uint actualAmount = amount * 10**decimals();
        transferFrom(from, to, actualAmount);
        increaseAllowance(to, actualAmount);
    }

    // Burn tokens
    function burnToken(address account, uint amount) public {
        _burn(account, amount * 10**decimals());
    }

    function getTotalSupply() public view returns(uint) {
        return totalSupply() / 10**decimals();
    }

    fallback() external {}

}