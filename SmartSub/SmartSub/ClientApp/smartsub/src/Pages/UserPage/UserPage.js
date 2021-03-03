import NavBar from "../../Components/NavBar/NavBar";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles =makeStyles({
    table: {
        minWidth: 650,
    }
});


function createData(Provider, RenewDate, Note, Price, paymentFreq){
    return { Provider, RenewDate, Note, Price, paymentFreq}
}

const rows = [
    createData("Netflix", "Jan 1st, 2021", "no commercials", '$11.99', "Monthly"),
    createData("Hulu", "Jan 1st, 2021", "commercials", '$5.99', "Monthly"),
];

export default function UserPage() {
    const classes = useStyles();

    return (
        <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Provider</TableCell>
                        <TableCell align="right">Renew Date</TableCell>
                        <TableCell align="right">Note</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.Provider}>
                            <TableCell component="th" scope="row">
                                {row.Provider}
                            </TableCell>
                            <TableCell align="right">{row.RenewDate}</TableCell>
                            <TableCell align="right">{row.Note}</TableCell>
                            <TableCell align="right">{row.Price}</TableCell>
                            <TableCell align="right">{row.paymentFreq}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </div>
    );
}




