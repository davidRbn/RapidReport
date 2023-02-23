import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import RapportDataService from "../rapportDataService/RapportDataService";
import Rapport from "../rapportPdf/Rapport";
import { dataIntervention } from "./dataIntervention";
import BodyRapport2 from "./bodyRapport2";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import './monRapport.css'







const MonRapport = () => {

    const user = useContext(AuthContext)
    const [dataLoading,setDataLoading] = useState(false)
    const [idRapport, setIdRapport] = useState("")
    const [dataSend,setDataSend] = useState(false)
    const [dataInterPdf,setDataInterPdf] = useState([])
    const storage = getStorage();
    const storageRef = ref(storage);
    const [urlFirebaseLoaded,setUrlFirebaseLoaded] = useState(false)    
    // const [dataInfoInter,setDataInfoInter] = useState(dataIntervention)
    const [infoInter, setInfoInter] = useState({
        uid: user.user.uid,       
        informationIntervention : {
             client : "",
             reference: "",
             vosReference: "",
             franchise: "",
             contact : "",
             nomSinistre:"",
             lieuIntervention : "",
             dateIntervention: "",
             intervenant:"",
             typeDeBien : "",
             etage: "",
             situation:""
        }
     
    })
    const [dataInfoPdf,setDataInfoPdf] = useState(infoInter.informationIntervention) //retirer infoInter.info... et remetre {}

  const [dataInter, setDataInter] = useState(dataIntervention)


  const handleUploadStorageImage = async () => {

    let promisesImages = []
    let numberImage = []
    

   dataInter.forEach((data, indexData) => {
    
   data.image.forEach((image,indexImage) => {
    
   const path = `${image.file.name}`;
   // console.log(storageRef)
   const imageRef = ref(storageRef, path)


     const uploadTask = uploadBytesResumable(imageRef, image.file);
   numberImage.push(uploadTask)
   uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');

  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
    async () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  let promises = []

  const up = getDownloadURL(uploadTask.snapshot.ref)
   promises.push(up)
   promisesImages.push(up)

   await Promise.all(promises).then((res) => {

    setDataInter((prev) => prev.map((data, index) => {
      if (index === indexData) {     
        let neww = data.image.map((image, i) => {
       
             if (i === indexImage) {

               
               let dataImage = {...image,url : res[0]}
               delete dataImage['file']  
            return dataImage
               
                                    }
       
             else{ return { ...image }}

          
          
          })
          return { ...data, image: neww }

                  
      }
      else { return data }
     
    }
    ))




   })
     
 Promise.all(promisesImages).then((res) =>numberImage.length === res.length && setUrlFirebaseLoaded(true))

  })
}) 
}) 
}


const handleChangeInfoInter = (e,name) => {

    setInfoInter({...infoInter,informationIntervention :{...infoInter.informationIntervention ,[name] : e}})                              
    
    }



const submitInformationInter = (e) => {
e.preventDefault()


 handleUploadStorageImage()
   
}



const getRapport = async () => {

    const res = await RapportDataService.getRapport(idRapport)
    setDataInfoPdf(res.data().infoInter.informationIntervention)
    setDataInterPdf(res.data().dataInter)
    setDataLoading(true)
  console.log(res.data())
}
 

useEffect(() => {

dataSend && getRapport()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[dataSend])



const test = async () => {

    const data = {infoInter,dataInter}

    setInfoInter({...infoInter,uid : user.user.id})
    
    
    const res = await RapportDataService.addRapports(data)
    setIdRapport(res.id)
    setDataSend(true)
    console.log('envoyé')
    setDataLoading(true)

}


useEffect(() => {

urlFirebaseLoaded && test()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[urlFirebaseLoaded])



return(

    <>
    <h1>Mon rapport </h1>
    <form onSubmit={submitInformationInter}> 
      <div className="section-info-inter">
        <label >
            Client : 
            <input type ="text" name="client" value={infoInter.informationIntervention.client} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Nos références : 
            <input type="text" name="reference" value={infoInter.informationIntervention.reference} onChange={e => handleChangeInfoInter(e.target.value,e.target.name) }/>
        </label>
        <label>
            Vos références : 
            <input type="text" name="vosReference" value={infoInter.informationIntervention.vosReference} onChange={e => handleChangeInfoInter(e.target.value,e.target.name) }/>
        </label>
        <label>
            Franchise : 
            <input type="text" name="franchise" value={infoInter.informationIntervention.franchise} onChange={e => handleChangeInfoInter(e.target.value,e.target.name) }/>
        </label>
        <label>
            Contact : 
            <input type="text" name="contact" value={infoInter.informationIntervention.contact} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Nom du sinistré : 
            <input type="text" name="nomSinistre" value={infoInter.informationIntervention.nomSinistre} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Situation: 
            <input type="text" name="situation" value={infoInter.informationIntervention.situation} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Lieu de l'intervention : 
            <input type="text" name="lieuIntervention" value={infoInter.informationIntervention.lieuIntervention} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Date de l'intervention : 
            <input type="date" name="dateIntervention" value={infoInter.informationIntervention.dateIntervention} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Intervenant : 
            <input type="text" name="intervenant" value={infoInter.informationIntervention.intervenant} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Type de bien : 
            <input type="text" name="typeDeBien" value={infoInter.informationIntervention.typeDeBien} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
        <label>
            Etage : 
            <input type="text" name="etage" value={infoInter.informationIntervention.etage} onChange={e => handleChangeInfoInter(e.target.value,e.target.name)}/>
        </label>
           </div>
        <BodyRapport2 dataInter={dataInter} setDataInter={setDataInter}/>
         {/* <BodyRapport dataInter={dataInter} setDataInter={setDataInter}/> */}
         <input type="submit" value="Enregister" onClick={e => console.log('hello')}/>
    </form>
    {dataLoading ?
     <PDFDownloadLink document={<Rapport idRapport={idRapport} dataLoading={setDataLoading} dataSend={dataSend} dataInfoPdf={dataInfoPdf} dataInterPdf={dataInterPdf} />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>(
        loading ? 'Loading document...' : 'Download now!')
     }
    </PDFDownloadLink>:""
}
 {/* { <PDFViewer><Rapport idRapport={idRapport} dataLoading={setDataLoading} dataSend={dataSend} dataInfoPdf={dataInfoPdf} dataInterPdf={dataInterPdf} /></PDFViewer>  }  */}
    
    
    
    
    </>
)




}

export default MonRapport