import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {Container, Snackbar} from "@material-ui/core";
import {Checkbox} from '@material-ui/core';
import {BrowserRouter as Router, useHistory, useParams} from 'react-router-dom';
import moment from 'moment';
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";




const columns = [
   
    {
        id: 'sub',
        label: 'Subscription',
        minWidth: 0,
        TextAlign: 'left'
    },
    {
        id: 'price',
        label: 'Price',
        TextAlign: 'left',
        minWidth: 0 },
    {
        id: 'freq',
        label: 'Payment Frequency',
        minWidth: 0,
        TextAlign: 'left',
    },
    {
        id: 'reDate',
        label: 'Renew Date',
        minWidth: 0,
        TextAlign: 'left',
    },
];

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            color: "black",
            background: "white"
        },
    },
});
    
function Row(props) {

    const { id } = useParams()

    const [Delete, setDelete] = React.useState(false);
    const handleClickDelete = () => {
        
        setDelete(true);
    };
    const handleCloseDelete = () => {
        
        setDelete(false);
    };

//    DELETE SUBSCRIPTION AXIOS CALL
   let DeleteSubAxios = (subId) => {
    console.log(subId);
        axios.delete(`/api/subs/${subId}`).then((res) => {
            if (res.status == 200){
                console.log('Subscription Deleted')
                handleClickDelete();
                window.location.reload();
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(error.response.data)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                alert("Request made but not received please try again")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }
    
    const { row } = props;
    const [state, setState] = React.useState({checked:false});
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    // onClick={()=>DeleteSubAxios(row.id)} THIS IS THE AXIOS CALL TO DELETE
    return (


        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                <Snackbar open={Delete} autoHideDuration={4000} onClose={handleCloseDelete}>
                    
                    <Alert onClose={handleCloseDelete} severity="success" variant="filled">
                        Subscription Deleted!
                    </Alert>

                </Snackbar>

                    <Button onClick={() => DeleteSubAxios(row.id)}>
                    <DeleteIcon  
                        style={{color: "black"}}
                        checked={state.checked}
                        onChange={handleChange}
                        name="checked"
                    >
                    </DeleteIcon>
                    </Button>
                    <IconButton aria-label="expand row" size="large" style={{color: "black"}} onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                    {/* NOTE: THIS IS WHAT WAS MESSING UP TABLE FORMATTING */} 
                {/* <TableCell component="th" scope="row">
                    {row.name}
                </TableCell> */}
                {/* <TableCell >{row.id}</TableCell> */}
                <TableCell >{row.provider}</TableCell>
                <TableCell >{row.price}</TableCell>
                <TableCell >{row.paymentFrequency}</TableCell>
                <TableCell >{moment(row.renewDate).format('MMM Do YYYY')}</TableCell>
        
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: "white" }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="b1" gutterBottom component="div" style={{color: "black"}}>
                                {row.note}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    
    const [tableInfo, setTableInfo] = useState({
        col: [{
            id: "Id",
            provider: "Provider",
            price: "Price",
            paymentFrequency: "PaymentFrequency",
            renewDate: "RenewDate",
        }],
        info: [],
    });
    useEffect(() => {
        axios.get('/api/subs/GetAllSubsForCurrentUser')
            .then((response) => {
                setTableInfo((table) => {
                    const infoCall = {...table};
                    response.data.map((d)=>{
                        infoCall.info = [...infoCall.info, d];
                    })
                    return infoCall;
                })
            })
    },[])
    
    const rows = tableInfo.info;

    const history = useHistory();

    const routeChange = () => {
        history.push('/CreateSubPage');
  };

    return (
        <Container>
            <Button onClick={routeChange} variant="outlined" startIcon={<AddIcon></AddIcon>}
                    style={{borderColor: "white", marginRight: 0, color: "white", background: "black"}}
            >
                Create
            </Button>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead style={{textTransform: "uppercase", background: "black"}}>
                    <TableRow>
                        <TableCell style = {{minWidth: 100}} align = {'right'}/>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, color: "white" }}
                                checkboxSelection
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row}  />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
}