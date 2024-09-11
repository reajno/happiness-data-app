import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import useRankings from "../useRankings";

export default function RankCountry() {
  const { id } = useParams();
  const { loading, ranks, error } = useRankings(null, id.replace(/-/g, " "));
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
      {loading ? (
        <h1> LOADING...</h1>
      ) : (
        <h1>{error ? `${error.message}` : `${country} - Rank By Year`}</h1>
      )}

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>

      {/* {ranks ? ranks.map((rank) => <h1>{rank.year}</h1>) : null} */}
    </div>
  );
}
