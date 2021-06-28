import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useMemo } from "react";
import "./OrderFlightHeaders.css";

function OrderFlightHeaders(): JSX.Element {

    const HEADER_CELLS = useMemo(() =>
        [
            { label: "From Location" },
            { label: "To Location" },
            { label: "Duration" },
            { label: "At Date" },
            { label: "Tickets" },
            { label: "Total Price" },
        ], []);

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {HEADER_CELLS.map(header => (
                    <TableCell
                        key={header.label}
                        align="left"
                        padding="default"
                    >
                        {header.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default OrderFlightHeaders;
