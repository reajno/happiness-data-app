import { Button, Form } from "react-bootstrap";

export default function SearchBar({ className }) {
  return (
    <div>
      <form className={className + " " + "d-flex"} role="search">
        <Form.Control
          className="me-2"
          type="search"
          placeholder="Search By Country"
          aria-label="Search"
        />
        <Button variant="success" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}
