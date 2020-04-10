import React, { Component } from 'react';
import { Button } from 'rebass';

// Components
import TokenSlider from './TokenSliders';
import TokenBoxs from './TokenBoxes';
import SetDetailsForm from './SetDetailsForm';
import ConfirmDetails from './ConfirmDetails';
import LoadingPage from './LoadingPage';
import TransactionDetails from './TransactionDetails';

// Redux 
import { connect } from 'react-redux';

// Ethereum 
import { stableTokenData } from '../Ethereum/TokenData';
import { createStableSet, getSetAddress } from '../Ethereum/SetFunctions';
import { txHash } from '../Ethereum/SetFunctions';

class StableSet extends Component {
  constructor() {
    super();

    this.state = {
      step: 1,
      setDetails: [],
      sliderValues: [],
      sliderSum: 0,
      setName: '',
      setSymbol: '',
      setAddress: '',
      transactionHash: '',
      txConfirmed: false
    }
  }

  addToken = async (token) => {
    const { setDetails, sliderValues } = this.state;
    if(setDetails.findIndex(i => i.name === token.name) === -1) {
      const newSetDetails = [...setDetails];
      token.amount = 0;
      newSetDetails.push(token);

      const newSliderValues = [...sliderValues];
      newSliderValues.push(0)
      await this.setState({ setDetails: newSetDetails, sliderValues: newSliderValues });
    }
  }

  removeToken = async index => {
    const { setDetails, sliderValues } = this.state;

    const setDetailsCopy = [...setDetails];
    setDetailsCopy.splice(index, 1);

    const sliderValuesCopy = [...sliderValues];
    sliderValuesCopy.splice(index, 1);

    await this.setState({ 
      setDetails: setDetailsCopy, 
      sliderValues: sliderValuesCopy 
    });
    this.sumSliderValues();
  }

  updateSliderValues = sliderValues => this.setState({ sliderValues });

  sumSliderValues = () => {
    const sliderSum = this.state.sliderValues.reduce((a, b) => a + b, 0);
    this.setState({ sliderSum });
  }

  updateSetDetails = setDetails => this.setState({ setDetails });

  nextStep = () => { 
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  prevStep = () => { 
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  handleInputChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  percentCheck = (fx) => {
    const { sliderSum } = this.state;
    if(sliderSum === 100) {
      fx();
    }
    else {
      window.alert('Please make sure that you have allocated 100% of your tokens to the set.')
    }
  }

  tokenCheck = (fx) => {
    const { setDetails } = this.state;
    if(setDetails.length >= 1) {
      fx();
    }
    else {
      window.alert('Please select tokens you would like in your set.')
    }
  }

  pushToLoading = async () => {
  const { userAddress } = this.props;
    const { 
      setName, 
      setSymbol, 
      setDetails,
    } = this.state;

    const transactionHash = await createStableSet(
      setDetails, 
      userAddress, 
      setName, 
      setSymbol,
      this.nextStep,
      this.confirmTransaction
    );
    this.setState({ transactionHash });
  }

  updateTransactionDetails = async () => {
    const setAddress = await getSetAddress();
    this.setState({ setAddress, transactionHash: txHash })
  }

  confirmTransaction = () => {
    this.setState({ txConfirmed: true });
  }

  render() {
    const { 
      step, 
      setName, 
      setSymbol, 
      sliderSum, 
      setDetails, 
      sliderValues,
      transactionHash,
      setAddress,
      txConfirmed
    } = this.state;

    switch(step) {
      case 1: 
      return (
        <TokenBoxs  
          setDetails={setDetails}
          removeToken={this.removeToken}
          addToken={this.addToken}
          tokenCheck={this.tokenCheck}
          nextStep={this.nextStep}
          tokens={stableTokenData}
        />
      )
      case 2:
        return (
          <TokenSlider
            sliderValues={sliderValues}
            sliderSum={sliderSum} 
            setDetails={setDetails}
            removeToken={this.removeToken} 
            sumSliderValues={this.sumSliderValues} 
            percentCheck={this.percentCheck}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            updateSetDetails={this.updateSetDetails}
            updateSliderValues={this.updateSliderValues}
          />
        )
      case 3:
        return (
          <SetDetailsForm
            setName={setName}
            setSymbol={setSymbol}
            handleInputChange={this.handleInputChange}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
          />
        )
      case 4:
        return (
          <div>
          <ConfirmDetails 
            setDetails={setDetails}
            setName={setName}
            setSymbol={setSymbol}
          />
          <Button onClick={this.prevStep}>Previous</Button>
          <Button onClick={this.pushToLoading}>Create Set</Button>
          </div>
        )
      case 5:
        return (
          <LoadingPage 
          nextStep={this.nextStep} 
          txConfirmed={txConfirmed} 
          updateTransactionDetails={this.updateTransactionDetails} 
          />
        )
      case 6:
        return (
          <TransactionDetails 
            setAddress={setAddress} 
            setSymbol={setSymbol} 
            transactionHash={transactionHash} 
          />
        )
      default:
        return step;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(StableSet);