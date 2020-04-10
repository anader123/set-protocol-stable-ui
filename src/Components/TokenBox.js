import React, { useState, useEffect } from 'react';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass';
import { tokenBoxUnselected, tokenBoxSelected } from '../theme';

export default function TokenBox(props) {
  const { token, addToken, removeToken, setDetails } = props;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
		if(setDetails.findIndex(i => i.name === token.name) !== -1) {
      setSelected(true);
    }
  }, [setDetails, token.name])
  
  return (
    <Box m={3} width={240}>
      <Card
        onClick={() => {
          if(selected === false) {
            addToken(token);
            setSelected(true);
          }
          else {
            const tokenIndex = setDetails.findIndex(i => i.name === token.name)
            removeToken(tokenIndex);
            setSelected(false);
          }
        }}
        sx={!selected ?
          tokenBoxUnselected
          :
          tokenBoxSelected
          }>
          <Image alignSelf={'center'} width={60} height={60} src={token.image} />
        <Box px={2}>
          <Heading as='h5'>
              {token.symbol}
          </Heading>
          <Text fontSize={0}>
              {token.name}
          </Text>
        </Box>
      </Card>
    </Box>
  )
}