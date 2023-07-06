import React, { useEffect, useState } from "react";
// import { getStorage, ref } from "firebase/storage";
import './bodyRapport.css'
// import { dataIntervention } from "./dataIntervention";
// import Resizer from 'react-image-file-resizer'
import{ EXIF} from "exif-js";
import ModalDeleteImage from "./modalDeleteImage/ModalDeleteImage";







const BodyRapport2 = ({dataInter,setDataInter,setContainFile,containFile}) => {

  // const storage = getStorage();
  // const storageRef = ref(storage);
  const [deleteImage,setDeleteImage] = useState(false)
  const [indexRapport,setIndexRapport] = useState()
  const [infoImage,setInfoImage] = useState()
  const [urlImage,setUrlImage] = useState()
  const [pictureAddOrDelete,setPictureAddOrDelete] = useState(false)






  const handleChange = (e,index) => {
  
    // console.log(e.target)
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];

    EXIF.getData(newImage,function () {

        let orientation = EXIF.getTag(this, 'Orientation')

      //  console.log(orientation)
             
       if(orientation === undefined){
        orientation = 0 
       }

      //  const modifiedFile = new File([newImage], newImage.name, { type: newImage.type });

      // let deleteExifData = newImage
      // delete deleteExifData['exifdata']
       
console.log(newImage)

   handleUpload(index,newImage,orientation)


      // console.log(orientation)
  //     let dataImage = {...image,url : res[0],fileName: path}
  //     delete dataImage['file']  
  //  return dataImage

       
      })


        // Resizer.imageFileResizer(
        //   newImage,
        //   300,
        //   300,
        //   "JPEG",
        //   70,
        //   0,
        //   (uri) => {
         

        //   },
        //   "base64"
        // );
      

      
      // Compress.imageFileResizer(
      //   newImage,
      //   480,
      //   480,
      //   "JPEG",
      //   70,
      //   0,
      //   (uri) => {
      //      handleUpload(index,uri,newImage)         
      //   },
      //  "blob"

      // )
      // handleUpload(index,newImage)

    }

  }



  const addNumberPhotos = () => {


  let counter = 0;
  
    
    const newArrayNumberPhoto = dataInter.map((data) => {
        if (data.image.length > 0 && data.section !== 'vueGlobale') {
          const updatedImages = data.image.map((image) => {
            counter++
           let total = counter
          //  console.log(total)
            return { ...image, numberPhoto: `${total}` };
          });
          // console.log(updatedImages);
          return { ...data, image: updatedImages };
        } else {
          return data;
        }
      })

      setDataInter(newArrayNumberPhoto)
    
  
    counter = 0
    setPictureAddOrDelete(false)
    console.log('counter')
  };

  useEffect(() => {

    pictureAddOrDelete && addNumberPhotos()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pictureAddOrDelete])


  const handleUpload = async (indexData,newImage,imageOrientation) => {


    setContainFile((prevState) => prevState + 1)
   

    console.log(newImage)



    // const reader = new FileReader();

    // L'événement déclenché lorsque la lecture est complète
    // reader.onload = function (e) {
    //     // On change l'URL de l'image (base64)
    //     url = e.target.result
    // }

    // On lit le fichier "picture" uploadé
    //  reader.readAsDataURL(url)

// console.log(url)
    let url =   URL.createObjectURL(newImage)

     console.log(url)
     console.log(newImage)


    setDataInter((prevState) => prevState.map((data, indexx) =>{
                     
                      if (indexx === indexData){
                        if(data.section === "miseEnPression"){

                          return {...data, image: [...data.image,{url : url,epreuve : "",finale : "", file : newImage,orientationImage: imageOrientation}]}

                        }else{
                      return {...data, image:  [...data.image,{url : url,legende: "",file : newImage,orientationImage: imageOrientation}]}                     
                        }       
                      }else return data

                    }))

                    // addNumberPhotos()
                    setPictureAddOrDelete(true)

                  }  



  


  const handleChangeInfoImage = (e, index, indexImage,name) => {

    
    const newDataInterImage = dataInter.map((data, i) => {
       if(name === 'epreuve' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, [name] : e } : { ...image })
        return { ...data, image: neww }
         
       }else if (name === 'finale' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, [name] : e } : { ...image })
        return { ...data, image: neww }
        
       }else if (name === 'reseau' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, [name] : e } : { ...image })
        return { ...data, image: neww }
        
       }
      else if (index === i) {
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, [name] : e  } : { ...image })
        return { ...data, image: neww }
      }
      else { return data }
    }

    )
    setDataInter(newDataInterImage)

  }

  const handleChangeInfoInter = (e, index, name) => {

    const newDataInter = dataInter.map((data, i) =>

      index === i
        ? { ...data, [name]: e }
        : data


    )

    setDataInter(newDataInter)

  }

  const handleChangeMoyen = (indexMoyen,index,name,moyenValue) => {

     const newDataMoyenUtilise = dataInter.map((data,i) => {

           if (index === i){
              
           const newData =  data.moyenTechnique.map((moyen,iMoyen) => indexMoyen === iMoyen ? {...moyen, [name] : !moyenValue} : {...moyen} )
            return {...data, moyenTechnique : newData }

           }else{
            return data
           }
       

     })

     setDataInter(newDataMoyenUtilise)

  }

  const deletedImage = (indexData,url,e,image) => {

    e.preventDefault()


    image.file instanceof File && setContainFile(prevState => prevState - 1)

     
    const newDataInterImage = dataInter.map((data, i) => {
      if (indexData === i) {
       const neww = data.image.filter((im,ind) => im.url !== url )
       return { ...data, image: neww }
     }
     else { return data }
   }

   )
   setDataInter(newDataInterImage)
   setDeleteImage(false)
  //  addNumberPhotos()
  setPictureAddOrDelete(true)
  }

  const openModalImageDelete = (e) => {
  
          e.preventDefault()
          console.log(deleteImage)
          setDeleteImage(true)

  }


  // dataInter.map(e => console.log(e.image))
  console.log(dataInter)
  // console.log(pictureAddOrDelete)
  // console.log(url)
