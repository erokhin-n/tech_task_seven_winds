export interface IRow {
    id:number;
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts:number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId?: number | null;
    rowName: string;
    salary: number;
    supportCosts: number;
}

export interface ISavedRowsProps {
    formVisible: (arg0: boolean) => void;
}
