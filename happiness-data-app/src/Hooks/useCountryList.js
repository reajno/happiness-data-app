import { useState, useEffect } from "react";

const getData = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `${import.meta.env.VITE_API_URL}/countries`;

  return fetch(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
    },
  }).then((res) => res.json());
};

export default function useCountryList() {
  const [list, setList] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then((data) => setList(data))
      .catch((error) => {
        setError(error);
      });
  }, []);

  return {
    list: list,
    error: error,
  };
}
