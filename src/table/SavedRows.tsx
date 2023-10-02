import { TableBody, TableCell, TableRow, TextField } from "@mui/material"
import { useDeleteRowMutation, useListRowsQuery, useUpdateRowMutation } from "../store/apiSlice"
import { IRow } from "../interface"
import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';

export default function SavedRows() {

    const {data, isLoading: loadList} = useListRowsQuery()
    const [deleteRow] = useDeleteRowMutation()
    const [updateTableRow, {isLoading: updateLoad}] = useUpdateRowMutation()

    const [editingId, setEditingId] = useState<number>(0)
    const [edRowName, setEdRowName] = useState<string>('')
    const [edSalary, setEdSalary] = useState<number>(0)
    const [edEquipmentCosts, setEdEquipmentCosts] = useState<number>(0)
    const [edMainCosts, setEdMainCosts] = useState<number>(0)
    const [EdEstimatedProfit, setEdEstimatedProfit] = useState<number>(0)

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
        <div>
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
                            onKeyDown={changeTableRow}
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
        </div>
    )
}
