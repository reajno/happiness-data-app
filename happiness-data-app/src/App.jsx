import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Home from "./Home";
import RankAll from "./Rankings/RankAll";
import RankCountry from "./Rankings/RankCountry";
import RankYear from "./Rankings/RankYear";
import Login from "./User/Login";
import Register from "./User/Register";
import Factors from "./Factors";

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
            <Route path="country/:id" element={<RankCountry />}>
              <Route path="year/:year" element={<RankCountry />} />
            </Route>
            <Route path="year/:year" element={<RankYear />} />
          </Route>
          <Route path="/factors" element={<Factors />}></Route>
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
