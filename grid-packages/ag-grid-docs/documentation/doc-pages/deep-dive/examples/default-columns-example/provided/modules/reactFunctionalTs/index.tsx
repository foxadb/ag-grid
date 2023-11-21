import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef } from 'ag-grid-community';

// Row Data Interface
interface IRow {
  company: string;
  country: 'USA' | 'China' | 'Kazakhstan';
  date: string;
  mission: string;
  price: number;
  successful: boolean;
}

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([]);
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "mission", resizable: true },
    { field: "country" },
    { field: "successful" },
    { field: "date" },
    { field: "price" },
    { field: "company" }
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    fetch('https://downloads.jamesswinton.com/space-mission-data.json') // Fetch data from server
      .then(result => result.json()) // Convert to JSON
      .then(rowData => setRowData(rowData)) // Update state of `rowData`
  }, [])

  // Apply settings across all columns
  const defaultColDefs = useMemo<ColDef>(() => {
    return {
      resizable: true
    };
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/} style={{ width: '100%', height: '100%' }}>
      {/* The AG Grid component, with Row Data & Column Definition props */}
      <AgGridReact 
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDefs}
      />
    </div>
  );
}

// Render GridExample
const root = createRoot(document.getElementById("root")!);
root.render(<GridExample />);