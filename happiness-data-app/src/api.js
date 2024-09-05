import { useState, useEffect } from "react";

const getData = (year, country) => {
  const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";
  const baseUrl = "https://d2h6rsg43otiqk.cloudfront.net/prod/rankings";

  const params = new URLSearchParams();

  if (year) params.append("year", year);
  if (country) params.append("country", country);

  const apiUrl = `${baseUrl}?${params.toString()}`;

  //   console.log(params.toString());

  return fetch(apiUrl, {
    headers: {
      "X-API-KEY": `${API_KEY}`,
    },
  }).then((res) => res.json());
};

export default function useRankings(year, country) {
  const [loading, setLoading] = useState(true);
  const [ranks, setRanks] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData(year, country)
      .then((data) => setRanks(data))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }, [year, country]);

  return {
    loading: loading,
    ranks: ranks,
    error: error,
  };
}
