import './App.css';
import app from './firebase/Firebase.jsx'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import Auth from './authentification/Auth';

const db = getFirestore(app)

async function getUser(db) {
  const user = collection(db, 'Utilisateurs')
  const getdocUser = await getDocs(user)
  // const userList = getdocUser.docs.map(doc=>doc.data())
  return getdocUser
}

getUser(db)

function App() {
  return (
    <>
     <Auth/>
{/* <PDFViewer><Rapport/></PDFViewer>  */}
    </>
  );
}

export default App;
