import { TableCell, Skeleton, TableRow } from '@mui/material';
import React from 'react';

export function TableSkeleton({ noOfColumn }: { noOfColumn: number }) {
    const getCols = () => {
        const cols = [];
        for (let i = 0; i < noOfColumn; i++) {
            cols.push(<TableCell>
                <Skeleton />
            </TableCell>);
        }
        return cols;
    };
    return (
        <>
            <TableRow>
                {getCols()}
            </TableRow>
            <TableRow>
                {getCols()}
            </TableRow>
            <TableRow>
                {getCols()}
            </TableRow>
            <TableRow>
                {getCols()}
            </TableRow>
        </>
    );
}
