import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import CountryCellRenderYears from "../components/Table/CountryCellRenderYears";
import useRankings from "../Hooks/useRankings";
import useCountryList from "../Hooks/useCountryList";

import MainSection from "../components/MainSection";
import GridTable from "../components/Table/GridTable";
import GridYearTabs from "../components/Table/GridYearTabs";
import NotFound from "../NotFound";
import TextInput from "react-autocomplete-input";

export default function RankAll() {
  const navigate = useNavigate();
  const { year: paramYear } = useParams();
  const [allCountries, setAllCountries] = useState([]);
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

  const { list } = useCountryList();
  const { loading, ranks, error, success } = useRankings(paramYear);

  useEffect(() => {
    if (success) {
      setRowData(ranks);
      setAllCountries(list);
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
          <TextInput
            options={allCountries}
            Component={"input"}
            trigger={""}
            matchAny={true}
            className="me-2 form-control w-50 "
            placeholder="Quick Filter"
            aria-label="Search table"
            type="text"
            value={quickFilter}
            onChange={handleFilterChange}
          />
        </MainSection>
      )}
    </>
  );
}
