import { coreContract } from './ContractData';
import { SetProtocolUtils } from 'set-protocol-utils';
import Web3 from 'web3';

let web3;
let coreContractInstance;
let txReceipt = {};
export let txHash = '';

// Creates Core contract instance
export const initializeWeb3 = () => {
  try {
    const provider =  window.web3.currentProvider;
    web3 = new Web3(provider);
    coreContractInstance = new web3.eth.Contract(coreContract.coreAbi, coreContract.coreAddress);
  }
  catch (err) {
    throw new Error(`No inject web3: ${err}`);
  }
}

// Function that creates transaction to make a new set
export const createStableSet = (
  setDetails, 
  userAddress, 
  setName, 
  setSymbol, 
  nextStep,
  confirmTransaction
  ) => {
  const componentAddresses = [];
  const componentAmounts = [];
  const factoryAddress = '0x952F78C33D3fb884C00b22e69B9119cd70582F80';
  const naturalUnit = 10; // naturalUnit since decimals and total value are always known
  const name = SetProtocolUtils.stringToBytes(setName);
  const symbol = SetProtocolUtils.stringToBytes(setSymbol);

  // Separating information from the front end into correct arrays
  setDetails.forEach(token => {
    componentAddresses.push(token.address);
    componentAmounts.push((token.amount/10));
  })
  
  // Transaction Details
  const txOpts = {
    from: userAddress,
    gas: 4000000,
    gasPrice: 8000000000
  };

  // Creates transaciton
  coreContractInstance.methods.createSet(
    factoryAddress,
    componentAddresses,
    componentAmounts,
    naturalUnit,
    name,
    symbol,
    '0x0'
  ).send(txOpts)
  .once('transactionHash', (transactionHash) => {
    nextStep();
    txHash = transactionHash;
  })
  .once('receipt', (receipt) => {
    txReceipt = receipt;
    confirmTransaction();
  });
}

// Grabs address info from receipt data
export const getSetAddress = () => {
  return txReceipt.events.SetTokenCreated.returnValues._setTokenAddress;
}