import "./App.css";
import app from "./firebase/Firebase.jsx";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import Router from "./router/Router.jsx";

const db = getFirestore(app);

async function getUser(db) {
  const user = collection(db, "Utilisateurs");
  const getdocUser = await getDocs(user);
  // const userList = getdocUser.docs.map(doc=>doc.data())
  return getdocUser;
}

getUser(db);

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
