import { useState, useEffect } from "react";

const getFactors = (year) => {
  const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod";
  const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";

  const url = `${API_URL}/factors/${year}`;
  const token = localStorage.getItem("token");

  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": `${API_KEY}`,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const factorsAverage = (data, year) => {
  const total = data.reduce((acc, country) => {
    Object.keys(country).forEach((key) => {
      if (key !== "rank" && key !== "country") {
        acc[key] = (acc[key] || 0) + parseFloat(country[key]);
      }
    });
    return acc;
  }, {});

  const averages = {};
  Object.keys(total).forEach((key) => {
    averages[key] = (total[key] / data.length).toFixed(3);
  });

  return {
    year: year,
    ...averages,
  };
};

export default function useFactors(year) {
  const [loading, setLoading] = useState(true);
  const [factors, setFactors] = useState();
  const [error, setError] = useState(null);
  const [average, setAverage] = useState({});

  useEffect(() => {
    setError(null);
    setLoading(true);
    getFactors(year)
      .then((data) => {
        if (data.error) {
          setError(data);
          throw data;
        } else {
          setAverage(factorsAverage(data, year));
          setFactors(data);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  return {
    loading: loading,
    factors: factors,
    error: error,
    average: average,
    success: !loading && !error && factors.length > 0,
  };
}
