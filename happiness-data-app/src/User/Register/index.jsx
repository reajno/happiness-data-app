import { useEffect, useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import TextField from "../TextField";
import useAuthenticate from "../../Hooks/useAuthenticate";
import AlertMessage from "../../Components/AlertMessage";
import MainSection from "../../Components/MainSection";

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
            <AlertMessage
              variant={error ? "danger" : "success"}
              message={alertMessage}
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
    </>
  );
}
