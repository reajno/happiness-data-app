import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CellRenderer from "../components/CellRenderer";
import useRankings from "../useRankings";

export default function RankAll() {
  const { ranks } = useRankings();
  const [key, setKey] = useState("2020");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "rank", headerName: "Happiness Rank" },
    {
      field: "country",
      cellRenderer: CellRenderer,
    },
  ]);

  const handleSelect = (k) => {
    setKey(k);
  };

  useEffect(() => {
    if (ranks) {
      const filteredData = ranks.filter((rank) => rank.year == key);
      setRowData(filteredData);
    }
  }, [ranks, key]);

  return (
    <div className="pt-5">
      <h1>All Countries By Year</h1>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={handleSelect}>
        <Tab
          eventKey="2020"
          title="2020"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
        <Tab
          eventKey="2019"
          title="2019"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
        <Tab
          eventKey="2018"
          title="2018"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
        <Tab
          eventKey="2017"
          title="2017"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
        <Tab
          eventKey="2016"
          title="2016"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
        <Tab
          eventKey="2015"
          title="2015"
          className="mb-3 ag-theme-quartz"
          style={{ height: 500 }}
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Tab>
      </Tabs>
    </div>
  );
}
