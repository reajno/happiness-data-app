import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      e.target[0].value = "";
      navigate(`/rankings/${search}`);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <Form.Control
          className="me-2"
          type="search"
          placeholder="Search By Country"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="success" type="submit" {...props}>
          Search
        </Button>
      </form>
    </div>
  );
}
