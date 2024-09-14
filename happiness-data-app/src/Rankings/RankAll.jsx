import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import CountryCellRenderYears from "../components/CountryCellRenderYears";
import useRankings from "../useRankings";
import AlertModal from "../components/AlertModal";

const years = [2020, 2019, 2018, 2017, 2016, 2015];

export default function RankAll() {
  const navigate = useNavigate();
  const { year: paramYear } = useParams();
  const [year, setYear] = useState(paramYear);
  const [alertMessage, setAlertMessage] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "rank", maxWidth: 70 },
    {
      field: "country",
      cellRenderer: (params) => <CountryCellRenderYears value={params.value} />,
    },
    { field: "score" },
  ]);

  const { loading, ranks, error, success } = useRankings(year);

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
    }
    if (success) {
      setYear(paramYear);
      setRowData(ranks);
    }
  }, [paramYear, success, error]);

  const handleSelect = (newYear) => {
    setYear(newYear);
    navigate(`/rankings/${newYear}`);
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
              <h1 className="fw-bold mb-2">All Countries By Year</h1>
              <h2 className="fs-6 mb-4  text-center">
                Select the year using the tabs below. <br />
                Click a country name for more information.
              </h2>
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
