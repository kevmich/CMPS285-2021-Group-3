import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";

import LogoutButton from "./Components/NavBar/LogoutButton";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import LoginPage from './Pages/LoginSignupPage/LoginPage';
import SignupPage from './Pages/LoginSignupPage/SignupPage';
import CreateSubPage from './Pages/LoginSignupPage/CreateSubPage';

function App() {

  return (
      <div className="App">
      <BrowserRouter>
          <NavBar/>
          <Switch>
              <Route exact path='/'> <HomePage/> </Route>
              <Route exact path='/UserPage/'> <UserPage/> </Route>
              <Route exact path='/LoginPage/'> <LoginPage/> </Route>
              <Route exact path='/SignupPage/'> <SignupPage/> </Route>
              <Route exact path='/CreateSubPage/'> <CreateSubPage/> </Route>
              <Route exact path='/UserPage/:id'> render={(props) => <UserPage {...props} />} </Route>
          </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
