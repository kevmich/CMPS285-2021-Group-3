
import React from 'react';
import boom from "./video/boom.mp4";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginLeft: 200,
        marginRight: 200,
        backgroundColor: "#000000"
    },
    bullet: {
        display: 'inline-flex',
    },
    title: {
        fontSize: 32,
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: '8px',
        color: 'white',
        fontWeight: "bolder",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function HomePage() {
const classes = useStyles();
const bull = <span className={classes.bullet}>•</span>;

    return(
        <div>

            <video
                autoPlay
                loop
                muted
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: "1"
                }}
            >
                <source src={boom} type="video/mp4"/>
            </video>

            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title}>
                        Smart Sub
                    </Typography>
                    <Typography variant="h6" component="h6" style={{color:'white'}}>
                        About Us`
                    </Typography>
                    <Typography className={classes.pos} style={{color:'white'}}>
                        <i>Smart Subscription Tracker</i>
                    </Typography>
                    <Typography variant="body1" component="p" style={{color:'white'}}>
                        SmartSub is a website designed to help people manage their subscriptions. The average number of
                        services people are subscribed to is becoming far too cumbersome for any one person to reasonably manage.
                        SmartSub allows for a very simple user interface that creates and easy, streamlined experience for any user
                        to add a subscription to their personalized list, manage the price of each sub, and view a calender showing
                        their upcoming charges for the next month. If you are a new user, please click the sign up button to begin simplifying the management of your subscriptions!
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" style={{color:'white', background:'linear-gradient(45deg, #8e00be 30%, #3100cd 90%)',}}>
                        Learn More
                    </Button>
                </CardActions>
            </Card>

        </div>
    )
}