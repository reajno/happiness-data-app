import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

import TextField from "../TextField";
import AlertModal from "../../components/AlertModal";
import useAuthenticate from "../../useAuthenticate";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const { loading, error, isLoggedIn, login } = useAuthenticate("login");

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
    }

    if (isLoggedIn) {
      navigate({ pathname: "/factors/2015" });
    }
  }, [error, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex align-items-center pt-5">
          <Col className="d-flex flex-column align-items-center p-3">
            <h1 className="fw-bold mb-4">Log In</h1>

            <Form>
              {error
                ? alertMessage && (
                    <AlertModal message={alertMessage} dismissible={false} />
                  )
                : null}
              <Row className=" p-2">
                <TextField
                  size={12}
                  text="Email"
                  type="email"
                  onChange={setEmail}
                  value={email}
                />
                <TextField
                  size={12}
                  text="Password"
                  type="password"
                  onChange={setPassword}
                  value={password}
                />
                <Button
                  className={`mt-4 btn py-2 ${
                    loading ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Login
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
