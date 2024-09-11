import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
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
    { field: "economy" },
    { field: "family" },
    { field: "freedom" },
    { field: "generosity" },
    { field: "health" },
    { field: "trust" },
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
    <div className="pt-5">
      <h1>All Countries By Year</h1>
      <Tabs id="controlled-tab" activeKey={key} onSelect={handleSelect}>
        {years.map((year) => (
          <Tab
            eventKey={year}
            title={year}
            className="mb-3 ag-theme-quartz"
            style={{ height: 500 }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={{ sortable: true, resizable: true, flex: 1 }}
              pagination={true}
              paginationPageSize={20}
              paginationPageSizeSelector={(20, 50, 100)}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
