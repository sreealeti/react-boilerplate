import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
       <Router>
          <div>
              <Route exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/navbar" component={ NavBar } />
          </div>
        </Router>
    );
  }
}

export default App;
