import React from "react";
// import ReactDOM from 'react-dom';
import "./index.scss";
import App from "./App";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthProvider";
import HomeRapports from "./homeRapport/HomeRapports";
import MonRapport from "./monRapport/MonRapport";
import { createRoot } from "react-dom/client";
import "./pdf/globalStyles/globalStylesSass.scss";
import PrivateRoute from "./privateRoute/PrivateRoute";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="my-reports"
            element={
              <PrivateRoute>
                <HomeRapports />
              </PrivateRoute>
            }
          />
          <Route
            path="my-reports/report"
            element={
              <PrivateRoute>
                <MonRapport />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
