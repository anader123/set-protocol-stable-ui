import React from 'react';
import './App.css';

// Components
import Home from './Components/Home';
import Header from './Components/Header';

// Rebass
import { ThemeProvider } from 'emotion-theming'
import theme from './theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
