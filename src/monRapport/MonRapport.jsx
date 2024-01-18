import React, { memo } from "react";
import { useState } from "react";
import BodyRapport2 from "./bodyRapport2";
import "./monRapport.scss";
import ModalRef from "./ModalRef";
import Loader from "../loader/Loader";
import ModalUploadData from "../modalUploadData/ModalUploadData";
import FormInfoInter from "./formInfoInter/FormInfoInter";
import LinkPdf from "./LinkPdf/LinkPdf";
import { UseGetMonRapport } from "./Hook/getMonRapport";

const MonRapport = () => {

  const [refIsNull, setRefIsNull] = useState(false);
  const {
    dataInterPdf,
    dataInfoPdf,
    dataInter,
    dataLoading,
    containFile,
    infoInter,
    setDataInter,
    setInfoInter,
    setDataLoading,
    idRapport,
    dataSend,
    setContainFile,
    docIsCreated,
    infoUploadData,
    uploadSuccess,
    openModalUpload,
    updateOrAddReport ,
    setUrlFirebaseLoaded
  } = UseGetMonRapport();


  // const [dataInfoInter,setDataInfoInter] = useState(dataIntervention)

  return (
    <div className="blocCreateRapport">
      <div className="sectionCreateRapport">
        <h1 className="titleMonRapport">Rapport d'intervention</h1>
      </div>
      {refIsNull && <ModalRef setRefIsNull={setRefIsNull} />}
      <FormInfoInter
        infoInter={infoInter}
        setInfoInter={setInfoInter}
        containFile={containFile}
        setContainFile={setContainFile}
        setRefIsNull={setRefIsNull}
        setDataLoading={setDataLoading}
        docIsCreated={docIsCreated}
        updateOrAddReport={updateOrAddReport}
        dataInter={dataInter}
        setDataInter={setDataInter}
        setUrlFirebaseLoaded={setUrlFirebaseLoaded}
      >
        <BodyRapport2
          infoInter={infoInter}
          dataInter={dataInter}
          setDataInter={setDataInter}
          setContainFile={setContainFile}
          containFile={containFile}
        />
      </FormInfoInter>
      <LinkPdf
        idRapport={idRapport}
        setDataLoading={setDataLoading}
        dataSend={dataSend}
        dataInfoPdf={dataInfoPdf}
        dataInterPdf={dataInterPdf}
        infoInter={infoInter}
      />
      {/* { <PDFViewer><Rapport idRapport={idRapport} dataLoading={setDataLoading} dataSend={dataSend} dataInfoPdf={dataInfoPdf} dataInterPdf={dataInterPdf} /></PDFViewer>  }  */}

      {!dataLoading && <Loader />}
      {openModalUpload && (
        <ModalUploadData
          uploadSuccess={uploadSuccess}
          infoUploadData={infoUploadData}
        />
      )}
    </div>
  );
};

export default memo(MonRapport);
