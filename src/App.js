import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard' 
import AddPokemon from './components/pokemon/AddPokemon' 
import SwrveSDK from "@swrve/web-sdk";

SwrveSDK.createInstance({
    appId: 32029,
    apiKey: "web_sdk-fKV6fRbRJTxJUhpxzsy",
    externalUserId: "LexiePCWeb",
    stack: "us",
    autoPushSubscribe: true
})

SwrveSDK.namedEvent({
  name:"custom.event_test", 
  payload : {
     key1: "value1",
     key2: "value2",
  }
});

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/AddPokemon" component={AddPokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
