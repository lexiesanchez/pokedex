import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard' 
import AddPokemon from './components/pokemon/AddPokemon' 

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
