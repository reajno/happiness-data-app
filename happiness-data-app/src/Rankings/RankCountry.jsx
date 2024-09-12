import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Row, Col } from "react-bootstrap";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CellRenderer from "../components/CellRenderer";

import useRankings from "../useRankings";

export default function RankCountry() {
  const { id } = useParams();
  const { loading, ranks, error } = useRankings(null, id.replace(/-/g, " "));
  const [country, setCountry] = useState("");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "year", cellRenderer: CellRenderer },
    { field: "rank", headerName: "Happiness Rank" },
  ]);

  useEffect(() => {
    if (ranks && ranks.length > 0) {
      setRowData(ranks);
      setCountry(ranks[0].country);
    }
  }, [ranks]);

  return (
    <div className="container">
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-0">
          {/* <h1 className="fw-bold mb-2">{country} - Rank By Year</h1>
          <h2 className="fs-6 mb-4  text-center">
            Select the year using the tabs below. <br />
            Click a country name for more information.
          </h2> */}
          {loading ? (
            <h1> LOADING...</h1>
          ) : error ? (
            <h1>{error.message}</h1>
          ) : (
            <>
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
