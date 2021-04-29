import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
import EditIcon from '@material-ui/icons/Edit';
import {AppBar, Container, Toolbar} from "@material-ui/core";
import {BrowserRouter as Router, useHistory} from 'react-router-dom'


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
        },
    },
});



function Row(props) {
    
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="large" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                    {/* NOTE: THIS IS WHAT WAS MESSING UP TABLE FORMATTING */} 
                {/* <TableCell component="th" scope="row">
                    {row.name}
                </TableCell> */}
                
                <TableCell >{row.provider}</TableCell>
                <TableCell >{row.price}</TableCell>
                <TableCell >{row.paymentFrequency}</TableCell>
                <TableCell >{row.renewDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
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

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

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

    const routeChange = () =>{  
        history.push('/CreateSubPage');
  };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead style={{textTransform: "uppercase"}}>
                   
                    <IconButton onClick={routeChange}>
                        <AddIcon></AddIcon>
                    </IconButton>
                
                    <IconButton>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                    <IconButton>
                        <EditIcon></EditIcon>
                    </IconButton>
                    <TableRow>
                        <TableCell style = {{minWidth: 100}} align = {'right'}></TableCell>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}