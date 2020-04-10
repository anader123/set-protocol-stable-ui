import React from 'react'
import SliderBar from './SliderBar';

import {
  Button,
  Heading,
  Flex
} from 'rebass'

export default function TokenSelect(props) {
    const {
      sliderSum,
      removeToken, 
      sumSliderValues, 
      updateSliderValues, 
      sliderValues, 
      setDetails,
      updateSetDetails,
      percentCheck,
      nextStep,
      prevStep
    } = props;
    
  return (
    <div>
      <Heading>Choose Percents</Heading>
      <Heading>Total: {sliderSum}%</Heading>
      <Flex sx={{ margin: 3, justifyContent:'center', flexWrap: 'wrap'}}> 
          {setDetails.map((token, index) => 
            <SliderBar
            key={`id-${index}`} 
            sliderSum={sliderSum} 
            removeToken={removeToken} 
            sumSliderValues={sumSliderValues} 
            updateSliderValues={updateSliderValues} 
            sliderValues={sliderValues} 
            index={index} 
            token={token}
            setDetails={setDetails}
            updateSetDetails={updateSetDetails}
            />
          )}
      </Flex>
      <Flex sx={{justifyContent:'center', minWidth:'300px'}}>
        <Button onClick={prevStep}>Previous</Button>
        <Button onClick={() => percentCheck(nextStep)}>Next</Button>
      </Flex>
    </div>
  )
}
