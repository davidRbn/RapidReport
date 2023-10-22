import React, { useEffect, useState, memo } from "react";
// import { getStorage, ref } from "firebase/storage";
import './bodyRapport.css'
// import { dataIntervention } from "./dataIntervention";
// import Resizer from 'react-image-file-resizer'
import Resizer from "react-image-file-resizer";
// import{ EXIF} from "exif-js";
import ModalDeleteImage from "./modalDeleteImage/ModalDeleteImage";
import { deleteObject, getStorage, ref } from "firebase/storage";
// import ZoomImage from "./zoomImage/ZoomImage";
import ImageCanvas from "../imageCanvas/ImageCanvas";
// import EXIF from "exif-js";
// import imageCompression from 'browser-image-compression';
import Loader from "../loader/Loader";






const BodyRapport2 = ({dataInter,setDataInter,setContainFile,containFile,infoInter}) => {

  // const storage = getStorage();
  // const storageRef = ref(storage);
  const [deleteImage,setDeleteImage] = useState(false)
  const [indexRapport,setIndexRapport] = useState()
  const [infoImage,setInfoImage] = useState()
  const [urlImage,setUrlImage] = useState()
  const [pictureAddOrDelete,setPictureAddOrDelete] = useState(false)
  const [zoomImage,setZoomImage] = useState(false)
  const [indexImageZoom,setIndexImageZoom] = useState('')
  const [sectionIndexZoom,setSectionIndexZoom] = useState('')
  const [canvasImageLoaded,setCanvasImageLoaded] = useState(false)
  const selectSectionInter = [

    {label: 'autre' ,value: 'Autre' },
    {label: 'miseEnPression', value : 'Mise en pression'},
    {label:'arrosageTerrasse' ,value: 'Arrosage terrasse'}
                                ]
  
   const [valeurSelectionnee, setValeurSelectionnee] = useState('autre');


   const handleChange = async (e, index) => {

const fileArray =  Array.from(e.target.files)


const reverseFile = fileArray.reverse()

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = reverseFile[i];
      const imageName = `${newImage.name}${index}${i}`;
      let orientation = 0;
      let imageWidth = 0;
      let imageHeight = 0;
      // Lecture de l'image pour obtenir la largeur et la hauteur
      const img = new Image();
      img.src = URL.createObjectURL(newImage);
  
      await new Promise((resolve) => {
        img.onload = () => {
          imageWidth = img.width;
          imageHeight = img.height;
          resolve();
        };
      });
  
      // Redimensionnement de l'image
      const resizedImage = await new Promise((resolve) => {
        Resizer.imageFileResizer(
          newImage,
          1000,
          1000,
          "JPEG",
          90,
          0,
          (uri) => {
            resolve(uri);
          },
          "blob"
        );
      });
  
      // Appel à la fonction de téléchargement avec les données obtenues
      await handleUpload(index, resizedImage, orientation, imageName, imageWidth, imageHeight);
    }
  };
  


//   const handleChange = async (e,index) => {
  
//     // console.log(e.target)
//     for (let i = 0; i < e.target.files.length; i++) {
//       const newImage = e.target.files[i];
//       const imageName = newImage.name
//       let orientation = 0

//       let imageWidth = 0
//       let imageHeight = 0

// console.log(i,index);
//    const reader = new FileReader();
//     reader.onload =  (event) => {
//       const img = new Image();
//       img.src = event.target.result;

      

//         img.onload = () => {
//          imageWidth = img.width;
//          imageHeight = img.height;

//     console.log(i,index);

//         // Vous pouvez utiliser les valeurs de largeur et de hauteur comme vous le souhaitez
//       };
//     };

//     reader.readAsDataURL(newImage);
  
//     console.log(i,index);


//     // EXIF.getData(newImage,function () {

//     //     orientation = EXIF.getTag(this, 'Orientation')
//     //     console.log(orientation);

