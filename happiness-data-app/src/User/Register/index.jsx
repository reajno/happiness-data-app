import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TextField from "../TextField";
import useAuthenticate from "../../Hooks/useAuthenticate";
import AlertModal from "../../components/AlertModal";
import MainSection from "../../components/MainSection";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { loading, error, register, successMessage } =
    useAuthenticate("register");

  useEffect(() => {
    setAlertMessage("");
    if (error) {
      setAlertMessage(error.message);
    } else if (successMessage) {
      setAlertMessage(
        <>
          {successMessage}, please <a href="/login">Log In</a>
        </>
      );
    }
  }, [error, successMessage]);

  const handleRegister = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <>
      <MainSection pageTitle={"Register"}>
        <Form>
          {alertMessage && (
            <AlertModal
              variant={error ? "danger" : "success"}
              message={alertMessage}
              dismissible={false}
            />
          )}
          <Row className="p-2">
            <TextField
              size={12}
              text="Email"
              type="email"
              onChange={setEmail}
              value={email}
            />
            <TextField
              text="Password"
              type="password"
              onChange={setPassword}
              value={password}
            />
            <Button
              className={`mt-4 btn py-2 ${
                loading ? "btn-secondary" : "btn-primary"
              }`}
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </Button>
          </Row>
        </Form>
      </MainSection>

      {/* <Container>
        <Row className="vh-100 d-flex align-items-center pt-5">
          <Col className=" d-flex flex-column align-items-center p-3">
            <h1 className="fw-bold mb-4">Register</h1>

            <Form>
              {successMessage
                ? alertMessage && (
                    <AlertModal
                      variant="success"
                      message={alertMessage}
                      dismissible={false}
                    />
                  )
                : null}
              <Row className="p-2">
                <TextField
                  size={12}
                  text="Email"
                  type="email"
                  onChange={setEmail}
                  value={email}
                />
                <TextField
                  text="Password"
                  type="password"
                  onChange={setPassword}
                  value={password}
                />
                <Button
                  className={`mt-4 btn py-2 ${
                    loading ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  Register
                </Button>
              </Row>
              {error
                ? alertMessage && (
                    <AlertModal message={alertMessage} dismissible={false} />
                  )
                : null}
            </Form>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
