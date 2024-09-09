import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Home from "./Home";
import RankAll from "./components/RankAll";
import RankCountry from "./components/RankCountry";
import Login from "./User/Login";
import Register from "./User/Register";
import Factors from "./Factors";
// import Rankings from "./Rankings";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings">
            <Route index element={<RankAll />} />
            <Route path=":id" element={<RankCountry />} />
          </Route>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/factors" element={<Factors />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
