const initialState = {
  walletConnected: false,
  userAddress: '',
  setDetails: [],
  sliderValues: []
}

// Action Types
const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
const TOGGLE_WALLET_CONNECTED = 'TOGGLE_WALLET_CONNECTED';
// const UPDATE_SET_DETAILS = 'UPDATE_SET_DETAILS';
// const UPDATE_SLIDER_VALUES = 'UPDATE_SLIDER_VALUES';

// Reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER_ADDRESS:
      return {...state, userAddress: action.payload};
    case TOGGLE_WALLET_CONNECTED:
      return {...state, walletConnected: action.payload};
    // case UPDATE_SET_DETAILS:
    //   return {...state, setDetails: action.payload};
    // case UPDATE_SLIDER_VALUES:
    //   return {...state, sliderValues: action.payload};
    default:
      return state;
  }
}