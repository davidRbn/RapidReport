import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './bodyRapport.css'
// import { dataIntervention } from "./dataIntervention";
import { useEffect } from "react";







const BodyRapport = ({dataInter,setDataInter}) => {

  const storage = getStorage();
  const storageRef = ref(storage);
  const [file, setFile] = useState([]);
  const [url, setUrl] = useState([]);
  const [urlLoaded, setUrlLoaded] = useState(false)



  const handleChange = (e) => {
  
    setFile([])
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFile((prevState) => [...prevState, newImage]);
    }

  }

  const handleUpload = (e, indexData) => {
    e.preventDefault();
    setUrl([])


    file.map(async (e, index) => {



      const path = `${e.name}`;
      // console.log(storageRef)
      const imageRef = ref(storageRef, path)

      await uploadBytes(imageRef, e).then((snapshot) => {
        console.log('Uploaded file')
        console.log(snapshot)

      })
    

      await getDownloadURL(imageRef).then((urls) => {

        
       setDataInter((prevState) => prevState.map((data, indexx) =>{

        if (indexx === indexData){
                 
        return {...data, image:  [...data.image,{url : urls,legende: ""}]}
        }

       else{

          return data

        }
}

        ))
       
     
      })
      
      .finally(() => {

        setUrlLoaded(true)

      })

    })

   
    setFile(null);
  }


  const addNumberPhoto = () => {
    
    let photoNumber = 0


    const newDataInterImage = dataInter.map((data, i) => {
      if (data.image.length > 0) {
          const neww =  data.image.map((image) => {      
            
            photoNumber = photoNumber + 1
   
          return {...image,photoNumber: photoNumber }    
            
        })
        return { ...data, image: neww }
      }
      else { return data }
    }
  
    )
    setDataInter(newDataInterImage)
        setUrlLoaded(false)
  }

  useEffect(() => {

urlLoaded && addNumberPhoto()


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLoaded])





  const handleChangeInfoImage = (e, urlImage, index, indexImage) => {

    
    const newDataInterImage = dataInter.map((data, i) => {
      if (index === i) {
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



  // dataInter.map(e => console.log(e.image))
  console.log(dataInter)
  // console.log(url)
  // console.log(urlLoaded)
  // console.log(legende)
  // console.log(url)
  // console.log(indexData)
 

  return (
    <>

      <div><h2>Mon intervention : </h2></div>


      {dataInter.map((data, index) =>

      (
        
          <div key={index}>
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
           
              <input type="file" onChange={handleChange} multiple />
              <button onClick={(e) => {
              handleUpload(e, index)
            }} disabled={!file} name='envoyer'>Envoyer</button>
           
       
              <div className="sectionImageBody">


                {data.image.length > 0 && data.image.map((image, indexImage) => (

                  
                    <div key={indexImage}>
                      <div className="sectionInfoImage">
                        <img className="imageRapportBody" src={image.url} alt="" />
                                 
                            <input className="inputInfoImage" type='text' defaultValue={image.legende} onChange={e => handleChangeInfoImage(e.target.value, url, index, indexImage)} />
                      </div>
                    </div>
                  


                ))
                }
              </div>
           
          </div>
        
      ))}

    </>
  )
}

export default BodyRapport