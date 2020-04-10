import React from 'react';
import PieChart from './PieChart';
import styled from 'styled-components';

import {
  Heading,
  Flex,
  Card
} from 'rebass';
import { cardBoxFormatting } from '../theme';

export default function ConfirmDetails(props) {
  const {
    setDetails,
    setName,
    setSymbol
  } = props;

  return (
    <div>
      <Heading>Confirm Details</Heading>
      <Flex justifyContent={'center'}>
      <Card sx={cardBoxFormatting}>

        <Heading>Name: {setName}</Heading>
        <Heading>Symbol: {setSymbol}</Heading>

        {/* Pie Chart */}
        <svg width='200' height='200'>
          <PieChart data={setDetails} x={100} y={100} />
        </svg>

        <Flex flexDirection={'column'} justifyContent={'flex-start'}>
          {setDetails.map((token, index) => {
            return(
              <Flex key={`id-${index}`} mt={1} alignItems={'flex-start'}>
                <Box token={token} />
                <div>{token.amount}% {token.symbol}</div>
              </Flex>
            )
          })}
        </Flex>
      </Card>
      </Flex>
    </div>
  )
}

const Box = styled.div`
background-color: ${props => props.token.color};
height: 20px;
width: 20px;
margin-right: 5px;
`