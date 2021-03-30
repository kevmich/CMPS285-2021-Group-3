import NavBar from "../../Components/NavBar/NavBar";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 26,
        textAlign: "center"
    },
    pos: {
        marginBottom: 12,
    },
});

export default function HomeCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="black" gutterBottom>
                    SmartSub
                </Typography>
                <Typography variant="h6" component="h6">
                    About Us
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Smart Subscription Tracker
                </Typography>
                <Typography variant="body1" component="p">
                    SmartSub is a website designed to help people manage their subscriptions. The average number of
                    services people are subscribed to is becoming far too cumbersome for any one person to reasonably manage.
                    SmartSub allows for a very simple user interface that creates and easy, streamlined experience for any user
                    to add a subscription to their personalized list, manage the price of each sub, and view a calender showing
                    their upcoming charges for the next month. If you are a new user, please click the sign up button to begin simplifying the management of your subscriptions!
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
