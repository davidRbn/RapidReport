import React from 'react'
import './modalUploadData.css'








const ModalUploadData = ({uploadSuccess,infoUploadData}) => {




return (

            <>

                 <div className='container-modalUpload'>
                        <p className={uploadSuccess ? 'textUpload' : 'textError'} >{infoUploadData}</p>


                 </div>
            
            
            </>


)



}

export default ModalUploadData