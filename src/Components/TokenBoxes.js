import React from 'react';

// Components
import TokenBox from './TokenBox';

import {
  Button,
  Heading,
  Flex,
} from 'rebass';

export default function TokenBoxes(props) {
  const {
    removeToken,
    addToken,
    setDetails,
    tokenCheck,
    nextStep,
    tokens
  } = props;
  return (
    <div>
      <Heading>Select Tokens</Heading>
      <Flex m={4} sx={{ flexWrap: 'wrap',justifyContent:'center'}}>
        {tokens.map((token, index) => 
        <TokenBox 
        key={`id-${index}`} 
        removeToken={removeToken} 
        addToken={addToken} 
        index={index} 
        token={token}
        setDetails={setDetails}
        />)}
      </Flex>
      <Button onClick={() => tokenCheck(nextStep)}>Next</Button>
    </div>
  )
}
