import "../monRapport.scss";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const FormInfoInter = ({
  children,
  infoInter,
  setInfoInter,
  containFile,
  setContainFile,
  setRefIsNull,
  setDataLoading,
  docIsCreated,
  updateOrAddReport,
  dataInter,
  setDataInter,
  setUrlFirebaseLoaded
}) => {

  const storage = getStorage();
  const storageRef = ref(storage);
  
  const handleUploadStorageImage = async () => {
    let promisesImages = [];
    let numberImage = [];

    dataInter.forEach((data, indexData) => {
      data.image.forEach((image, indexImage) => {
        if (image.file) {
          const path = `${image.imageName}`;
          // console.log(storageRef)
          const imageRef = ref(
            storageRef,
            `${infoInter.informationIntervention.reference}/${path}`
          );

          const uploadTask = uploadBytesResumable(imageRef, image.file);
          numberImage.push(uploadTask);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error);
            },
            async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              let promises = [];

              const up = getDownloadURL(uploadTask.snapshot.ref);
              promises.push(up);
              promisesImages.push(up);

              await Promise.all(promises).then((res) => {
                setDataInter((prev) =>
                  prev.map((data, index) => {
                    if (index === indexData) {
                      let neww = data.image.map((image, i) => {
                        if (i === indexImage) {
                          let dataImage = {
                            ...image,
                            url: res[0],
                            fileName: path,
                          };
                          delete dataImage["file"];
                          return dataImage;
                        } else {
                          return { ...image };
                        }
                      });
                      return { ...data, image: neww };
                    } else {
                      return data;
                    }
                  })
                );
              });

              Promise.all(promisesImages).then(
                (res) =>
                  numberImage.length === res.length &&
                  setUrlFirebaseLoaded(true)
              );
            }
          );
        }
      });

      // setaDataLoading(false) ????????????????????????
    });
  };


  const handleChangeInfoInter = (e, name) => {
    setInfoInter({
      ...infoInter,
      informationIntervention: {
        ...infoInter.informationIntervention,
        [name]: e,
      },
    });
  };

  const submitInformationInter = (e) => {
    e.preventDefault();

    if (infoInter.informationIntervention.reference === "") {
      setRefIsNull(true);
    } else {
      if (containFile === 0) {
        updateOrAddReport();
        setDataLoading(false);
      } else {
        handleUploadStorageImage();
        setDataLoading(false);
      }
    }
  };
  return (
    <form onSubmit={submitInformationInter}>
      <div className="section-info-inter">
        <label>
          Client :
          <input
            type="text"
            name="client"
            value={infoInter.informationIntervention.client}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Nos références :
          <input
            type="text"
            name="reference"
            value={infoInter.informationIntervention.reference}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Nom copro :
          <input
            type="text"
            name="copro"
            value={infoInter.informationIntervention.copro}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Référence client :
          <input
            type="text"
            name="vosReference"
            value={infoInter.informationIntervention.vosReference}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>

        <label>
          Lieu intervention :
          <input
            type="text"
            name="lieuIntervention"
            value={infoInter.informationIntervention.lieuIntervention}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Date intervention :
          <input
            type="date"
            name="dateIntervention"
            value={infoInter.informationIntervention.dateIntervention}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Date du rapport :
          <input
            type="date"
            name="dateRapport"
            value={infoInter.informationIntervention.dateRapport}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label>
          Intervenant :
          <input
            type="text"
            name="intervenant"
            value={infoInter.informationIntervention.intervenant}
            onChange={(e) =>
              handleChangeInfoInter(e.target.value, e.target.name)
            }
          />
        </label>
        <label className="labelMoyenTechnique">
          Rapport terminé :
          <input
            className="checkBoxMoyen"
            type="checkbox"
            checked={infoInter.informationIntervention.rapportFini}
            onChange={() =>
              handleChangeInfoInter(
                !infoInter.informationIntervention.rapportFini,
                "rapportFini"
              )
            }
          />
        </label>
      </div>
      {children}
      <input
        className="buttonRegistrer"
        type="submit"
        value={docIsCreated ? "Modifier" : "Enregister"}
        onClick={(e) => console.log("hello")}
      />
    </form>
  );
};

export default FormInfoInter;
