import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import NavBar from "./Components/NavBar/NavBar";


function App() {
  return (
      <BrowserRouter>
          <NavBar/>
          <Switch>
              <Route exact path='/'> <HomePage/> </Route>
              <Route exact path='/UserPage/'> <UserPage/> </Route>
          </Switch>
      </BrowserRouter>

  );
}

export default App;
