import { coreContract } from './ContractData';
import { SetProtocolUtils } from 'set-protocol-utils';
import Web3 from 'web3';

const injectedWeb3 = window.web3 || undefined;
let provider;

try {
  provider = injectedWeb3.currentProvider;
}
catch (err) {
  throw new Error(`No inject web3: ${err}`)
}

const web3 = new Web3(provider);
const coreContractInstance = new web3.eth.Contract(coreContract.coreAbi, coreContract.coreAddress);

let txReceipt = {};
export let txHash = '';

export const createStableSet = async (
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
  const naturalUnit = 10;
  const name = SetProtocolUtils.stringToBytes(setName);
  const symbol = SetProtocolUtils.stringToBytes(setSymbol);

  setDetails.forEach(token => {
    componentAddresses.push(token.address);
    componentAmounts.push((token.amount/10));
  })
  
  const txOpts = {
    from: userAddress,
    gas: 4000000,
    gasPrice: 8000000000
  };

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

export const getSetAddress = () => {
  return txReceipt.events.SetTokenCreated.returnValues._setTokenAddress;
}