import NavBar from "../../Components/NavBar/NavBar";
import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

const createData = (name, renewDate, price, paymentFrequency) => ({
    id: name.replace(" ", "_"),
    name,
    renewDate,
    price,
    paymentFrequency,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

export default function App() {
    const [rows, setRows] = React.useState([
        createData("NA", 0, 0, 0),
        createData("NA", 0, 0, 0),
        createData("NA", 0, 0, 0)
    ]);
    const [previous, setPrevious] = React.useState({});
    const classes = useStyles();

    const onToggleEditMode = id => {
        setRows(state => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table">
                <caption style={{textAlign: "center", textTransform: "Uppercase", color: "black",}}>Use the data table to manage all of your subscriptions!</caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" />
                        <TableCell style={{textAlign: "left", textTransform: "Uppercase", color: "black",}}>Subscription Provider</TableCell>
                        <TableCell style={{textAlign: "left", textTransform: "Uppercase", color: "black",}}>Renew Date</TableCell>
                        <TableCell style={{textAlign: "left", textTransform: "Uppercase", color: "black",}}>Price</TableCell>
                        <TableCell style={{textAlign: "left", textTransform: "Uppercase", color: "black",}}>Payment Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                    <>
                                        <IconButton
                                            aria-label="done"
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="revert"
                                            onClick={() => onRevert(row.id)}
                                        >
                                            <RevertIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => onToggleEditMode(row.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                            <CustomTableCell {...{ row, name: "name", onChange }} />
                            <CustomTableCell {...{ row, name: "renewDate", onChange }} />
                            <CustomTableCell {...{ row, name: "price", onChange }} />
                            <CustomTableCell {...{ row, name: "paymentFrequency", onChange }} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);





