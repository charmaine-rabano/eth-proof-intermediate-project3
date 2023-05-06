import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAddress from "./contracts/contract-address.json"
import contractArtifact from "./contracts/contract-artifact.json";

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);

  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenSupply, setTokenSupply] = useState();
  const [tokenOwner, setTokenOwner] = useState();
  const [accountBalance, setAccountBalance] = useState();

  const [mintAddressInput, setMintAddressInput] = useState();
  const [mintAmountInput, setMintAmountInput] = useState();
  const [transferAddressInput, setTransferAddressInput] = useState();
  const [transferAmountInput, setTransferAmountInput] = useState();
  const [burnAmountInput, setBurnAmountInput] = useState();

  async function getWallet() {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  }
  
  async function connectAccount() {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(acc[0]);
    
    getContract();
  }

  function getContract() {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const appContract = new ethers.Contract(contractAddress.address, contractArtifact.abi, signer);
 
    setContract(appContract);
  }

  async function getTokenInfo() {
    if (contract) {
      setTokenName(await contract.name());
      setTokenSymbol(await contract.symbol());
      setTokenSupply((await contract.getTotalSupply()).toNumber());
      setTokenOwner((await contract.owner()).toLowerCase());
    }
    getBalance();
  }

  async function getBalance() {
    if (contract) {
      setAccountBalance((await contract.getBalance(account)).toNumber());
    }
  }

  async function handleMint() {
    if (contract) {
      let tx = await contract.mintToken(mintAddressInput, mintAmountInput);
      await tx.wait();
    }
    setMintAddressInput("");
    setMintAmountInput("");
  }

  async function handleTransfer() {
    if (contract) {
      let tx = await contract.transferToken(account, transferAddressInput, transferAmountInput);
      await tx.wait();
    }
    setTransferAddressInput("");
    setTransferAmountInput("");
  }

  async function handleBurn() {
    if (contract) {
      let tx = await contract.burnToken(account, burnAmountInput);
      await tx.wait();
    }
    setBurnAmountInput("");
  }

  function displayUI() {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Connect your Metamask wallet</button>
    }

    getTokenInfo();

    return (
      <div>
        <h3>Token Info</h3>
        <p>Name: {tokenName} | Symbol: {tokenSymbol} | Total supply: {tokenSupply} {tokenSymbol}</p>

        <div style={{margin:"50px 0"}}>
          <p>
            Your Metamask wallet: {account} {' '}
            {account === tokenOwner ? <span style={{backgroundColor: "yellow"}}>TOKEN OWNER</span> : ''}
          </p>
          <p>Your balance: {accountBalance === undefined ? 0 : accountBalance} {tokenSymbol}</p>
        </div>

        {account === tokenOwner ? 
          <>
            <h3>Mint {tokenName} tokens</h3>
            <input 
              type="text" 
              placeholder="Enter address" 
              value={mintAddressInput} 
              onChange={e => setMintAddressInput(e.target.value)}
              ></input>
            <input 
              type="number" 
              placeholder="Enter amount to mint" 
              value={mintAmountInput} 
              onChange={e => setMintAmountInput(e.target.value)}
              ></input>
            <button onClick={handleMint}>Mint</button>
          </>
        : ''}

        <h3>Transfer {tokenName} tokens</h3>
        <input 
          type="text" 
          placeholder="Enter address" 
          value={transferAddressInput} 
          onChange={e => setTransferAddressInput(e.target.value)}
          ></input>
        <input 
          type="number" 
          placeholder="Enter amount to transfer" 
          value={transferAmountInput} 
          onChange={e => setTransferAmountInput(e.target.value)}
          ></input>
        <button onClick={handleTransfer}>Transfer</button>

        <h3>Burn {tokenName} tokens</h3>
        <input 
          type="number" 
          placeholder="Enter amount to burn" 
          value={burnAmountInput} 
          onChange={e => setBurnAmountInput(e.target.value)}
          ></input>
        <button onClick={handleBurn}>Burn</button>
        
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Mint, transfer and burn tokens!</h1>
      {displayUI()}
    </div>
  );
}

export default App;
