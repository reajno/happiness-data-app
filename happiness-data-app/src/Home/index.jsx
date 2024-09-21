import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../Components/Search";

export default function Home({ isLoggedIn }) {
  return (
    <>
      <Container fluid className="me-auto">
        <Row className="vh-100 d-flex align-items-center">
          <Col className=" d-flex flex-column align-items-center gap-2">
            <h1>😀</h1>
            <h1 className="fw-bold m-0">Happiness Rankings</h1>
            <h2 className="fs-6 mb-4">How happy is everyone where you live?</h2>
            <SearchBar isLoggedIn={isLoggedIn} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
