import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import YearCellRenderFactors from "../components/YearCellRenderFactors";
import useRankings from "../useRankings";
import AlertModal from "../components/AlertModal";
import queryUtils from "../Utilities/utils";

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
          setAlertMessage={setAlertMessage}
        />
      ),
    },
    { field: "rank" },
    { field: "score" },
  ]);

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
    }
    if (success) {
      setRowData(ranks);
      setCountry(ranks[0].country);
    }
  }, [country, success, error]);

  return (
    <div className="container">
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-0">
          {loading ? (
            <h1> LOADING...</h1>
          ) : error ? (
            <AlertModal message={alertMessage} prevOnClose={true} />
          ) : (
            <>
              {alertMessage && (
                <AlertModal
                  message={alertMessage}
                  onClose={() => setAlertMessage(null)}
                  prevOnClose={false}
                />
              )}
              <h1 className="fw-bold mb-2">{country} - Rank By Year</h1>
              <h2 className="fs-6 mb-4  text-center">
                Compare this country's happiness ranking between 2015 to 2020.
                <br />
                Select year below to see the factors that contributed to the
                rank.
                <br />
                <br />
                (You must be logged into your account!)
              </h2>
              <div
                className="ag-theme-quartz ag-grid-container"
                style={{ height: 300 }}
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
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
