import React from 'react';
import { connect } from 'react-redux';

// Components
import WalletConnect from './WalletConnect';
import StableSet from './StableSetDashboard';

function Home(props) {
  const { walletConnected } = props;
  return (
    <div>
      {!walletConnected
      ?
      <WalletConnect />
      :
      <StableSet />
      }
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);