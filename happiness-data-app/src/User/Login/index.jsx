import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

import TextField from "../TextField";
import AlertModal from "../../components/AlertModal";
import useAuthenticate from "../../Hooks/useAuthenticate";
import MainSection from "../../components/MainSection";

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
      setIsLoggedIn(true);
      navigate({ pathname: "/factors" });
    }
  }, [error, isLoggedIn, setIsLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <MainSection pageTitle={"Log In"}>
        <Form>
          {alertMessage && (
            <AlertModal message={alertMessage} dismissible={false} />
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
              Log In
            </Button>
          </Row>
        </Form>
      </MainSection>
    </>
  );
}
