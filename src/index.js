import React from "react";
// import ReactDOM from 'react-dom';
import "./index.scss";
import { createRoot } from "react-dom/client";
import "./pdf/globalStyles/globalStylesSass.scss";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
