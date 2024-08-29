import { Container, Row, Col, Stack } from "react-bootstrap";
import SearchBar from "../components/Search";

export default function Home() {
  return (
    <>
      <Container fluid className="me-auto bg-light">
        <Row className="hero d-flex align-items-center">
          <Col className=" d-flex flex-column align-items-center gap-2">
            <h1>😀</h1>
            <h1 className="fw-bold m-0">Happiness Rankings</h1>
            <h2 className="fs-6 mb-4">How happy is everyone where you live?</h2>
            <SearchBar />
          </Col>
        </Row>
      </Container>
    </>
  );
}
