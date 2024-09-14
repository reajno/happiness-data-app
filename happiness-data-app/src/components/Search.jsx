import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useCountryList from "../useCountryList";
import queryUtils from "../Utilities/utils";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

export default function SearchBar({ onClick, isLoggedIn }) {
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

    const countryQuery = queryUtils.toHyphen(country);
    const yearQuery = year ? year : null;

    let url = "/rankings";
    if (countryQuery && yearQuery) {
      if (!isLoggedIn) {
        console.log("hi");
        url = `/rankings/country/${countryQuery}/`;
      } else {
        url = `/factors/${yearQuery}/${countryQuery}`;
        // Set alert message to log in
      }
    } else if (countryQuery) {
      url = `/rankings/country/${countryQuery}`;
    } else if (yearQuery) {
      url = `/rankings/${yearQuery}`;
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

        <Button variant="success" type="submit" onClick={onClick}>
          Search
        </Button>
      </form>
    </div>
  );
}
