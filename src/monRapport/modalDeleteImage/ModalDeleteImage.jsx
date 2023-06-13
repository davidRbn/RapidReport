import React from 'react'
import '../../modalDelete/modalDelete.css'





const ModalDeleteImage = ({deletedImage,index,imageUrl,image,openModalImageDelete,setDeleteImage}) => {




    return (
<div className='modal-delete'>
      <div><p>Etes vous sur de vouloir supprimer l'image ? </p></div>
          <div>
            <button onClick={e => deletedImage(index,imageUrl,e,image) }>Supprimer</button>

            <button  onClick={e =>{
                                   e.preventDefault()
                                      setDeleteImage(false)}
            }>Annuler</button>
         </div>

</div>


    )
}


export default ModalDeleteImage