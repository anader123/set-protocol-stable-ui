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
      .then(() => this.props.nextStep());
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


// export default function LoadingPage(props) {
//   const { nextStep, updateTransactionDetails, txConfirmed } = props;
//   let locked = false;

//   useEffect(() => {
//     // const interval = setTimeout(() => {
//     //   if(txConfirmed && !locked) {
//     //     updateTransactionDetails()
//     //     .then(() => nextStep());
//     //     stopFunction(interval);
//     //     console.log('hit in loading page');
//     //   }
//     // }, 3000);
//     if(txConfirmed) {
//       updateTransactionDetails()
//       .then(() => nextStep());
//     }
//   }, [txConfirmed, updateTransactionDetails, nextStep]);

//   const stopFunction = (interval) => {
//     clearInterval(interval);
//     locked = true;
//   }

//   return (
//     <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
//       <Heading mt={'20px'}>Ethereum Magic in Progress</Heading>
//       <Text m={'5px'}>Your transaction is being added to the blockchain.</Text>
//       <ReactLoading type={'cubes'} color={'#583aff'} width={225} />
//     </Flex>
//   )
// }