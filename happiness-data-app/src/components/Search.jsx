import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useRankings from "../api";
import useCountryList from "../useCountryList";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

export default function SearchBar(props) {
  const { list, error } = useCountryList();
  const [allCountry, setAllCountry] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (list.length > 0) {
      setAllCountry(list);
    }
  }, [list]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const currentSearch = search;
      setSearch("");
      navigate(`/rankings/${currentSearch}`);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <TextInput
          options={allCountry}
          Component={"input"}
          trigger={""}
          matchAny={true}
          passThroughEnter={true}
          className="me-2 form-control"
          placeholder="Search By Country"
          aria-label="Search"
          type="search"
          value={search}
          onChange={(value) => setSearch(value)}
        />
        {/* <Form.Control
          className="me-2"
          type="search"
          placeholder="Search By Country"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <Button variant="success" type="submit" {...props}>
          Search
        </Button>
      </form>
    </div>
  );
}
