import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import useRankings from "../api";

export default function RankCountry() {
  const { id } = useParams();
  const { ranks } = useRankings(null, id);
  const [country, setCountry] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "year" },
    { field: "rank", headerName: "Happiness Rank" },
  ]);

  useEffect(() => {
    if (ranks && ranks.length > 0) {
      setRowData(ranks);
      setCountry(ranks[0].country);
    }
  }, [ranks]);

  return (
    <div className="pt-5">
      <h1>{country} - Rank By Year</h1>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>

      {/* {ranks ? ranks.map((rank) => <h1>{rank.year}</h1>) : null} */}
    </div>
  );
}
