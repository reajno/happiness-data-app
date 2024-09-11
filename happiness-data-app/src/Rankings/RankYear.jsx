import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CellRenderer from "../components/CellRenderer";
import useRankings from "../useRankings";

export default function RankCountry() {
  const { year } = useParams();
  const { ranks } = useRankings(year, null);
  const [selectedYear, setSelectedYear] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "country", cellRenderer: CellRenderer },
    { field: "rank", headerName: "Happiness Rank" },
  ]);

  useEffect(() => {
    if (ranks && ranks.length > 0) {
      setRowData(ranks);
      setSelectedYear(ranks[0].year);
    }
  }, [ranks]);

  return (
    <div className="pt-5">
      <h1>{selectedYear} - Rank By Year</h1>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
