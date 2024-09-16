import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

import queryUtils from "../Utilities/utils";
import useFactors from "../Hooks/useFactors";
import useCountryList from "../Hooks/useCountryList";
import MainSection from "../components/MainSection";
import GridYearTabs from "../components/Table/GridYearTabs";
import GridTable from "../components/Table/GridTable";
import NotFound from "../NotFound";
import AlertModal from "../components/AlertModal";

export default function RankFactors() {
  const navigate = useNavigate();
  const { year: paramYear, country: paramCountry } = useParams();
  const [allCountries, setAllCountries] = useState([]);
  const [quickFilter, setQuickFilter] = useState(
    paramCountry ? queryUtils.toWhiteSpace(paramCountry) : ""
  );
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "rank" },
    { field: "country" },
    { field: "economy" },
    { field: "family" },
    { field: "freedom" },
    { field: "generosity" },
    { field: "health" },
    { field: "trust" },
    { field: "score" },
  ]);

  const { list } = useCountryList();
  const { loading, factors, average, error, success } = useFactors(paramYear);

  const highLowAverageColor = (initColDefs, factorsAvg) => {
    return initColDefs.map((col) => {
      if (factorsAvg.hasOwnProperty(col.field)) {
        return {
          ...col,
          cellStyle: (params) => ({
            backgroundColor:
              params.value > factorsAvg[col.field] ? "#b7e4c7" : "#f8d7da",
          }),
        };
      }
      return col;
    });
  };

  useEffect(() => {
    if (success) {
      setAllCountries(list);
      const newColDefs = highLowAverageColor(colDefs, average);
      setColDefs(newColDefs);
      setRowData(factors);
    }
  }, [paramYear, factors, list]);

  const page = {
    title: "Country Happiness Factors",
    text: (
      <>
        Select the year using the tabs below. <br />
        Use the search bar to filter countries or specific scores. <br />
        Green cells indicate above average scores, while red signifies below
        average scores.
      </>
    ),
  };

  const handleSelect = (paramYear) => {
    if (allCountries.includes(quickFilter.trim())) {
      navigate(`/factors/${paramYear}/${queryUtils.toHyphen(quickFilter)}`);
    } else {
      setQuickFilter("");
      navigate(`/factors/${paramYear}`);
    }
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
      ) : error && error.message === "Invalid JWT token" ? (
        <NotFound pageTitle="UNAUTHORISED ACCESS">
          <span>
            You must <a href="/login">Log In</a> or{" "}
            <a href="/register">Register</a> to view this content.
          </span>
        </NotFound>
      ) : (
        <MainSection error={error} pageTitle={page.title} pageText={page.text}>
          <GridYearTabs activeKey={paramYear} onSelect={handleSelect}>
            <GridTable
              className={"px-3 px-md-5"}
              rowData={rowData}
              colDefs={colDefs}
              // loading={loading}
              error={error}
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
