import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';


function App() {
  return (
    <main>
        <Switch>
            <Route path='/' component={HomePage} />
            <Route path='/UserPage' component={UserPage} />
            <Route component={Error} />
        </Switch>
    </main>
  );
}

export default App;
