import React from 'react';

import {
  Button,
  Heading,
  Box,
  Flex
} from 'rebass'

import {
  Label,
  Input
} from '@rebass/forms'

export default function SetDetailsForm(props) {
  const { 
    handleInputChange, 
    prevStep, 
    nextStep, 
    setName, 
    setSymbol 
  } = props;
  
  return (
    <div>
      <Heading>Enter Set Details</Heading>
      <Flex justifyContent={'center'}>
        <Box as='form' mt={4} width={'400px'} onSubmit={e => {
          e.preventDefault();
          nextStep();
          }}>
          
          <Box m={4}>
            <Label>Token Name</Label>
            <Input 
              type='text' 
              value={setName} 
              onChange={handleInputChange('setName')} 
              required
            />
          </Box>
          <Box m={4}>
            <Label>Token Symbol</Label>
            <Input 
              type='text' 
              value={setSymbol} 
              onChange={handleInputChange('setSymbol')} 
              required
            />
          </Box>

          <Flex sx={{justifyContent:'center', minWidth:'300px', mt: 3, padding: [3,0,0,3]}}>
          <Button onClick={prevStep}>Previous</Button>
          <Button type='submit'>Next</Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}
