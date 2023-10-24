'use strict';

import React, {useCallback, useMemo, useRef, useState, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import {ModuleRegistry} from '@ag-grid-community/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const GridExample = () => {
    const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [gridApi, setGridApi] = useState();
    const [col1SizeInfoOnGridReady, setCol1SizeInfoOnGridReady] = useState('-');
    const [col1SizeInfOnFirstDataRendered, setCol1SizeInfOnFirstDataRendered] = useState('-');
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athleteDescription',
            valueGetter: (params) => {
                const {data} = params;
                const {person} = data;
                return `The ${person.age} years old ${data.name} from ${person.country}`;
            },
        },
        {field: 'medals.gold', headerName: 'Gold Medals'},
        {field: 'person.age', headerName: 'Age'},
    ]);

    const defaultColDef = useMemo(() => {
        return {
            minWidth: 150,
        }
    }, []);

    const autoSizeStrategy = useMemo(() => ({
        type: 'fitCellContents',
        colIds: ['athleteDescription']
    }), []);

    const onGridReady = useCallback((params) => {
        const {api} = params;
        setGridApi(api);

        const column = api.getColumn('athleteDescription');
        if (column) {
            setCol1SizeInfoOnGridReady(`${column.getActualWidth()}px`);
        }

        console.log('AG Grid: onGridReady event triggered');

    }, []);

    const onFirstDataRendered = useCallback((params) => {
        const {api} = params;
        api.setColumnWidth('athleteDescription', 300);

        const column = api.getColumn('athleteDescription');
        if (column) {
            setCol1SizeInfOnFirstDataRendered(`${column.getActualWidth()}px`);
        }

        console.log('AG Grid: onFirstDataRendered event triggered');
    }, []);

    const loadGridData = useCallback(() => {
        gridApi.setRowData(getData());
    }, [gridApi])

    return (
        <div style={containerStyle}>
              <div className="test-container">
                <div className="test-header">
                    <div style={{"display": "flex", "flexDirection": "column", "marginBottom": "1rem"}}>
                        <div><span style={{"fontWeight": "bold"}}>Athlete Description</span> column width:</div>
                        <div style={{ paddingLeft: "1em" }}>- On gridReady event: <span style={{"fontWeight": "bold"}}>{col1SizeInfoOnGridReady}</span></div>
                        <div style={{ paddingLeft: "1em" }}>- On firstDataRendered event: <span style={{"fontWeight": "bold"}}>{col1SizeInfOnFirstDataRendered}</span></div>
                    </div>
                    <button id="loadGridDataButton" onClick={loadGridData} style={{"marginBottom": "1rem"}}>Load Grid Data</button>
                </div>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        suppressLoadingOverlay={true}
                        autoSizeStrategy={autoSizeStrategy}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                    />
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<StrictMode><GridExample/></StrictMode>);
