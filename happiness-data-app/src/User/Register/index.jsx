import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import TextField from "../TextField";
import useAuthenticate from "../../useAuthenticate";
import AlertModal from "../../components/AlertModal";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { loading, error, register, successMessage } =
    useAuthenticate("register");

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
    }

    if (successMessage) {
      setAlertMessage(`${successMessage}, please Login`);
    }
  }, [error, successMessage]);

  const handleRegister = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex align-items-center pt-5">
          <Col className=" d-flex flex-column align-items-center p-3">
            <h1 className="fw-bold mb-4">Register</h1>

            <Form>
              {error
                ? alertMessage && (
                    <AlertModal message={alertMessage} dismissible={false} />
                  )
                : null}
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
                    loading ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  Register
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    // <Container fluid="lg" className="pt-2">
    //   <main className="flex-grow-1">
    //     <Row className="viewport-height-75 align-items-center">
    //       <Col md={6} lg={7}>
    //         <div style={{ width: "100%" }}>
    //           <h1 className="mb-5">Register</h1>
    //           {alertMessage ? (
    //             <Alert variant={!error ? "success" : "danger"}>
    //               {alertMessage}
    //             </Alert>
    //           ) : null}
    //           <Form className=" mb-3">
    //             <Row className="g-3">
    //               <TextField
    //                 text="Email"
    //                 type="email"
    //                 onChange={setEmail}
    //                 value={email}
    //               />
    //               <TextField
    //                 value={password}
    //                 text="Password"
    //                 type="password"
    //                 onChange={setPassword}
    //               />
    //               <div className="col-12">
    //                 <Button
    //                   type="submit"
    //                   variant="primary"
    //                   onClick={handleRegister}
    //                 >
    //                   Register
    //                 </Button>
    //               </div>
    //             </Row>
    //           </Form>
    //         </div>
    //       </Col>
    //     </Row>
    //   </main>
    // </Container>
  );
}