//   console.log(urlLoaded)
  // console.log(legende)
  // console.log(url)
  // console.log(indexData)
 

  return (
    <>
      <div><h2>Mon intervention : </h2></div>


      {dataInter.map((data, index) =>
      

      {
if (data.section === "vueGlobale"){
         return (
          <div key={index} className="separation">
         <div >
            <h3>{data.titre}</h3>
           <div>
            <label>Choisir image</label>
            <input accept="image/*" type="file" title='Choisir une image' onChange={e => handleChange(e,index)}/> 
            </div>
                  {/* <div>
                     <label>Prendre photo</label> 
                <     input accept="image/*" capture type="file" title='Prendre une photo' onChange={e => handleChange(e,index)}/> 
                   </div>
             */}
          </div>
          
          
          <div className="sectionImageBody">


          {data.image.length > 0 && data.image.map((image, indexImage) => (

            
              <div key={indexImage}>
                <div className="sectionInfoImage">
                  {/* <button className="btn-delete-image" onClick={(e) => deletedImage(index,image.url,e,image)}>Supprimer</button> */}
                  <button className="btn-delete-image" onClick={(e) => {
                                                                        openModalImageDelete(e)
                                                                        setIndexRapport(index)
                                                                        setInfoImage(image)
                                                                        setUrlImage(image.url)
                                                                        
                                                                                               }}>Supprimer</button>
                  {deleteImage && <ModalDeleteImage openModalImageDelete={openModalImageDelete} deletedImage={deletedImage} index={indexRapport} imageUrl={urlImage} image={infoImage} setDeleteImage={setDeleteImage}/>}
                  <div className="blocImageRapportBody">
                      <img  className="imageRapportBody" src={image.url} alt="" /> 
                      </div> 
                </div>
              </div>
            


          ))
          }
        </div>
        </div>
         )   
          
}else if (data.section === 'moyenTechnique'){
         
          
          return (
            <div key={index} className="separation">
            
            { data.moyenTechnique.map((moyen,indexMoyen) =>(

             <div className="blocMoyenTech" key={indexMoyen}>
                  <p className="moyenTech">{moyen.materielUtilise}  :</p>
                <label className="labelMoyenTechnique">
                  
                       <input className="checkBoxMoyen" type="checkbox"  checked={moyen.isUse} onChange={() => handleChangeMoyen(indexMoyen,index,"isUse",moyen.isUse)}/>
                         Utilisé
                         </label>
                          {/* <label className="labelMoyenTechnique">
                  <input className="checkBoxMoyen"  type="checkbox"  checked={moyen.concluant} onChange={() => handleChangeMoyen(indexMoyen,index,"concluant",moyen.concluant)}/>
               Concluant
            </label> */}
          </div>
              
         


            )) 
               }
            </div> 
               )
             
        
}else{

         return (
         <div key={index} className="separation">
              <h3 className="title-des">{data.titre}</h3>
          <div className="s-titre-des">
            <label className="titre-des">
              Titre :
              <input disabled={data.section === 'miseEnPression' || data.section === "conclusion"? true : false} name='titre' type="text" value={data.titre} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
              
            </label>
            <label>
              <div> Description : </div>
              <textarea name='description' type="textarea" maxLength={data.section === "conclusion" || data.section === "investigations" || data.section === "constatations" ? 100000 : 730} value={data.description} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
            </label>
          </div>
          <div>
             <label>Choisir image</label>
            <input accept="image/*" type="file" title='Choisir une image' onChange={e => handleChange(e,index)} multiple />
            </div>
            <div>
                  {/* <label>Prendre photo</label>
                    <input accept="image/*" type="file" title='Prendre une photo' capture onChange={e => handleChange(e,index)} /> */}
            </div>       

         
     
            <div className="sectionImageBody">


              {data.image.length > 0 && data.image.map((image, indexImage) => 
            
                
                  <div key={indexImage}>
                    <div className="sectionInfoImage">
                  {/* <button className="btn-delete-image" onClick={(e) => deletedImage(index,image.url,e,image)}>Supprimer</button> */}
                  <button className="btn-delete-image" onClick={(e) => {
                                                                        openModalImageDelete(e)
                                                                        setIndexRapport(index)
                                                                        setInfoImage(image)
                                                                        setUrlImage(image.url)
                                                                        
                                                                                               }}>Supprimer</button>
                               <p>Photo N° {image.numberPhoto}</p>                                                                
                  {deleteImage && <ModalDeleteImage openModalImageDelete={openModalImageDelete} deletedImage={deletedImage} index={indexRapport} imageUrl={urlImage} image={infoImage} setDeleteImage={setDeleteImage}/>}
                    
                    <div className="blocImageRapportBody">
                      <img  className="imageRapportBody" src={image.url} alt="" /> 
                      </div> 
                      
                     {data.section === "miseEnPression" ? 
                     <div className="section-misePression" key={index} >
                         <p>Réseau d'alimention d'eau {image.reseau}</p>
                           <label className="labelMiseEnPression">
                                Réseau eau : 
                                   <textarea className="inputInfoImage" name='reseau' type='text' value={image.reseau} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                           </label>
                              <label className="labelMiseEnPression">
                                  Pression d'épreuve : 
                         <input className="inputInfoImage" name='epreuve' type='text' value={image.epreuve} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                     </label>
                           <label className="labelMiseEnPression">
                                Pression finale : 
                            <input className="inputInfoImage" name='finale' type='text' value={image.finale} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                     </label>
                      </div>
                     : 
                     <div key={index}>

                     <textarea className="inputInfoImage" name='legende' type='text' maxLength={95} value={image.legende} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                   {/* <div>     
                     <label className="labelMoyenTechnique">
                     Grande image :  
                 <input className="checkBoxGrandeImage" type="checkbox"  checked={image.bigPicture ? image.bigPicture : false } onChange={() => handleChangeInfoImage(image.bigPicture ? !image.bigPicture : true,index, indexImage,'bigPicture')}/>
                 
                    </label>
                    </div>   */}
                     </div>

                     
                     
                    }                          
                    </div>
                  </div>
                


              )
              }
            </div>
         
        </div>)
          
        }
        
         
        
              })}

    </>
  )
}

export default BodyRapport2