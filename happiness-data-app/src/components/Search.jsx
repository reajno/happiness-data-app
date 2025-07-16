import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import queryUtils from "../Utilities/utils";
import QuickFilter from "../components/QuickFilter";

export default function SearchBar({ onClick, isLoggedIn }) {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const countryQuery = queryUtils.toHyphen(country);
    const yearQuery = year ? year : null;

    let url = "/rankings";
    if (countryQuery && yearQuery) {
      if (!isLoggedIn) {
        url = `/rankings/country/${countryQuery}/`;
      } else {
        url = `/factors/${yearQuery}/${countryQuery}`;
      }
    } else if (countryQuery) {
      url = `/rankings/country/${countryQuery}`;
    } else if (yearQuery) {
      url = `/rankings/${yearQuery}`;
    }

    navigate(url);
    setCountry("");
  };

  const handleFilterChange = (value) => {
    setCountry(value);
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <QuickFilter
          placeholder="Search By Country"
          value={country}
          onChange={handleFilterChange}
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
