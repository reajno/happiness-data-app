import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomTableOverlay from "./CustomTableOverlay";

export default function GridTable({
  rowData,
  colDefs,
  loading,
  error,
  pagination = true,
  ...props
}) {
  return (
    <AgGridReact
      {...props}
      rowData={rowData}
      columnDefs={colDefs}
      defaultColDef={{
        sortable: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
      }}
      pagination={pagination}
      paginationPageSize={20}
      paginationPageSizeSelector={(20, 50, 100)}
      noRowsOverlayComponent={CustomTableOverlay}
      noRowsOverlayComponentParams={{
        message: loading ? "LOADING..." : error ? error.message : null,
      }}
    />
  );
}
