import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Home from "./Home";

function Rankings() {
  return (
    <>
      <h1>Hi from Rankings</h1>
    </>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
