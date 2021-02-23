import './NavBar.css';
import React from 'react';

import Button from '@material-ui/core/Button';

let x = "SmartSub";


function NavBar(){

            return(
        <div style={{background: "darkslateblue"}}>
            <Button style={{color: "white"}}> SmartSub </Button>
            <Button style={{color: "white"}}> Login </Button>
            <Button style={{color: "white"}}> Sign Up </Button>

        </div>

    )
}


export default NavBar;
