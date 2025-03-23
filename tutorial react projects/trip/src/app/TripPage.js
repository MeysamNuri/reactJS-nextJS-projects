import React from 'react';
import './TripPage.css'

import Header from "../tripHeader/Header";
import Tabs from '../components/Tabs/Tabs'

function TripPage() {
  return (
    
      <div className="main">
        <div className="App">
        <Header />
        <Tabs />   
        </div>
      </div>
    
  );
}

export default TripPage;
