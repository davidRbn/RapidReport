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





const HomeRapports = () => {

    const { user } = useContext(AuthContext);
    const [rapports, setRapports] = useState([])
    const navigate = useNavigate()
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const [dataUserInfo,setDataUserInfo] = useState({})




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
        console.log('useEffect')
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


const deleteReport = async (e,idDoc) => {

    e.preventDefault()

  await RapportDataService.deleteRapport(idDoc).then(res => console.log(res))
  setModalIsOpen(false)
  console.log('deleted')
  getRapports()
}

console.log(modalIsOpen)
    

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
                                      setModalIsOpen(true)}}>X</p>
                   
    </div>
{modalIsOpen && <ModalDelete setModalIsOpen={setModalIsOpen} deleteReport={deleteReport} idDoc={data.idDoc} typeDelete={'le rapport'}/>}
</div>
            )})}

  
    </div>

</>

)

}

export default HomeRapports