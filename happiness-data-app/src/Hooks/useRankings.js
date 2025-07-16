import { useState, useEffect } from "react";

const getData = (year, country) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `${import.meta.env.VITE_API_URL}/rankings`;

  const params = new URLSearchParams();

  if (year) params.append("year", year);
  if (country) params.append("country", country);

  const url = `${apiUrl}?${params.toString()}`;

  return fetch(url, {
    headers: {
      "X-API-KEY": `${apiKey}`,
    },
  }).then((res) => res.json());
};

const errorCountryNotFound = (country) => {
  return {
    error: true,
    message: `Invalid country format. "${country}" is not a country`,
  };
};

export default function useRankings(year, country) {
  const [loading, setLoading] = useState(true);
  const [ranks, setRanks] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getData(year, country)
      .then((data) => {
        if (data.length === 0) {
          throw errorCountryNotFound(country);
        }
        if (data.error) {
          setError(data);
          throw data;
        }

        setRanks(data);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year, country]);

  return {
    loading: loading,
    ranks: ranks,
    error: error,
    success: !loading && !error && ranks.length > 0,
  };
}
