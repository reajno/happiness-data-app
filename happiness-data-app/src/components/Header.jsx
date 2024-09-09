import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import SearchBar from "./Search";

import { useState } from "react";

const HighlightLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return <Nav.Link {...props} active={match} />;
};

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [expanded, setExpanded] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <Navbar
        expand="lg"
        bg="primary"
        variant="dark"
        className="fixed-top"
        expanded={expanded}
      >
        <Container fluid>
          <Navbar.Brand to="/" as={Link} onClick={() => setExpanded(false)}>
            Happiness Data App
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <HighlightLink
                to="/"
                as={Link}
                onClick={() => setExpanded(false)}
              >
                Home
              </HighlightLink>
              <HighlightLink
                to="/rankings"
                as={Link}
                onClick={() => setExpanded(false)}
              >
                Country Rankings
              </HighlightLink>
              <HighlightLink
                to="/factors"
                as={Link}
                onClick={() => setExpanded(false)}
              >
                Factors
              </HighlightLink>
              {!isLoggedIn ? (
                <HighlightLink
                  to="/login"
                  as={Link}
                  onClick={() => setExpanded(false)}
                >
                  Login
                </HighlightLink>
              ) : null}
              {!isLoggedIn ? (
                <HighlightLink
                  to="/register"
                  as={Link}
                  onClick={() => setExpanded(false)}
                >
                  Register
                </HighlightLink>
              ) : null}
              {isLoggedIn ? (
                <HighlightLink
                  to="/"
                  as={Link}
                  onClick={() => {
                    setExpanded(false);
                    handleLogOut();
                  }}
                >
                  Logout
                </HighlightLink>
              ) : null}
            </Nav>
            <SearchBar onClick={() => setExpanded(false)} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
