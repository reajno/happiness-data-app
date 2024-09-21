import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import useRankings from "../../Hooks/useRankings";
import CountryCellRenderYears from "../Table/CountryCellRenderYears";
import MainSection from "../MainSection";
import GridTable from "../Table/GridTable";
import GridYearTabs from "../Table/GridYearTabs";
import NotFound from "../../NotFound";
import QuickFilter from "../QuickFilter";

const page = {
  title: "All Countries By Year",
  text: (
    <>
      Select the year using the tabs below.
      {<br />}
      Click a country name for more information.
    </>
  ),
};

export default function RankAll() {
  const navigate = useNavigate();
  const { year: paramYear } = useParams();
  const [quickFilter, setQuickFilter] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "rank", maxWidth: 70 },
    {
      field: "country",
      cellRenderer: (params) => <CountryCellRenderYears value={params.value} />,
    },
    { field: "score" },
  ]);

  const { loading, ranks, error, success } = useRankings(paramYear);

  useEffect(() => {
    if (success) {
      setRowData(ranks);
    }
  }, [paramYear, success, error]);

  const handleSelect = (paramYear) => {
    navigate(`/rankings/${paramYear}`);
  };

  const handleFilterChange = (value) => {
    setQuickFilter(value);
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
        <MainSection error={error} pageTitle={page.title} pageText={page.text}>
          <GridYearTabs activeKey={paramYear} onSelect={handleSelect}>
            <GridTable
              className={"px-3 px-md-5"}
              rowData={rowData}
              colDefs={colDefs}
              quickFilterText={quickFilter}
            />
          </GridYearTabs>
          <QuickFilter
            isTableFilter={true}
            placeholder="Filter Table..."
            value={quickFilter}
            onChange={handleFilterChange}
          />
        </MainSection>
      )}
    </>
  );
}
