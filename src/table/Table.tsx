import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SavedRows from './SavedRows';
import CreatingForm from './CreatingForm';
import { useState } from 'react';

export default function BasicTable() {

    const [creatingFormVisible, setCreatingFormVisible] = useState<boolean>(false)

    function formVisible(bool:boolean) {
        setCreatingFormVisible(bool)
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Уровень</TableCell>
                        <TableCell>Наименование работ</TableCell>
                        <TableCell>Основная з/п</TableCell>
                        <TableCell>Оборудование</TableCell>
                        <TableCell>Накладные расходы</TableCell>
                        <TableCell>Сметная прибыль</TableCell>
                    </TableRow>
                </TableHead>
                <SavedRows formVisible={formVisible} />
                {(creatingFormVisible) && <CreatingForm />}
            </Table>
        </TableContainer>
    );
}