import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoadingData(false);
        setUser(null);
      } else {
        navigate("mes-rapports");
        setUser(user);
        setLoadingData(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      {!loadingData && children}
    </AuthContext.Provider>
  );
};
