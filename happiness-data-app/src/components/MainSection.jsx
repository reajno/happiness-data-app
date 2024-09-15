import { Row, Col } from "react-bootstrap";
import AlertModal from "./AlertModal";

export default function MainSection({ error, pageTitle, pageText, children }) {
  return (
    <div className="container">
      <Row className="vh-100 d-flex align-items-center pt-5">
        <Col className=" d-flex flex-column align-items-center p-0">
          {error ? (
            <AlertModal message={error.message} prevOnClose={true} />
          ) : (
            <>
              <h1 className="fw-bold mb-2">{pageTitle}</h1>
              <h2 className="fs-6 mb-4  text-center">{pageText}</h2>
              {children}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
