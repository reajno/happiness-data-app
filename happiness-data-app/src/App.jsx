import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Home from "./Home";
import RankAll from "./Rankings/RankAll";
import RankCountry from "./Rankings/RankCountry";
import Login from "./User/Login";
import Register from "./User/Register";
import Factors from "./Factors";
import RankFactors from "./Rankings/RankFactors";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/rankings">
            <Route index element={<Navigate to="/rankings/2020" replace />} />
            <Route path=":year" element={<RankAll />} />
            <Route
              path="country/:country"
              element={<RankCountry isLoggedIn={isLoggedIn} />}
            />
          </Route>

          <Route path="/factors">
            <Route index element={<Navigate to="/factors/2020" replace />} />
            <Route path=":year" element={<RankFactors />}>
              <Route path=":country" element={<RankFactors />} />
            </Route>
          </Route>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
