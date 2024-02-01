import { Navigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
