import { useContext, useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import { db } from "../firebase/Firebase";
import RapportDataService from "../rapportDataService/RapportDataService";
import AuthContext from "../authContext/AuthContext";

export const UseGetRapport = () => {
  const [rapports, setRapports] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const getRapports = async (allAccessReport) => {
    if (allAccessReport) {
      const data = await RapportDataService.getAllRapports();
      setRapports(data.docs.map((doc) => ({ ...doc.data(), idDoc: doc.id })));
    } else {
      const data = await RapportDataService.getRapportUserId(user.uid);
      setRapports(data.docs.map((doc) => ({ ...doc.data(), idDoc: doc.id })));
      setDataIsLoading(true);
    }
  };

  const getInfoUser = async () => {
    if (user) {
      const userDoc = await query(
        collection(db, "Utilisateurs"),
        where("uid", "==", user.uid)
      );
      const userInfo = await getDocs(userDoc);
      const dataUser = userInfo.docs.map((doc) => ({ user, ...doc.data() }));
      const allAccessReport = dataUser[0].allAccessReport;

      getRapports(allAccessReport);
    }
  };

  useEffect(() => {
    getInfoUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = { getRapports, rapports, dataIsLoading };

  return values;
};
