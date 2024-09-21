import { Container } from "react-bootstrap";

import useCountryList from "../Hooks/useCountryList";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

export default function QuickFilter({
  placeholder,
  value,
  onChange,
  isTableFilter = false,
}) {
  const { list, error } = useCountryList();

  const filterElement = (
    <TextInput
      options={!error ? list : []}
      Component={"input"}
      trigger={""}
      matchAny={true}
      className={`me-2 form-control ${
        isTableFilter ? "table-filter bg-primary text-light" : ""
      }`}
      placeholder={placeholder}
      aria-label="Search table"
      type="search"
      value={value}
      onChange={onChange}
    />
  );
  return (
    <>
      {isTableFilter ? (
        <Container className="px-3 px-md-5">{filterElement}</Container>
      ) : (
        filterElement
      )}
    </>
  );
}
