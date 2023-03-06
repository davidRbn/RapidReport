import React from "react";
import './modalRef.css'




const ModalRef = ({setRefIsNull}) => {




    return (

        <div className="blocModalRef">

            <p>Merci de renseigner le champs nos référence ! </p>
               <button onClick={e => {e.preventDefault()
                                      setRefIsNull(false)       
               }}>Fermer</button>
        </div>

    )
}

export default ModalRef