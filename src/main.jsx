import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreativeServices from "./App";
import FullLanding from "./FullLanding";
import AudioPortal from "./AudioPortal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FullLanding />} />
        <Route path="/creative-services" element={<CreativeServices />} />
        <Route path="/journey-audio-portal" element={<AudioPortal />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
