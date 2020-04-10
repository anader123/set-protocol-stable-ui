import React, { useState } from 'react';

import {
	Image,
	Box,
	Heading,
	Text,
  Card,
  Flex
} from 'rebass';

import { Slider } from '@rebass/forms';

export default function SliderBar(props) {
	const { 
		token, 
    index, 
    sliderValues,
		sumSliderValues, 
    removeToken,
    setDetails,
    updateSetDetails,
    updateSliderValues,
  } = props;
  
  const [value, setValue] = useState(token.amount);

  const handleChange = async event => {
		const sliderValuesCopy = [...sliderValues];
    sliderValuesCopy[index] = +event.target.value;
    
    const valuesSum = sliderValuesCopy.reduce((a, b) => a + b, 0);
    
		if(valuesSum <= 100 ){
      const setDetailsCopy = [...setDetails];
      const amount = +event.target.value;
      setDetailsCopy[index].amount = amount;
      updateSetDetails(setDetailsCopy);

			setValue(amount);
			await updateSliderValues(sliderValuesCopy);
			sumSliderValues();
    }
	}
  return (
	<Box 
	width={256}
	>
		<Card sx={{
			m: [15,0,0,15],
      p: '10px',
      borderRadius: 2,
      boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      height: '240px'
    }}>
    <Flex width={180} sx={{cursor: 'pointer', fontWeight: 'bold'}} justifyContent={'flex-end'}>
      <div onClick={() => removeToken(index)}>X</div>
    </Flex>
        <Box
        sx={{
          height: '200px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        >
          <Image width={70} height={70} src={token.image}></Image>
          <Heading>{token.symbol}</Heading>
            <Slider
              type='range'
              min={0}
              max={100}
              step={10}
              value={value}
              onChange={handleChange}
              required
              sx={{
                'WebkitAppearance': 'none',
                'appearance': 'none',
                'height': '8px',
                'background': '#b9b9b9',
                'outline': 'none',
                'opacity': '0.7',
                'WebkitTransition': '.2s',
                'transition': 'opacity .2s',
                'borderRadius': '2px'
              }}
            />
          <Text>{value}%</Text>
        </Box>
		</Card>
    </Box>
  )
}