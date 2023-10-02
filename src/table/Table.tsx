import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateRowMutation, useDeleteRowMutation, useListRowsQuery, useUpdateRowMutation } from '../store/apiSlice';
import { SetStateAction, useState } from 'react';
import { Row } from '../enums';
import { IRow } from '../interface';
import SavedRows from './SavedRows';

export default function BasicTable() {

    const [createRow, {isLoading}] = useCreateRowMutation()

    const [rowName, setRowName] = useState<string>('')
    const [salary, setSalary] = useState<number>(0)
    const [equipmentCosts, setEquipmentCosts] = useState<number>(0)
    const [mainCosts, setMainCosts] = useState<number>(0)
    const [estimatedProfit, setEstimatedProfit] = useState<number>(0)

    function changeTitle(value:string) {
        setRowName(value)
    }

    function changeSalary(value:string) {
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setSalary(num)
        } else if(value === '') {
            setSalary(0)
        }   
    }

    function changeDevices(value:string){
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEquipmentCosts(num)
        } else if(value === '') {
            setEquipmentCosts(0)
        }  
    }

    function changeExpense(value:string){
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setMainCosts(num)
        } else if(value === '') {
            setMainCosts(0)
        }    
    }

    function changeProfit(value:string) {
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEstimatedProfit(num)
        } else if(value === '') {
            setEstimatedProfit(0)
        }
    }

    function handleEnterKeyCreate(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            createRow({
                id:0,
                equipmentCosts,
                estimatedProfit,
                machineOperatorSalary: 0,
                mainCosts,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                parentId: null,
                rowName,
                salary,
                supportCosts: 0
            })
        }
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
                <TableBody>
                    <SavedRows />
                    <TableRow>
                        <TableCell>
                            <DescriptionIcon htmlColor="#7986cb" 
                            />
                            <DeleteIcon htmlColor="#d32f2f" />
                        </TableCell>
                        <TableCell width={550}>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                fullWidth
                                value={rowName}
                                onChange={(e) => changeTitle(e.target.value)}
                                onKeyDown={handleEnterKeyCreate} 
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                type="tel"
                                value={salary}
                                onChange={(e) => changeSalary(e.target.value)}
                                onKeyDown={handleEnterKeyCreate}
                                // inputProps={{ onClick: (e) => e.currentTarget.select() }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                type="tel"
                                value={equipmentCosts}
                                onChange={(e) => changeDevices(e.target.value)}
                                onKeyDown={handleEnterKeyCreate}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                type="tel"
                                value={mainCosts}
                                onChange={(e) => changeExpense(e.target.value)}
                                onKeyDown={handleEnterKeyCreate}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                type="tel"
                                value={estimatedProfit}
                                onChange={(e) => changeProfit(e.target.value)}
                                onKeyDown={handleEnterKeyCreate}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}