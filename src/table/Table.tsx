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

export default function BasicTable() {

    const [createRow, {isLoading}] = useCreateRowMutation()
    const {data, isLoading: loadList} = useListRowsQuery()
    const [updateTableRow, {isLoading: updateLoad}] = useUpdateRowMutation()
    const [deleteRow] = useDeleteRowMutation()

    const [rowName, setRowName] = useState<string>('')
    const [salary, setSalary] = useState<number>(0)
    const [equipmentCosts, setEquipmentCosts] = useState<number>(0)
    const [mainCosts, setMainCosts] = useState<number>(0)
    const [estimatedProfit, setEstimatedProfit] = useState<number>(0)

    const [editingId, setEditingId] = useState<number>(0);
    const [edRowName, setEdRowName] = useState<string>('')
    const [edSalary, setEdSalary] = useState<number>(0)
    const [edEquipmentCosts, setEdEquipmentCosts] = useState<number>(0)
    const [edMainCosts, setEdMainCosts] = useState<number>(0)
    const [EdEstimatedProfit, setEdEstimatedProfit] = useState<number>(0)
    

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
 
    function handleDoubleClick(id:number) {
        setEditingId(id);
        data!.map((row:IRow) => { 
            if(id === row.id){ 
                setEdRowName(row.rowName)
                setEdSalary(row.salary)
        }})
    }

    function changeEdTitle(value:string) {
        setEdRowName(value)
    }

    function changeEdSalary(value:string) {
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEdSalary(num)
        } else if(value === '') {
            setEdSalary(0)
        }   
    }

    function changeEdDevices(value:string){
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEdEquipmentCosts(num)
        } else if(value === '') {
            setEdEquipmentCosts(0)
        }  
    }

    function changeEdExpense(value:string){
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEdMainCosts(num)
        } else if(value === '') {
            setEdMainCosts(0)
        }    
    }

    function changeEdProfit(value:string) {
        if(value.match(/^[0-9]+$/)){
            const num = Number(value)
            setEdEstimatedProfit(num)
        } else if(value === '') {
            setEdEstimatedProfit(0)
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

    function changeTableRow() {
        updateTableRow({
            id: editingId,
            equipmentCosts: edEquipmentCosts,
            estimatedProfit: EdEstimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: edMainCosts,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: null,
            rowName: edRowName,
            salary: edSalary,
            supportCosts: 0
        })
    }

    function removeRow(id:number) {
        deleteRow(id)
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
                    {(data) && data.map((row:IRow)  => 
                        <TableRow key={row.id} onDoubleClick={() => handleDoubleClick(row.id)}>
                            <TableCell>
                                <DeleteIcon onClick ={()=> removeRow(row.id)} />
                            </TableCell>
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={edRowName}
                                        onChange={(e) => changeEdTitle(e.target.value)}
                                        onKeyDown={handleEnterKeyCreate}
                                    />
                                ) : (
                                    row.rowName
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={edSalary}
                                        onChange={(e) => changeEdSalary(e.target.value)}
                                    />
                                ) : (
                                    row.salary
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={edEquipmentCosts}
                                        onChange={(e) => changeEdDevices(e.target.value)}
                                    />
                                ) : (
                                    row.equipmentCosts
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={edMainCosts}
                                        onChange={(e) => changeEdExpense(e.target.value)}
                                    />
                                ) : (
                                    row.mainCosts
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === row.id ? (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={EdEstimatedProfit}
                                        onChange={(e) => changeEdProfit(e.target.value)}
                                    />
                                ) : (
                                    row.estimatedProfit
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                        
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