import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ethIcon from '../Images/eth-icon.svg'

// Redux
import { connect } from 'react-redux';
import {
  setUserAddress,
  toggleWalletConnected
} from '../Redux/actions';

// Ethereum
import { initializeWeb3 } from '../Ethereum/SetFunctions';

import {
  Flex,
  Text,
  Box,
  Image,
  Link
} from 'rebass';

function Header(props) {
  const { 
    userAddress, 
    walletConnected, 
    toggleWalletConnected, 
    setUserAddress 
  } = props;

  const [ shortUserAddress, setShortUserAddress ] = useState('');
  // Checks if the user has their wallet enabled 
  useEffect(() => {
    if(window.ethereum !== undefined) {
      if(window.ethereum.selectedAddress !== null 
        && window.ethereum.selectedAddress !== undefined) {
        const address = window.ethereum.selectedAddress;
        setUserAddress(window.ethereum.selectedAddress);
        toggleWalletConnected(true);
        initializeWeb3();
        // Format Display Address
        const shortAddress = `${address.slice(0, 7)}...${address.slice(37, 42)}`;
        setShortUserAddress(shortAddress);
      }
    }
  }, [setUserAddress, toggleWalletConnected, userAddress]);

  return (
    <Flex
      px={2}
      alignItems='center'>
        <Image 
          ml={[1, 4]}
          src={ethIcon}
          height='40px'
        />
        <Bar />
        <Text p={4} pl={0} fontSize={[ 2, 4 ]}>
        Set Factory
        </Text>
      <Box mx='auto' />
      <div>
      {!walletConnected 
      ?
      <Text mr={[1, 4]}>No Wallet Connected</Text>
      :
      <Link 
        target="_blank" 
        rel="noopener noreferrer"
        href={`https://kovan.etherscan.io/address/${userAddress}`}
      >
        <Text mr={[1, 4]}>Address: {shortUserAddress}</Text>
      </Link>
      }
      </div>
    </Flex>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  setUserAddress, 
  toggleWalletConnected
})(Header);

const Bar = styled.div`
	margin: 0px 12px;
	border-left: 1px solid black;
  height: 42px;
`;
