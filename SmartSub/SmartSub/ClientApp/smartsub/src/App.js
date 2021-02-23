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
          <NavBar />
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/UserPage' component={UserPage} />
              <Route component={Error} />
          </Switch>
      </BrowserRouter>

  );
}

export default App;
