import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CountryCellRenderYears from "../components/CountryCellRenderYears";
import useRankings from "../useRankings";

import MainSection from "../components/MainSection";
import GridTable from "../components/GridTable";
import GridYearTabs from "../components/GridYearTabs";

export default function RankAll() {
  const navigate = useNavigate();
  const { year: paramYear } = useParams();
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

  const handleSelect = (paramYear) => {
    navigate(`/rankings/${paramYear}`);
  };

  return (
    <MainSection error={error} pageTitle={page.title} pageText={page.text}>
      <GridYearTabs activeKey={paramYear} onSelect={handleSelect}>
        <GridTable
          rowData={rowData}
          colDefs={colDefs}
          loading={loading}
          error={error}
        />
      </GridYearTabs>
    </MainSection>
  );
}
