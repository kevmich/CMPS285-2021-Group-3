import NavBar from "../../Components/NavBar/NavBar";
import React, {useEffect, useState} from 'react';
import { makeStyles, Paper, TableCell, Table, TableHead, TableBody,
    TableContainer, TableRow } from '@material-ui/core';
import axios from "axios";

const useStyles =makeStyles({
    table: {
        minWidth: 650,
    }
});

const getData = [

];

/*function getUser() {
    return axios.get('/user?ID=12345')
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
        })
}
function getProvider() {
    return axios.get(Provider)
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
        })
}
function getRenewDate() {
    return axios.get(RenewDate)
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
        })
}
function getPrice() {
    return axios.get(Price)
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
        })
}
function getPaymentFrequency() {
    return axios.get(PaymentFrequency)
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function() {
        })
}

 */

function createData(Provider, RenewDate, Price, PaymentFrequency){
    return {Provider, RenewDate, Price, PaymentFrequency}
}

export default function UserPage() {
    const classes = useStyles();
    const [tableInfo, setTableInfo] = useState({
        col: [{
            provider: "Provider",
            renewDate: "Renew Date",
            price: "Price",
            paymentFrequency: "Payment Frequency"
        }],
        info: []
    });
    useEffect(() => {
        axios.get('')
            .then((response) => {
                setTableInfo((table) => {
                    const infoCall = {...table};
                    response.data.map((d)=>{
                        infoCall.data = [...infoCall.data, d];
                    })
                    return infoCall;
                })
            })
    },[])
    const rows = tableInfo.info;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Provider</TableCell>
                            <TableCell align="right">Renew Date</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Frequency</TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.map((row) => (
                        <TableBody>
                            <TableRow key={row.provider}>
                                <th component="th" scope="row">{row.provider}</th>
                                <th align="right">{row.renewDate}</th>
                                <th align="right">{row.price}</th>
                                <th align="right">{row.paymentFrequency}</th>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );
}




