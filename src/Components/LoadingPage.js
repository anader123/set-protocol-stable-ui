// import React, {useEffect} from 'react';
import ReactLoading from 'react-loading';

// Ethereum
// import { txConfirmed } from '../Ethereum/SetFunctions';

import {
  Heading,
  Flex,
  Text
} from 'rebass';

import React, { Component } from 'react'

export default class LoadingPage extends Component {
  componentDidUpdate(prevProps) {
    if(this.props.txConfirmed !== prevProps.txConfirmed) {
      this.props.updateTransactionDetails()
      .then(setTimeout(() => {
        this.props.nextStep();
      }, 8000));
    }
  } 
  render() {
    return (
      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Heading mt={'20px'}>Ethereum Magic in Progress</Heading>
        <Text m={'5px'}>Your transaction is being added to the blockchain.</Text>
        <ReactLoading type={'cubes'} color={'#583aff'} width={225} />
      </Flex>
    )
  }
}