import React from "react";
import "./modalDelete.scss";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { UseGetRapport } from "../homeRapport/getRapport";
import RapportDataService from "../rapportDataService/RapportDataService";

const ModalDelete = ({
  typeDelete,
  setModalIsOpen,
  idDoc,
  refRapport,
  dataInterDelete,
}) => {
  const { getRapports } = UseGetRapport();

  const deleteReport = async (e, idDoc, refRapport, dataInterDelete) => {
    e.preventDefault();

    const storage = getStorage();

    dataInterDelete.dataInter
      .filter((data) => data.image.length > 0)
      .forEach((data) => {
        data.image.forEach((image) => {
          const desertRef = ref(storage, `${refRapport}/${image.fileName}`);

          deleteObject(desertRef)
            .then(() => {
              console.log("image supprimé");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });

    await RapportDataService.deleteRapport(idDoc);
    setModalIsOpen(false);
    getRapports();
  };

  return (
    <div className="modal-delete">
      <div>
        <p>Etes vous sur de vouloir supprimer {typeDelete} ? </p>
      </div>
      <div>
        <button
          className="btn-modalDelete"
          onClick={(e) => deleteReport(e, idDoc, refRapport, dataInterDelete)}
        >
          Supprimer
        </button>

        <button
          className="btn-modalDelete"
          onClick={(e) => {
            e.preventDefault();
            setModalIsOpen(false);
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
