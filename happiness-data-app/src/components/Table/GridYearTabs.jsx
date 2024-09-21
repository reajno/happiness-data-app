import { Tabs, Tab } from "react-bootstrap";

const years = [2020, 2019, 2018, 2017, 2016, 2015];

export default function GridYearTabs({ activeKey, onSelect, children }) {
  return (
    <Tabs
      activeKey={activeKey}
      onSelect={onSelect}
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
          {children}
        </Tab>
      ))}
    </Tabs>
  );
}
