// Action Types
const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
const TOGGLE_WALLET_CONNECTED = 'TOGGLE_WALLET_CONNECTED';
// const UPDATE_SET_DETAILS = 'UPDATE_SET_DETAILS';
// const UPDATE_SLIDER_VALUES = 'UPDATE_SLIDER_VALUES';

export const setUserAddress = (address) => {
  return {
    type: SET_USER_ADDRESS, 
    payload: address
  }
}

export const toggleWalletConnected = (bool) => {
  return {
    type: TOGGLE_WALLET_CONNECTED, 
    payload: bool
  }
}

// export const updateSetDetails = (setDetails) => {
//   return {
//     type: UPDATE_SET_DETAILS, 
//     payload: setDetails
//   }
// }

// export const updateSliderValues = (sliderValues) => {
//   return {
//     type: UPDATE_SLIDER_VALUES, 
//     payload: sliderValues
//   }
// }
