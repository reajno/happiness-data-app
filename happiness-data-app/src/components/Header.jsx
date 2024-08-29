import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import SearchBar from "./Search";

const HighlightLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return <Nav.Link {...props} active={match} />;
};

export default function Header() {
  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark" className="fixed-top ">
        <Container fluid>
          <Navbar.Brand to="/" as={Link}>
            Happiness Data App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <HighlightLink to="/" as={Link}>
                Home
              </HighlightLink>
              <HighlightLink to="/rankings" as={Link}>
                Country Rankings
              </HighlightLink>
              <HighlightLink to="/factors" as={Link}>
                Factors
              </HighlightLink>
              <HighlightLink to="/login" as={Link}>
                Login
              </HighlightLink>
              <HighlightLink to="/register" as={Link}>
                Register
              </HighlightLink>
            </Nav>
            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
