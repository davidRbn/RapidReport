import { useState } from "react";
import "../bodyRapport.scss";

const SelectInterSection = ({ setDataInter, dataInter }) => {
  const [valeurSelectionnee, setValeurSelectionnee] = useState("autre");
  const selectSectionInter = [
    { label: "autre", value: "Autre" },
    { label: "miseEnPression", value: "Mise en pression" },
    { label: "arrosageTerrasse", value: "Arrosage terrasse" },
  ];

  const selectInterSection = (e) => {
    e.preventDefault();

    let title = "";

    switch (valeurSelectionnee) {
      case "miseEnPression":
        title = "Mise en pression";
        break;
      case "arrosageTerrasse":
        title = "Arrosage terrasse";
        break;
      default:
        title = "autre";
    }

    const newSection = {
      section: valeurSelectionnee,
      titre: title,
      description: "",
      image: [],
    };

    setDataInter([...dataInter, newSection]);
  };

  const handleSelectionSection = (e) => {
    setValeurSelectionnee(e.target.value);
  };
  return (
    <div className="sectionSelectInter">
      <label>
        Selectionner une section :
        <select onChange={handleSelectionSection}>
          {selectSectionInter.map((select, indexSelect) => (
            <option key={indexSelect} value={select.label}>
              {select.value}
            </option>
          ))}
        </select>
      </label>
      <button
        className="btn-select-inter"
        onClick={(e) => selectInterSection(e)}
      >
        {" "}
        Ajouter section
      </button>
    </div>
  );
};

export default SelectInterSection;
