import { useEffect, useState } from "react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CellRenderer from "../components/CellRenderer";
import useRankings from "../useRankings";

const yearList = (data) => {
  const years = data.map((item) => item.year);

  return [...new Set(years)];
};

export default function RankAll() {
  const { ranks } = useRankings();
  const [key, setKey] = useState("2020");
  const [years, setYears] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "rank", maxWidth: 70 },
    {
      field: "country",
      cellRenderer: CellRenderer,
    },
    { field: "score" },
  ]);

  const handleSelect = (k) => {
    setKey(k);
  };

  useEffect(() => {
    if (ranks) {
      const filteredData = ranks.filter((rank) => rank.year == key);
      setRowData(filteredData);
      setYears(yearList(ranks));
    }
  }, [ranks, key]);

  return (
    <div className="container">
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-0">
          <h1 className="fw-bold mb-2">All Countries By Year</h1>
          <h2 className="fs-6 mb-4  text-center">
            Select the year using the tabs below. <br />
            Click a country name for more information.
          </h2>
          <Tabs
            activeKey={key}
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
        </Col>
      </Row>
    </div>
  );
}
