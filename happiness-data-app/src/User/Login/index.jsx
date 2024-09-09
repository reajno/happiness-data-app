import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

import TextField from "../TextField";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod";
    const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";

    const url = `${API_URL}/user/login`;

    fetch(url, {
      method: "POST",
      headers: {
        "X-API-KEY": `${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.message);
        } else {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate({ pathname: "/factors" });
        }
      });
  };

  // const login = () => {
  //   const url = `${API_URL}/user/login`;

  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "X-API-KEY": `${API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: "mike@gmail.com", password: "password" }),
  //   })
  //     .then((res) =>
  //       res.json().then((res) => {
  //         localStorage.setItem("token", res.token);
  //         console.log(res);
  //       })
  //     )
  //     .catch((error) => console.log(error));
  // };

  const getFactors = () => {
    const url = `${API_URL}/factors/2020`;
    const token = localStorage.getItem("token");

    return fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": `${API_KEY}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res.json().then((res) => {
          console.log(res);
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1 className="pt-5">JWT Token Example</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={getFactors}>Get Factors</button>

      <TextField ext="Email" type="email" onChange={setEmail} value={email} />
      <TextField
        value={password}
        text="Password"
        type="password"
        onChange={setPassword}
      />

      {message ? <Alert variant="danger">{message}</Alert> : null}
    </>
  );
}
