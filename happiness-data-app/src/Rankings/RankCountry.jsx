import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YearCellRenderFactors from "../components/YearCellRenderFactors";
import useRankings from "../useRankings";
import queryUtils from "../Utilities/utils";
import GridTable from "../components/GridTable";
import MainSection from "../components/MainSection";

export default function RankCountry({ isLoggedIn }) {
  const { country: paramCountry } = useParams();
  const [alertMessage, setAlertMessage] = useState(null);
  // const [country, setCountry] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    {
      field: "year",
      cellRenderer: (params) => (
        <YearCellRenderFactors
          isLoggedIn={isLoggedIn}
          value={params.value}
          country={queryUtils.toWhiteSpace(paramCountry)}
          onError={(cellErrorObj) => setAlertMessage(cellErrorObj)}
        />
      ),
    },
    { field: "rank" },
    { field: "score" },
  ]);

  const { loading, ranks, error, success } = useRankings(
    null,
    queryUtils.toWhiteSpace(paramCountry)
  );

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
      console.error(error);
    }
    /* Is above condition needed? */
    if (success) {
      setRowData(ranks);
      // setCountry(ranks[0].country);
    }
  }, [isLoggedIn, success, alertMessage]);

  const page = {
    title: `${ranks[0].country} - Rank By Year`,
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
