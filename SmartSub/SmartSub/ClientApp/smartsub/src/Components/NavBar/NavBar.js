import './NavBar.css';

let x = "peanutbutter";


function NavBar(){
    return(
        <div style={{background: "red"}}>
            <h1 className={"title"}>This is {x}</h1>
        </div>
    )
}

export default NavBar;
