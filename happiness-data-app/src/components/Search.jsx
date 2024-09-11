import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useCountryList from "../useCountryList";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

export default function SearchBar(props) {
  const { list } = useCountryList();

  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (list.length > 0) {
      setAllCountries(list);
    }
  }, [list]);

  const handleSearch = (e) => {
    e.preventDefault();

    const countryQuery = country.trim().toLowerCase().replace(/\s+/g, "-");
    const yearQuery = year ? year : null;

    let url = "/rankings";
    if (countryQuery && yearQuery) {
      url = `/rankings/country/${countryQuery}/year/${yearQuery}`;
    } else if (countryQuery) {
      url = `/rankings/country/${countryQuery}`;
    } else if (yearQuery) {
      url = `/rankings/year/${yearQuery}`;
    }

    navigate(url);
    setCountry("");
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <TextInput
          options={allCountries}
          Component={"input"}
          trigger={""}
          matchAny={true}
          className="me-2 form-control"
          placeholder="Search By Country"
          aria-label="Search"
          type="search"
          value={country}
          onChange={(value) => setCountry(value)}
        />
        <Form.Select
          className="w-50 me-2"
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
          <option value={2018}>2018</option>
          <option value={2017}>2017</option>
          <option value={2016}>2016</option>
          <option value={2015}>2015</option>
        </Form.Select>

        <Button variant="success" type="submit" {...props}>
          Search
        </Button>
      </form>
    </div>
  );
}
