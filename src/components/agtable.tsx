import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-balham.css'
import { useState } from 'react';
import { DataItem, pieDataType } from './Charts';
import { User } from '@/lib/data';
type AgTableProps = {
  data:DataItem[] | pieDataType[] | User[],
  pagination?:boolean,
  pageSize?:number,
  filtering?:boolean,
  sorting?:boolean 
  theme?:"ag-theme-quartz" | "ag-theme-alpine" | "ag-theme-balham"
}

const AgTable = ({data,pagination = true,pageSize = 10,filtering,sorting,theme="ag-theme-balham"}:AgTableProps) => {
      const fields=Object.keys(data[0])
    
      const [rowData, setRowData] = useState(data);
      // Column Definitions: Defines the columns to be displayed.
      const [colDefs, setColDefs] = useState(
        fields.map((field) => {
          return {
            headerName: field.toUpperCase(),
            field: field,
          };
      }));
    return (
    <div
    className={theme} // applying the Data Grid theme
    style={{ height: 500,width:"100%" }} >
       <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       pagination={pagination}
       paginationPageSize={pageSize}
       filtering={filtering}
       sorting={sorting}
   />
    </div>
  )
}

export default AgTable
