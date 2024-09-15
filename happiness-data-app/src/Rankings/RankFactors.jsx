import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

import queryUtils from "../Utilities/utils";
import AlertModal from "../components/AlertModal";
import useFactors from "../useFactors";
import useCountryList from "../useCountryList";
import GridTable from "../components/GridTable";
import MainSection from "../components/MainSection";
import GridYearTabs from "../components/GridYearTabs";

const withAvgColor = (initCols, avgArr) => {
  return initCols.map((col) => {
    if (avgArr.hasOwnProperty(col.field)) {
      return {
        ...col,
        cellStyle: (params) => ({
          backgroundColor:
            params.value > avgArr[col.field] ? "#b7e4c7" : "#f8d7da",
        }),
      };
    }
    return col;
  });
};

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

  useEffect(() => {
    if (success) {
      setAllCountries(list);
      const newColDefs = withAvgColor(colDefs, average);
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
    <MainSection error={error} pageTitle={page.title} pageText={page.text}>
      <GridYearTabs activeKey={paramYear} onSelect={handleSelect}>
        <GridTable
          rowData={rowData}
          colDefs={colDefs}
          loading={loading}
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
  );
  // return (
  //             <TextInput
  //               options={allCountries}
  //               Component={"input"}
  //               trigger={""}
  //               matchAny={true}
  //               className="me-2 form-control w-50 mb-5"
  //               placeholder="Quick Filter"
  //               aria-label="Search table"
  //               type="text"
  //               value={quickFilter}
  //               onChange={handleFilterChange}
  //             />
}
