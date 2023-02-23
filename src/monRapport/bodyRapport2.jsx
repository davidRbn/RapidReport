import React from "react";
// import { getStorage, ref } from "firebase/storage";
import './bodyRapport.css'
// import { dataIntervention } from "./dataIntervention";







const BodyRapport2 = ({dataInter,setDataInter}) => {

  // const storage = getStorage();
  // const storageRef = ref(storage);



  const handleUpload = (indexData,newImage) => {



    const url =   URL.createObjectURL(newImage)

    setDataInter((prevState) => prevState.map((data, indexx) =>{
                     
                      if (indexx === indexData){
                        if(data.section === "miseEnPression"){

                          return {...data, image: [...data.image,{url : url,epreuve : "",finale : "", file : newImage}]}

                        }else{
                      return {...data, image:  [...data.image,{url : url,legende: "",file : newImage}]}                     
                        }       
                      }else return data

                    }))
  }

  const handleChange = (e,index) => {
  
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      handleUpload(index,newImage)
    }

    

  }

  


  const handleChangeInfoImage = (e, index, indexImage,name) => {

    
    const newDataInterImage = dataInter.map((data, i) => {
       if(name === 'epreuve' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, epreuve : e } : { ...image })
        return { ...data, image: neww }
         
       }else if (name === 'finale' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, finale : e } : { ...image })
        return { ...data, image: neww }
        
       }else if (name === 'reseau' && index === i){
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, reseau : e } : { ...image })
        return { ...data, image: neww }
        
       }
      else if (index === i) {
        const neww = data.image.map((image, i) => i === indexImage ? { ...image, legende: e } : { ...image })
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

  const handleChangeMoyen = (indexMoyen,index,name) => {

     const newDataMoyenUtilise = dataInter.map((data,i) => {

           if (index === i){
              
           const newData =  data.moyenTechnique.map((moyen,iMoyen) => indexMoyen === iMoyen ? {...moyen, [name] : !moyen.name} : {...moyen} )
            return {...data, moyenTechnique : newData }

           }else{
            return data
           }
       

     })

     setDataInter(newDataMoyenUtilise)

  }

  const deletedImage = (indexData,indexImage,url,e) => {

    e.preventDefault()
     
    const newDataInterImage = dataInter.map((data, i) => {
      if (indexData === i) {
       const neww = data.image.filter((im,ind) => im.url !== url )
       return { ...data, image: neww }
     }
     else { return data }
   }

   )
   setDataInter(newDataInterImage)
      

  }


  // dataInter.map(e => console.log(e.image))
  console.log(dataInter)
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
            <input type="file" onChange={e => handleChange(e,index)}/> 
          </div>
          
          
          <div className="sectionImageBody">


          {data.image.length > 0 && data.image.map((image, indexImage) => (

            
              <div key={indexImage}>
                <div className="sectionInfoImage">
                  <button onClick={(e) => deletedImage(index,e)}>Supprimer</button>
                  <img className="imageRapportBody" src={image.url} alt="" />
                </div>
              </div>
            


          ))
          }
        </div>
        </div>
         )   
          

        }else if (data.section === 'moyenTechnique'){
         
          
          return (
            <div key={index} className="separation" style={{backgroundColor:'#E0E0E0'}}>
            
            { data.moyenTechnique.map((moyen,indexMoyen) =>(

             <div className="blocMoyenTech" key={indexMoyen}>
                  <p className="moyenTech">{moyen.materielUtilise}  :</p>
                <label className="labelMoyenTechnique">
                  
                       <input className="checkBoxMoyen" type="checkbox"  checked={moyen.isUse} onChange={() => handleChangeMoyen(indexMoyen,index,"isUse")}/>
                         Utilisé
                         </label>
                          <label className="labelMoyenTechnique">
                  <input className="checkBoxMoyen"  type="checkbox"  checked={moyen.concluant} onChange={() => handleChangeMoyen(indexMoyen,index,"concluant")}/>
               Concluant
            </label>
          </div>
              
         


            )) 
               }
            </div> 
               )
             
        
      }else{

         return (
         <div key={index} className="separation" style={index % 2 === 0?{backgroundColor:'white'}:{backgroundColor:"#E0E0E0"}}>
          <div className="s-titre-des">
            <label className="titre-des">
              Titre :
              <input name='titre' type="text" defaultValue={data.titre} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
            </label>
            <label>
              <div> Description : </div>
              <textarea name='description' type="textarea" defaultValue={data.description} onChange={e => handleChangeInfoInter(e.target.value, index, e.target.name)} />
            </label>
          </div>
         
            <input type="file" onChange={e => handleChange(e,index)} multiple />
         
     
            <div className="sectionImageBody">


              {data.image.length > 0 && data.image.map((image, indexImage) => 
            
                
                  <div key={indexImage}>
                    <div className="sectionInfoImage">
                  <button onClick={(e) => deletedImage(index,indexImage,image.url,e)}>Supprimer</button>

                      <img className="imageRapportBody" src={image.url} alt="" />
                      
                     {data.section === "miseEnPression" ? 
                     <div key={index} >
                     <p>{indexImage % 2 === 0? `Réseau d'alimention eau froide `: `Réseau d'alimentation eau chaude`}</p>
                     <label className="labelMiseEnPression">
                    Réseau eau : 
                     <input className="inputInfoImage" name='reseau' type='text' defaultValue={image.reseau} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                     </label>
                     <label className="labelMiseEnPression">
                    Pression d'épreuve : 
                     <input className="inputInfoImage" name='epreuve' type='text' defaultValue={image.legende} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                     </label>
                     <label className="labelMiseEnPression">
                      Pression finale : 
                     <input className="inputInfoImage" name='finale' type='text' defaultValue={image.legende} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage,e.target.name)} />

                     </label>
                      </div>
                     : 
                     <div key={index}>

                     <input className="inputInfoImage" type='text' defaultValue={image.legende} onChange={e => handleChangeInfoImage(e.target.value, index, indexImage)} />
                          
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