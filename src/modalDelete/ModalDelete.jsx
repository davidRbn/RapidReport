import React from 'react'
import './modalDelete.css'






const ModalDelete = ({typeDelete,setModalIsOpen,deleteReport,idDoc}) => {





    return (
<div className='modal-delete'>
      <div><p>Etes vous sur de vouloir supprimer {typeDelete} ? </p></div>
          <div>
            <button onClick={e => deleteReport(e,idDoc)}>Supprimer</button>

            <button  onClick={e => {e.preventDefault()
                                    setModalIsOpen(false)

            }}>Annuler</button>
         </div>

</div>


    )
}


export default ModalDelete