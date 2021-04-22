import NavBar from "../../Components/NavBar/NavBar";
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const columns = [
    {
        id: 'sub',
        label: 'Subscription',
        minWidth: 100 },
    {
        id: 'price',
        label: 'Price',
        align: 'center',
        minWidth: 100 },
    {
        id: 'freq',
        label: 'Payment Frequency',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'reDate',
        label: 'Renew Date',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'note',
        label: 'Note',
        minWidth: 100,
        align: 'right',
    }
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 470,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [tableInfo, setTableInfo] = useState({
        col: [{
            id: "Id",
            provider: "Provider",
            price: "Price",
            paymentFrequency: "PaymentFrequency",
            renewDate: "RenewDate",
            note: "Note",
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
