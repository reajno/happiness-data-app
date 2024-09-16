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

const factorsAverage = (yearFactors, year) => {
  const total = yearFactors.reduce((acc, country) => {
    // For the keys of each country, if key has factors value (e.g. not rank or country name).
    // Add the key to the accumulator object. It's initial value is zero and add the value of the same key found in the next country.
    // Return accumulator obj which has the sum of each factor key.
    Object.keys(country).forEach((key) => {
      if (key !== "rank" && key !== "country") {
        acc[key] = (acc[key] || 0) + parseFloat(country[key]);
      }
    });
    return acc;
  }, {});

  const averages = {};

// For each key in the result for factor totals, the key found in 'averages' object 
// should equal to each key with the total divided by total number of factors  
  Object.keys(total).forEach((key) => {
    averages[key] = (total[key] / yearFactors.length).toFixed(3);
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
