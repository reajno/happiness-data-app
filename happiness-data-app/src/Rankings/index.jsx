import { useState } from "react";
import { Container } from "react-bootstrap";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import useRankings from "../api";
import RankAll from "../components/RankAll";
import RankCountry from "../components/RankCountry";

export default function Rankings({ year, country }) {
  // API Call
  //   let { ranks, error } = useRankings();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "rank", headerName: "Happiness Rank" },
    { field: "country" },
  ]);

  return (
    <>
      <Container className="pt-5">
        <RankAll />
        {/* <RankCountry inputCountry={"india"} /> */}
      </Container>
    </>
  );
}
