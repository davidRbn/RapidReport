import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeRapports.scss";
import ModalDelete from "../modalDelete/ModalDelete";
import Loader from "../loader/Loader";
import imageMaison from "../image/imageMaison.jpg";
import { UseGetRapport } from "./getRapport";
import { getDate } from "./dateConfig";
import Header from "../Header/Header";

const HomeRapports = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idDocument, setIdDocument] = useState("");
  const [refRapport, setRefRapport] = useState("");
  const [dataInterDelete, setDataInterDelete] = useState({});
  const { getRapports, rapports, dataIsLoading } = UseGetRapport();

  const accessMyReport = (e, idDoc) => {
    e.preventDefault();

    navigate("mon-rapport", {
      state: {
        idDoc,
        docIsCreated: true,
        getRapport: true,
      },
    });
  };

  useEffect(() => {
    getRapports();
  }, [getRapports, rapports]);

  return (
    <div>
     <Header/>
      <div>
        <button
          className="btn-create-rapport"
          onClick={(e) => {
            navigate("mon-rapport", {
              state: { docIsCreated: false, idDoc: "" },
            });
          }}
        >
          Créer un nouveau rapport
        </button>
      </div>
      <div className="all-rapports">
        {[...rapports]
          .sort((a, b) => {
            // Convertissez les dates en objets Date pour la comparaison
            const dateA = new Date(
              a.infoInter.informationIntervention.dateIntervention
            );
            const dateB = new Date(
              b.infoInter.informationIntervention.dateIntervention
            );

            // Triez par ordre croissant (le plus ancien en premier)
            return dateB - dateA;
          })
          .map((data, key) => {
            return (
              <div key={key}>
                <div className="bloc-rapports">
                  <div
                    className={
                      data.infoInter.informationIntervention.rapportFini
                        ? "list-rapports-interFini"
                        : "list-rapports"
                    }
                    onClick={(e) => accessMyReport(e, data.idDoc)}
                  >
                    <div className="bloc-mage-infoInter-home">
                      {data.dataInter
                        .filter(
                          (dataInter) => dataInter.section === "vueGlobale"
                        )
                        .map((img, index) =>
                          img.image.length > 0 ? (
                            <div key={index}>
                              <img
                                className="image-homeRapport"
                                src={img.image[0].url}
                                alt="vue immeuble"
                              />
                            </div>
                          ) : (
                            <div key={index}>
                              <img
                                className="image-homeRapport"
                                src={imageMaison}
                                alt="vue immeuble"
                              />
                            </div>
                          )
                        )}

                      <div className="text-infoInter-home">
                        <p>{data.infoInter.informationIntervention.client}</p>
                        <p>
                          {" "}
                          {
                            data.infoInter.informationIntervention.reference
                          }{" "}
                        </p>
                        <p>
                          {getDate(
                            data.infoInter.informationIntervention
                              .dateIntervention
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="btn-delete-home"
                    onClick={(e) => {
                      e.preventDefault();
                      setIdDocument(data.idDoc);
                      setRefRapport(
                        data.infoInter.informationIntervention.reference
                      );
                      setDataInterDelete(data);
                      setModalIsOpen(true);
                    }}
                  >
                    X
                  </p>
                </div>
              </div>
            );
          })}

        {modalIsOpen && (
          <ModalDelete
            setModalIsOpen={setModalIsOpen}
            idDoc={idDocument}
            dataInterDelete={dataInterDelete}
            refRapport={refRapport}
            typeDelete={"le rapport"}
          />
        )}
        {!dataIsLoading && <Loader />}
      </div>
    </div>
  );
};

export default HomeRapports;
