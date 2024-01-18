import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authContext/AuthContext";
import { dataIntervention } from "../dataIntervention";
import { useLocation } from "react-router-dom";
import RapportDataService from "../../rapportDataService/RapportDataService";

export const UseGetMonRapport = () => {
  const location = useLocation();
  const [idRapport, setIdRapport] = useState(location.state.idDoc);
  const [dataInterPdf, setDataInterPdf] = useState([]);
  const [dataInfoPdf, setDataInfoPdf] = useState({});
  const { user } = useContext(AuthContext);
  const [dataInter, setDataInter] = useState(dataIntervention);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSend, setDataSend] = useState(false);
  const [containFile, setContainFile] = useState(0);
  const [urlFirebaseLoaded, setUrlFirebaseLoaded] = useState(false);
  const [docIsCreated, setDocIsCreated] = useState(location.state.docIsCreated);
  const [infoUploadData, setInfoUploadData] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);


  const [infoInter, setInfoInter] = useState({
    uid: `${user.uid}`,
    informationIntervention: {
      client: "",
      reference: "",
      vosReference: "",
      copro: "",
      franchise: "",
      contact: "",
      nomSinistre: "",
      lieuIntervention: "",
      dateIntervention: "",
      dateRapport: "",
      intervenant: "",
      typeDeBien: "",
      etage: "",
      situation: "",
      rapportFini: false,
    },
  }); //retirer infoInter.info... et remetre {}

  const getRapport = async () => {
    const res = await RapportDataService.getRapport(idRapport);
    setDataInfoPdf(res.data().infoInter.informationIntervention);
    setDataInterPdf(res.data().dataInter);
    setInfoInter(res.data().infoInter);
    setDataInter(res.data().dataInter);
    setDataLoading(true);

    // console.log(res.data())
    setDataSend(false);
    setContainFile(0);
  };

  useEffect(() => {
    (dataSend || location.state.getRapport) && getRapport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSend]);

  const updateOrAddReport = async () => {
    const data = { infoInter, dataInter };

    setInfoInter({ ...infoInter, uid: user.uid });

    docIsCreated
      ? await RapportDataService.updateRapport(idRapport, data)
          .then(() => {
            setDataSend(true);
            console.log("envoyé");
            setDataLoading(true);
            setDocIsCreated(true);
            setUrlFirebaseLoaded(false);
            setInfoUploadData("Le rapport a été enregistré avec succès");
            setUploadSuccess(true);
            setOpenModalUpload(true);

            setTimeout(() => {
              setOpenModalUpload(false);
            }, 3000);
          })
          .catch((error) => {
            setDataLoading(true);
            setUploadSuccess(false);
            setInfoUploadData(
              "Une erreur est survenue lors du telechargement du rapport"
            );
            setOpenModalUpload(true);
            setTimeout(() => {
              setOpenModalUpload(false);
            }, 3000);
            console.log(error);
          })
      : await RapportDataService.addRapports(data)
          .then((res) => {
            setIdRapport(res.id);
            setDataSend(true);
            console.log("envoyé");
            setDataLoading(true);
            setDocIsCreated(true);
            setUrlFirebaseLoaded(false);
            setInfoUploadData("Le rapport a été enregistré avec succès");

            setUploadSuccess(true);
            setOpenModalUpload(true);

            setTimeout(() => {
              setOpenModalUpload(false);
            }, 3000);
          })
          .catch((error) => {
            setUploadSuccess(false);
            setInfoUploadData(
              "Une erreur est survenue lors de l'enregistrement du rapport"
            );
            setOpenModalUpload(true);
            setTimeout(() => {
              setOpenModalUpload(false);
            }, 3000);
            console.log(error);
          });
  };

  useEffect(() => {
    urlFirebaseLoaded && updateOrAddReport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlFirebaseLoaded]);

  return {
    setIdRapport,
    dataInterPdf,
    dataInfoPdf,
    dataInter,
    dataLoading,
    containFile,
    infoInter,
    idRapport,
    dataSend,
    setContainFile,
    setDataInter,
    setInfoInter,
    setDataSend,
    setDataLoading,
    docIsCreated,
    infoUploadData,
    uploadSuccess,
    openModalUpload,
    updateOrAddReport,
    setUrlFirebaseLoaded


  };
};
