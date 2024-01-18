import React from "react";
import "../../modalDelete/modalDelete.scss";

const ModalDeleteImage = ({
  deletedImage,
  index,
  imageUrl,
  image,
  openModalImageDelete,
  setDeleteImage,
  infoInter,
}) => {
  return (
    <div className="modal-delete">
      <div>
        <p>Etes vous sur de vouloir supprimer l'image ? </p>
      </div>
      <div>
        <button
          className="btn-modalDelete"
          onClick={(e) => deletedImage(index, imageUrl, e, image, infoInter)}
        >
          Supprimer
        </button>

        <button
          className="btn-modalDelete"
          onClick={(e) => {
            e.preventDefault();
            setDeleteImage(false);
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteImage;
