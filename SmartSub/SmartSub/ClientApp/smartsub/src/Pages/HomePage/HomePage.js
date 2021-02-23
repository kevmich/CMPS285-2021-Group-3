import NavBar from "../../Components/NavBar/NavBar";

function HomePage(){
    return(
        <div>
               <p style={{fontSize: "29px"}}> Smartsub is a website designed to help people manage their subscriptions. The average number of
                services people are subscribed to is becoming far too cumbersome for any one person to reasonably manage.
                Smartsub allows for a very simple user interface that creates and easy, streamlined experience for any user
                to add a subscription to their personalized list, manage the price of each sub, and view a calender showing
                their upcoming charges for the next month. If you are a new user, please click the
                <a style={{color: "blue"}}> sign up </a>
                button to begin simplifying the management of your subscriptions!</p>
        </div>
    )
}

export default HomePage;
