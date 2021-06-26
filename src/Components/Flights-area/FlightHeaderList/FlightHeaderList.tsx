import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import React from "react";
import { flightTableStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";
import { FlightModel } from "../../Models/FlightModel";
import { Order } from "../../Models/GlobalTypes";

interface HeadCell {
    id: keyof FlightModel;
    label: string;
}

const HEADER_CELLS: HeadCell[] = [
    { id: "fromLocation", label: "From Location" },
    { id: "toLocation", label: "To Location" },
    { id: "duration", label: "Duration" },
    { id: "price", label: "Price" },
    { id: "date", label: "Date" },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof flightTableStyle>;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof FlightModel
    ) => void;
    order: Order;
    orderBy: string;
}

function FlightHeaderList({ classes, order, orderBy, onRequestSort }: EnhancedTableProps): JSX.Element {
    const createSortHandler = (property: keyof FlightModel) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {HEADER_CELLS.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding="default"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    key='TicketAmount'
                    align="center"
                    padding="default"
                >
                    Ticket Amount
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default FlightHeaderList;
