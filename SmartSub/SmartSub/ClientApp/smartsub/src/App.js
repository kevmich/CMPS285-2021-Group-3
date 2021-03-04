import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import LoginPage from './Pages/LoginSignupPage/LoginPage';
import SignupPage from './Pages/LoginSignupPage/SignupPage';



function App() {
  return (
      <BrowserRouter>
          <NavBar/>
          <Switch>
              <Route exact path='/'> <HomePage/> </Route>
              <Route exact path='/UserPage/'> <UserPage/> </Route>
              <Route exact path='/LoginPage/'> <LoginPage/> </Route>
              <Route exact path='/SignupPage/'> <SignupPage/> </Route>

          </Switch>
      </BrowserRouter>

  );
}

export default App;
