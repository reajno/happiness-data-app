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

const years = [2020, 2019, 2018, 2017, 2016, 2015];

export default function RankFactors() {
  const navigate = useNavigate();
  const { year: paramYear, country: paramCountry } = useParams();
  const [year, setYear] = useState(paramYear);
  const [allCountries, setAllCountries] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
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
  const { loading, factors, average, error, success } = useFactors(year);

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
    }
    if (success) {
      setAllCountries(list);
      setYear(paramYear);
      const newColDefs = withAvgColor(colDefs, average);
      setColDefs(newColDefs);
      setRowData(factors);
    }
  }, [paramYear, factors, list]);

  const handleSelect = (newYear) => {
    if (allCountries.includes(quickFilter.trim())) {
      navigate(`/factors/${newYear}/${queryUtils.toHyphen(quickFilter)}`);
    } else {
      setQuickFilter("");
      navigate(`/factors/${newYear}`);
    }
    setYear(newYear);
  };

  const handleFilterChange = (value) => {
    setQuickFilter(value);
  };

  return (
    <div className="container">
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-0">
          {loading ? (
            <h1> LOADING...</h1>
          ) : error ? (
            alertMessage && (
              <AlertModal message={alertMessage} prevOnClose={true} />
            )
          ) : (
            <>
              <h1 className="fw-bold mb-2">Country Happiness Factors</h1>
              <h2 className="fs-6 mb-4 text-center">
                Select the year using the tabs below. <br />
                Use the search bar to filter countries or specific scores.
                <br />
                Green cells indicate above average scores, while red signifies
                below average scores.
              </h2>

              <TextInput
                options={allCountries}
                Component={"input"}
                trigger={""}
                matchAny={true}
                className="me-2 form-control w-50 mb-5"
                placeholder="Quick Filter"
                aria-label="Search table"
                type="text"
                value={quickFilter}
                onChange={handleFilterChange}
              />
              <Tabs
                activeKey={year}
                onSelect={handleSelect}
                className="fw-bold fs-5 justify-content-center"
              >
                {years.map((year) => (
                  <Tab
                    key={year}
                    eventKey={year}
                    title={year}
                    className="mb-3 ag-theme-quartz"
                    style={{ height: 500 }}
                  >
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        flex: 1,
                        minWidth: 100,
                      }}
                      pagination={true}
                      paginationPageSize={20}
                      paginationPageSizeSelector={(20, 50, 100)}
                      quickFilterText={quickFilter}
                    />
                  </Tab>
                ))}
              </Tabs>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
