import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import History from "./historyImage.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/history/:ImageResize2" element={<History />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);

