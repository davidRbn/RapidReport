import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc , where, query} from "firebase/firestore/lite";
import { db } from "../firebase/Firebase";

const rapportCollectionRef = collection(db, 'rapportsComplexe')

const RapportDataService = {


  addRapports : (newRapport) => {
    return addDoc(rapportCollectionRef, newRapport)
   },

   updateRapport : (id,updateRapport) => {
    const rapportDoc = doc(db, "rapportsComplexe",id)
    return updateDoc(rapportDoc, updateRapport)
   },

   deleteRapport : (id) => {
     const rapportDoc = doc(db, "books",id);
     return deleteDoc(rapportDoc)
   }

   ,getAllRapports : () => {
    return getDocs(rapportCollectionRef)
   }

   ,getRapport : (id) => {
    const rapportDoc = doc(db,"rapportsComplexe",id)
    return getDoc(rapportDoc)
   },

   getRapportUserId : (userId) => {
    const rapportDoc = query(collection(db,"rapportsComplexe"),where("uid", "==",userId))
    return getDocs(rapportDoc)

}

}

export default RapportDataService