import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Togolist from './pages/Togolist';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/login" component={LogIn}></Route>
          <Route exact path="/app/togolist" component={Togolist}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
