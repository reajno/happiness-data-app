import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import YearCellRenderFactors from "../components/YearCellRenderFactors";
import useRankings from "../useRankings";
import AlertModal from "../components/AlertModal";
import queryUtils from "../Utilities/utils";
import GridTable from "../components/GridTable";
import MainSection from "../components/MainSection";
import GridYearTabs from "../components/GridYearTabs";

export default function RankCountry({ isLoggedIn }) {
  const { country: paramCountry } = useParams();
  const { loading, ranks, error, success } = useRankings(
    null,
    queryUtils.toWhiteSpace(paramCountry)
  );
  const [alertMessage, setAlertMessage] = useState(null);
  const [country, setCountry] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    {
      field: "year",
      cellRenderer: (params) => (
        <YearCellRenderFactors
          isLoggedIn={isLoggedIn}
          value={params.value}
          country={queryUtils.toWhiteSpace(paramCountry)}
          onError={(cellError) => setAlertMessage(cellError)}
        />
      ),
    },
    { field: "rank" },
    { field: "score" },
  ]);

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
      console.error(error);
    }
    if (success) {
      setRowData(ranks);
      setCountry(ranks[0].country);
    }
  }, [isLoggedIn, country, success, alertMessage]);

  const page = {
    title: `${country} - Rank By Year`,
    text: (
      <>
        Compare this country's happiness ranking between 2015 to 2020.
        <br />
        Select year below to see the factors that contributed to the rank.
        <br />
        <br />
        (You must be logged into your account!)
      </>
    ),
  };

  return (
    <MainSection
      error={alertMessage}
      pageTitle={page.title}
      pageText={page.text}
    >
      <div
        className="ag-theme-quartz ag-grid-container"
        style={{ height: 300 }}
      >
        <GridTable
          rowData={rowData}
          colDefs={colDefs}
          loading={loading}
          error={error}
          pagination={false}
        />
      </div>
    </MainSection>
  );
}
