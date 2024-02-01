import "./SignOut.scss";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <>
      <div>
        <button onClick={handleSignOut} className="btn-signOut">
          <span className="icon-signOut"></span>
        </button>
      </div>
    </>
  );
};

export default SignOut;