//     //       //  let orientation = 0  
//     //    if(orientation === undefined){
//     //     orientation = 0 
//     //    }
//     //   return orientation
//     //   })

//       //  await Resizer.imageFileResizer(
//       //   newImage,
//       //   1000,
//       //   1000,
//       //   "JPEG",
//       //   100,
//       //   0,
//       //   (uri) => {
                
//       //   },
//       //  "blob"

//       // )

//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       newImage,
//       1000,
//       1000,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(handleUpload(index,uri,orientation,imageName,imageWidth,imageHeight));
//     console.log(i,index);

//       },
//       "blob"
//     );
//   });



//       // const options = {
//       //   maxSizeMB: 0.7,
//       //   maxWidthOrHeight: 1920
//       // }
//       // try {
//       //   const compressedFile = await imageCompression(newImage, options);
//       //   handleUpload(index,compressedFile,orientation,imageName,imageWidth,imageHeight)  
//       //   console.log(compressedFile.size/1024/1024);
//       // } catch (error) {
//       //   console.log(error);
//       // }

//       //  const modifiedFile = new File([newImage], newImage.name, { type: newImage.type });

//       // let deleteExifData = newImage
//       // delete deleteExifData['exifdata']
       

//   //  handleUpload(index,newImage,orientation)


//       // console.log(orientation)
//   //     let dataImage = {...image,url : res[0],fileName: path}
//   //     delete dataImage['file']  
//   //  return dataImage

       
//       // })

//     }

