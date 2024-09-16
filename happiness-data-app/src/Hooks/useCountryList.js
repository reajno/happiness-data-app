import { useState, useEffect } from "react";

const getData = () => {
  const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";
  const url = "https://d2h6rsg43otiqk.cloudfront.net/prod/countries";

  return fetch(url, {
    headers: {
      "X-API-KEY": `${API_KEY}`,
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
