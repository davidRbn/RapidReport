import React from "react";
import "./auth.scss";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Auth = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("davidruben14@gmail.com");
  const [password, setPassword] = useState(process.env.REACT_APP_MDP);
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  console.log(process.env.REACT_APP_MDP);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        const user = res.user;
        setUser(user);
        navigate("my-reports");
      });

      // console.log(user)
      return true;
    } catch (error) {
      return { error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setEmail("");
    // setPassword("");
    const res = await signIn(email, password);
    // console.log(res)
    if (res.error) setError(res.error);
  };
  return (
    <div style={{ position: "fixed", width: "100%" }}>
      <Header variant={"H1"}>RapidReport</Header>
      <div className="sectionAuth">
        <div className="auth">
          <h2>Connexion</h2>
          {error ? <p>{error}</p> : null}
          {/* {user && <Navigate to="/my-reports" replace={true} />} */}
          <form className="form-auth" onSubmit={handleSubmit}>
            <div>
              <input
                className="input-auth"
                type="text"
                name="email"
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="input-auth"
                type="password"
                name="password"
                value={password}
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                className="submit-auth"
                type="submit"
                value="Se connecter"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
