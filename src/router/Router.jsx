import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "../authContext/AuthProvider";
import HomeRapports from "../homeRapport/HomeRapports";
import MonRapport from "../monRapport/MonRapport";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Auth from "../authentification/Auth";

const Router = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
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
  );
};

export default Router;
