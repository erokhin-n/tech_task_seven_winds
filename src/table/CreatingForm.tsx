import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DescriptionIcon from '@mui/icons-material/Description';
import TextField from "@mui/material/TextField";
import { useCreateRowMutation } from "../store/apiSlice";
import { useState } from "react";

export default function CreatingForm() {

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
            setRowName('')
            setSalary(0)
            setEquipmentCosts(0)
            setMainCosts(0)
            setEstimatedProfit(0)
        }
    }

    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    
                </TableCell>
                <TableCell width={450}>
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

    )
}