import { useState } from "react";

const attemptAuthenticate = (type, email, password) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `${import.meta.env.VITE_API_URL}/user`;

  let url = "";

  if (type === "login") {
    url = `${apiUrl}/login`;
  }

  if (type === "register") {
    url = `${apiUrl}/register`;
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((res) => res.json());
};

export default function useAuthenticate(type) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    setLoading(true);
    attemptAuthenticate(type, email, password)
      .then((data) => {
        if (data.error) {
          setError(data);
          throw data;
        } else {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = (email, password) => {
    setError(null);
    setLoading(true);
    setSuccessMessage("");
    attemptAuthenticate(type, email, password)
      .then((data) => {
        if (data.error) {
          setError(data);
          throw data;
        }
        setSuccessMessage(data.message);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    isLoggedIn,
    login,
    register,
    successMessage,
  };
}
