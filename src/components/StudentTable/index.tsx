import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/system';

import { Student } from '../../model/Student';

const TableTitle = styled(TableCell)({
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
});

const StyledTableRow = styled(TableRow)(({ color }) => ({
    backgroundColor: color || '#fff',
    '&:nth-of-type(odd)': {
        backgroundColor: color || '#f5f5f5',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    cursor: 'pointer',
}));

type Props = {
    listStudent: Student[];
    onSelect: (student: Student) => void;
    idStudentSelected: number | undefined;
};

function StudentTable({ listStudent, onSelect, idStudentSelected }: Props) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableTitle>ID</TableTitle>
                    <TableTitle>Name</TableTitle>
                    <TableTitle>Age</TableTitle>
                    <TableTitle>Gender</TableTitle>
                </TableRow>
            </TableHead>
            <TableBody>
                {listStudent.map((student) => (
                    <StyledTableRow
                        key={student.id}
                        color={
                            idStudentSelected === student.id
                                ? 'orange'
                                : undefined
                        }
                        onClick={() => onSelect(student)}
                    >
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>
                            {student.gender === 'male' ? 'Male' : 'Female'}
                        </TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}
export default StudentTable;
