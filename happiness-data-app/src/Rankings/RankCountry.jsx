import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YearCellRenderFactors from "../components/Table/YearCellRenderFactors";
import useRankings from "../Hooks/useRankings";
import queryUtils from "../Utilities/utils";
import GridTable from "../components/Table/GridTable";
import MainSection from "../components/MainSection";
import NotFound from "../NotFound";
import { Spinner } from "react-bootstrap";

export default function RankCountry({ isLoggedIn }) {
  const { country: paramCountry } = useParams();
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
    if (success) {
      setRowData(ranks);
      setCountry(ranks[0].country);
    }
  }, [isLoggedIn, success, alertMessage, error]);

  if (error) {
    return <NotFound message={error.message} />;
  }

  const page = {
    title: `${country} - Rank By Year`,
    text: (
      <>
        Compare this country's happiness ranking between 2015 to 2020.
        <br />
        Logged in users can select a year below to see the rank's contributing
        factors.
      </>
    ),
  };

  return (
    <>
      {loading ? (
        <MainSection>
          <Spinner animation="border" role="status" />
        </MainSection>
      ) : error ? (
        <NotFound message={error.message} />
      ) : (
        <MainSection
          className={"w-md-50"}
          error={alertMessage}
          pageTitle={page.title}
          pageText={page.text}
        >
          <div
            className="ag-theme-quartz ag-grid-container"
            style={{ height: 300 }}
          >
            <GridTable
              className={"px-3 px-md-0"}
              rowData={rowData}
              colDefs={colDefs}
              loading={loading}
              error={error}
              pagination={false}
            />
          </div>
        </MainSection>
      )}
    </>
  );
}
