import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Home from "./Home";
import RankAll from "./components/RankAll";
import RankCountry from "./components/RankCountry";

// import Rankings from "./Rankings";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings">
            <Route index element={<RankAll />} />
            <Route path=":country" element={<RankCountry />} />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
