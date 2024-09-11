import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import useFactors from "../useFactors";

const withAvgColour = (initCols, avgArr) => {
  return initCols.map((col) => {
    if (avgArr.hasOwnProperty(col.field)) {
      return {
        ...col,
        cellStyle: (params) => ({
          backgroundColor:
            params.value > avgArr[col.field] ? "#b7e4c7" : "#f8d7da",
        }),
      };
    }
    return col;
  });
};

export default function Factors() {
  const { factors, average } = useFactors(2020);
  const [rowData, setRowData] = useState([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [colDefs, setColDefs] = useState([
    { field: "rank" },
    { field: "country" },
    { field: "economy" },
    { field: "family" },
    { field: "freedom" },
    { field: "generosity" },
    { field: "health" },
    { field: "trust" },
    { field: "score" },
  ]);

  useEffect(() => {
    if (factors) {
      const newColDefs = withAvgColour(colDefs, average);
      setColDefs(newColDefs);

      setRowData(factors);
    }
  }, [factors]);

  return (
    <>
      <h1 className="pt-5">Hi from Factors</h1>
      <p>Quick Filter</p>
      <input
        placeholder="Search table..."
        type="text"
        onChange={(e) => setQuickFilter(e.target.value)}
      />

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ sortable: true, resizable: true, flex: 1 }}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={(20, 50, 100)}
          quickFilterText={quickFilter}
        />
      </div>
    </>
  );
}
