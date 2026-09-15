import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreativeServices from "./App";
import FullLanding from "./FullLanding";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FullLanding />} />
        <Route path="/creative-services" element={<CreativeServices />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