//   }



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
  };

  useEffect(() => {

    pictureAddOrDelete && addNumberPhotos()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pictureAddOrDelete])


  const handleUpload = async (indexData,newImage,imageOrientation,imageName,imageWidth,imageHeight) => {

console.log(imageOrientation)


    setContainFile((prevState) => prevState + 1)
   

    // console.log(newImage)



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

                          return {...data, image: [...data.image,{url : url,epreuve : "",finale : "", file : newImage,orientationImage: imageOrientation,imageName:imageName,imageWidth:imageWidth,imageHeight:imageHeight}]}

                        }else{
                      return {...data, image:  [...data.image,{url : url,legende: "",file : newImage,orientationImage: imageOrientation,imageName:imageName,imageWidth:imageWidth,imageHeight:imageHeight}]}                     
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


const mapForDeletedImage = (indexData,url) => {


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



  const deletedImage = (indexData,url,e,image,infoInter) => {

    e.preventDefault()

    const storage = getStorage()

    const refRapport = infoInter.informationIntervention.reference

    if(image.file instanceof Blob){

      setContainFile(prevState => prevState - 1)

      mapForDeletedImage(indexData,url)

    }else{


      const desertRef = ref(storage, `${refRapport}/${image.fileName}`);

      deleteObject(desertRef).then(() => {
  
          console.log('image supprimé');

      mapForDeletedImage(indexData,url)

  
      }).catch((error) => {

      mapForDeletedImage(indexData,url)
          console.log(error)
  
      })

         }

    // image.file instanceof Blob && setContainFile(prevState => prevState - 1)


  }

  const openModalImageDelete = (e) => {
  
          e.preventDefault()
          // console.log(deleteImage)
          setDeleteImage(true)

  }


  const moveImageUp = (e,index,indexImage,image) => {

e.preventDefault()

    let imageMove = image.slice(indexImage,indexImage + 1)
    let imageRemplaced = image.slice(indexImage - 1,indexImage)


    const newData = dataInter.map((data,currentIndex) => {

       if(currentIndex  === index){

          const newDataImage = data.image.map((image,currentIndexImage) => {

                if(currentIndexImage === indexImage){

                  return  imageRemplaced[0]

                }else if(currentIndexImage === indexImage - 1){

                  return imageMove[0]
                }else return image
          })

        return {...data,image : newDataImage}

       }else return data 

    })

setDataInter(newData)
setPictureAddOrDelete(true)

 }




 const moveImageDown = (e,index,indexImage,image) => {

  e.preventDefault()

  
      let imageMove = image.slice(indexImage,indexImage + 1)
      let imageRemplaced = image.slice(indexImage + 1,indexImage + 2)
  
  
      const newData = dataInter.map((data,currentIndex) => {
  
         if(currentIndex  === index){
  
            const newDataImage = data.image.map((image,currentIndexImage) => {
  
                  if(currentIndexImage === indexImage){
  
                    return  imageRemplaced[0]
  
                  }else if(currentIndexImage === indexImage + 1){
  
                    return imageMove[0]
                  }else return image
            })
  
          return {...data,image : newDataImage}
  
         }else return data 
  
      })
  
  setDataInter(newData)
  setPictureAddOrDelete(true)

   }

 
   const sectionMoveUp = (e,index,data) => {

    e.preventDefault()


    let dataMove = dataInter.slice(index,index + 1)
    let dataRemplaced = dataInter.slice(index - 1,index)

    const newData = dataInter.map((interData,currentIndex) => {

        if(index === currentIndex){

          return dataRemplaced[0]

        }else if (currentIndex === index - 1){

         return dataMove[0]

        }else return interData


    } )
      setDataInter(newData)
      setPictureAddOrDelete(true)

   }

   const sectionMoveDown = (e,index,data) => {

    e.preventDefault()


    let dataMove = dataInter.slice(index,index + 1)
    let dataRemplaced = dataInter.slice(index + 1,index + 2)

    const newData = dataInter.map((interData,currentIndex) => {

        if(index === currentIndex){

          return dataRemplaced[0]

        }else if (currentIndex === index + 1){

         return dataMove[0]

        }else return interData


    } )
      setDataInter(newData)
      setPictureAddOrDelete(true)

   }

   const handleSelectionSection = (e) => {

setValeurSelectionnee(e.target.value)

   }

   const selectInterSection = (e) => {

         
    e.preventDefault()


        let title = ''

 switch(valeurSelectionnee){
      case 'miseEnPression' : 
          title = 'Mise en pression'
       break;
       case 'arrosageTerrasse' : 
            title = "Arrosage terrasse"
       break;
       default : title = 'autre'
 }

       const newSection = {

          section : valeurSelectionnee,
          titre : title,
          description : '',
          image : []
        }

        setDataInter([...dataInter,newSection])
   }


  // dataInter.map(e => console.log(e.image))
  // console.log(dataInter)
  // console.log(valeurSelectionnee)
  // console.log(url)
//   console.log(urlLoaded)
  // console.log(legende)
  // console.log(url)
  // console.log(containFile)
 

  return (
    <>

    {/* <ImageCanvas/> */}
      <div><h2 className="title-intervention">Mon intervention</h2></div>


      {dataInter.map((data, index) =>
      

      {
if (data.section === "vueGlobale"){
         return (
          <div key={index} className="separation">
         <div >
            <h3 className="title-des">{data.titre}</h3>
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
                                                                        
                                                                                               }}>X</button>
                  {deleteImage && <ModalDeleteImage infoInter={infoInter} openModalImageDelete={openModalImageDelete} deletedImage={deletedImage} index={indexRapport} imageUrl={urlImage} image={infoImage} setDeleteImage={setDeleteImage}/>}
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

moyen.materielUtilise.length !== 0 &&
          
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

              <div className="bloc-btn-ChangePlaceSection">

              { index < 5 || index === 5 ? '' :  <button className="btnChangePlaceSection-up" onClick={(e) => sectionMoveUp(e,index,data)}>{`<`}</button>}
                                 
              { index === dataInter.length - 1 || index < 5  ? '' : <button className="btnChangePlaceSection-down" onClick={(e) => sectionMoveDown(e,index,data)}>{`>`}</button>}
             
               </div>

          <div className="s-titre-des">
 
            <label className="titre-des">
              Titre :

              { data.section === "constatations" || data.section === "conclusion" || data.section === "investigations" || data.section === "miseEnPression" ?

""
:

<select onChange={e => handleChangeInfoInter(e.target.value,index,"titre")}>
         {dataInter.filter(data => data.section === "moyenTechnique").map((moyen) => (

          
           moyen.moyenTechnique.map((materiel,indexMateriel) => (


              <option key={indexMateriel} value={materiel.materielUtilise}>{materiel.materielUtilise}</option>

           ))      
                
         ))}
   </select>}
              <input className="input-title" disabled={data.section === 'miseEnPression' || data.section === "conclusion"? true : false} name='titre' type="text" value={data.titre} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
              
            </label>
            <label>
              <div> Description : </div>
              <textarea className="texttarea-description" name='description' type="textarea" maxLength={data.section === "conclusion" || data.section === "investigations" || data.section === "constatations" ? 100000 : data.section === 'arrosageTerrasse' ? 2090 : 730} value={data.description} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
            </label>
          </div>
       { (data.section !== "conclusion" && data.section !== "investigations") && <div>
             <label>Choisir image</label>
            <input accept="image/*" type="file" title='Choisir une image' onChange={e => handleChange(e,index)} multiple />
            </div>}
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
                                                                        
                                                                                               }}>X</button>
                               <p>Photo N° {image.numberPhoto}</p>                                                                
                  {deleteImage && <ModalDeleteImage openModalImageDelete={openModalImageDelete} infoInter={infoInter} deletedImage={deletedImage} index={indexRapport} imageUrl={urlImage} image={infoImage} setDeleteImage={setDeleteImage}/>}
                    
                    <div className="blocImageRapportBody">
                      <img  className="imageRapportBody" onClick={(e) => {
                          e.preventDefault()
                          setZoomImage(true)
                          setIndexImageZoom(indexImage)
                          setSectionIndexZoom(index)

                      }} src={image.url} alt="" /> 
                      
         {zoomImage && indexImage === indexImageZoom && index === sectionIndexZoom && <ImageCanvas setCanvasImageLoaded={setCanvasImageLoaded} setContainFile={setContainFile} dataInter={dataInter} setDataInter={setDataInter} index={index} indexImage={indexImage} urlImageZoom={image.url} imageWidth={image.imageWidth} imageHeight={image.imageHeight} urlZoom={indexImageZoom} setZoomImage={setZoomImage} zoomImage={zoomImage} />}
                     

                      </div> 
                             <div>
                                 { indexImage === 0 || data.image.length === 1 ? '' :  <button className="btnChangePlaceImage-up" onClick={(e) => moveImageUp(e,index,indexImage,data.image)}>{`<`}</button>}
                                 
                                 { indexImage === data.image.length - 1 || data.image.length === 1 ? '' : <button className="btnChangePlaceImage-down" onClick={(e) => moveImageDown(e,index,indexImage,data.image)}>{`>`}</button>}
                              
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

                  { data.image.length === 1 && <div>     
                     <label className="labelMoyenTechnique">
                     Grande image :  
                 <input className="checkBoxGrandeImage" type="checkbox"  checked={image.bigPicture ? image.bigPicture : false } onChange={() => handleChangeInfoImage(image.bigPicture ? !image.bigPicture : true,index, indexImage,'bigPicture')}/>
                 
                    </label>
                    </div> } 
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
        <div className="sectionSelectInter">

         <label>
              Selectionner une section : 
              <select onChange={handleSelectionSection}>
                    { selectSectionInter.map((select,indexSelect) => (

                        <option key={indexSelect} value={select.label}>{select.value}</option>
                           
                    ))}
              </select>

          </label>
          <button className="btn-select-inter" onClick={(e) => selectInterSection(e)}> Ajouter section</button>
         </div>   

     {canvasImageLoaded && <Loader/>}
    </>
  )
}

export default memo(BodyRapport2)