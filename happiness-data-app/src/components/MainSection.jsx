import { Container, Row, Col } from "react-bootstrap";
import AlertModal from "./AlertModal";

export default function MainSection({
  error,
  pageTitle,
  pageText,
  className,
  children,
}) {
  return (
    <Container>
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-3">
          {error ? (
            <>
              <h1 className="fw-bold mb-2">{pageTitle}</h1>
              <h2 className="fs-6 mb-4  text-center">{pageText}</h2>
              <AlertModal
                className={`mt-2 ${className}`}
                message={error.message}
                prevOnClose={false}
                dismissible={false}
              />
              {children}
            </>
          ) : (
            <>
              <h1 className="fw-bold mb-2">{pageTitle}</h1>
              <h2 className="fs-6 mb-4  text-center">{pageText}</h2>
              {children}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
