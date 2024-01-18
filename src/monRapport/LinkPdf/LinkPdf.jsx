import { PDFDownloadLink } from "@react-pdf/renderer";
import Rapport from "../../rapportPdf/Rapport";

const LinkPdf = ({
  setDataLoading,
  idRapport,
  dataSend,
  dataInfoPdf,
  dataInterPdf,
  infoInter,
}) => {
  return (
    <div className="link-pdf">
      <PDFDownloadLink
        document={
          <Rapport
            idRapport={idRapport}
            dataLoading={setDataLoading}
            dataSend={dataSend}
            dataInfoPdf={dataInfoPdf}
            dataInterPdf={dataInterPdf}
          />
        }
        fileName={`${infoInter.informationIntervention.client} ${infoInter.informationIntervention.reference} ${infoInter.informationIntervention.dateIntervention}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Chargement du document" : "Telecharger document!"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default LinkPdf;
