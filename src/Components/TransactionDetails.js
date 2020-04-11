import React, { useState, useEffect } from 'react';
import checkMark from '../Images/check-mark.png';

import {
  Heading,
  Flex,
  Image,
  Text,
  Link,
  Button,
  Card
} from 'rebass';
import { cardBoxFormatting } from '../theme';

export default function TransactionDetails(props) {
  const [ shortSetAddress, updateShortSetAddress ] = useState('');
  const { setSymbol, transactionHash, setAddress } = props;
  useEffect(() => {
    if(setAddress !== '') {
      // Format Set Address
      const shortAddress = `${setAddress.slice(0, 7)}...${setAddress.slice(35, 42)}`;
      updateShortSetAddress(shortAddress);
    }
  }, [setAddress]);
  return (
    <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Card sx={cardBoxFormatting}>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Heading mb={4}>Congratulations</Heading>
          <Text mb={1}>Your {setSymbol} set was created at address:</Text>
          <Link
            target="_blank" 
            rel="noopener noreferrer"
            href={`https://kovan.etherscan.io/address/${setAddress}`}>{shortSetAddress}</
          Link>
          <Image m={4} height={'100px'} width={'100px'} src={checkMark} />
          <Link 
            target="_blank" 
            rel="noopener noreferrer"
            href={`https://kovan.etherscan.io/tx/${transactionHash}`}>View on Etherscan</Link>
        </Flex>
      </Card>
          <Link href={'https://ethsetfactory.com/'}>
            <Button>Home</Button>
          </Link>
    </Flex>
  )
}
