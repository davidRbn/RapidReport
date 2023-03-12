import React from "react";
import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import { useState } from "react";
import RapportDataService from "../rapportDataService/RapportDataService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection,getDocs,where, query} from "firebase/firestore/lite";
import { db } from "../firebase/Firebase";
import "./homeRapports.css"
import ModalDelete from "../modalDelete/ModalDelete";
import { getStorage, ref, deleteObject } from "firebase/storage";
// import {saveAs} from "file-saver";





const HomeRapports = () => {

    const { user } = useContext(AuthContext);
    const [rapports, setRapports] = useState([])
    const navigate = useNavigate()
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const [dataUserInfo,setDataUserInfo] = useState({})
    const [idDocument,setIdDocument] = useState('')
    const [refRapport,setRefRapport ] = useState('')
    const [dataInterDelete,setDataInterDelete] = useState({})


   const getRapports = async () => {
          
        
       if(dataUserInfo.allAccessReport){

        const data = await RapportDataService.getAllRapports()
        setRapports(data.docs.map((doc) => ({...doc.data(),idDoc : doc.id})))
             

       }
       
       else{

        const data = await RapportDataService.getRapportUserId(user.uid)
        setRapports(data.docs.map((doc) => ({...doc.data(),idDoc : doc.id})))

       }
           
    }
   
    const getInfoUser = async () => {

        const userDoc = await query(collection(db,"Utilisateurs"),where("uid","==",user.uid))
        const userInfo = await getDocs(userDoc)
       const dataUser = userInfo.docs.map((doc) => ({user,...doc.data()}))

       setDataUserInfo(dataUser[0])
 
       getRapports()
    
}
     
     useEffect(() =>{
        getInfoUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

// useEffect(() =>{
//    dataUserInfo && getRapports()
// },[rapports])


const accessMyReport = (e,idDoc) => {

    e.preventDefault()

    navigate("mon-rapport",{
        state:{
          idDoc,
          docIsCreated : true,
          getRapport: true
        }
    })
}


const deleteReport = async (e,idDoc,refRapport,dataInterDelete) => {

    e.preventDefault()

    const storage = getStorage()

    dataInterDelete.dataInter.filter(data => data.image.length > 0).forEach(data => {

        data.image.forEach(image => {

            const desertRef = ref(storage, `${refRapport}/${image.fileName}`);

            deleteObject(desertRef).then(() => {
        
                console.log('image supprimé');
        
            }).catch((error) => {
        
                console.log(error)
        
            })


        })
        })

  await RapportDataService.deleteRapport(idDoc)
  setModalIsOpen(false)
  getRapports()
}


// const downloadImages = (e) => {

//         e.preventDefault()

//     dataInterDelete.dataInter.filter(data => data.image.length > 0).forEach(data => {

//         data.image.forEach(image => {

//             const xhr = new XMLHttpRequest();
//             xhr.responseType = 'blob';
//             xhr.onload = (event) => {
//               const blob = xhr.response;
//           console.log(blob);
//           console.log(event.currentTarget.responseURL)
//           saveAs(event.currentTarget.responseURL, "Twitter-logo");

//             };
//             xhr.open('GET', image.url);
//             xhr.send();
            

//         })
//         })        

// }


return (

<>
<div>
    <h1>Mes Rapports</h1>
        </div>
            <div><button onClick={e => { navigate('mon-rapport',{state:{docIsCreated:false,idDoc:''}})}}>Creer un nouveau rapport</button>
    </div>
    <div  className="all-rapports">
    {rapports.map((data,key) => {
    return (
        <div  key={key}>
<div className="bloc-rapports">
                <button className="list-rapports" 
                        onClick={e =>  accessMyReport(e,data.idDoc)}>
                            {data.infoInter.informationIntervention.client} {data.infoInter.informationIntervention.reference} {data.infoInter.informationIntervention.nomSinistre}
                </button>
                    <p onClick={e => {e.preventDefault() 
                                      setIdDocument(data.idDoc)
                                      setRefRapport(data.infoInter.informationIntervention.reference)
                                      setDataInterDelete(data)
                                      setModalIsOpen(true)}}>X</p>
                    {/* <button onClick={e =>{   
                                             setDataInterDelete(data)
                                             downloadImages(e)}}>Telecharger images</button>                   */}
                   
    </div>
</div>
            )})}

{modalIsOpen && <ModalDelete setModalIsOpen={setModalIsOpen} deleteReport={deleteReport} idDoc={idDocument} dataInterDelete={dataInterDelete} refRapport={refRapport} typeDelete={'le rapport'}/>}


  
    </div>

</>

)

}

export default HomeRapports