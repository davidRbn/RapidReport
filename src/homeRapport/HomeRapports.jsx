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
import Loader from "../loader/Loader";
// import {saveAs} from "file-saver";
import imageMaison from '../image/imageMaison.jpg'



const HomeRapports = () => {

    const { user } = useContext(AuthContext);
    const [rapports, setRapports] = useState([])
    const navigate = useNavigate()
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const [dataUserInfo,setDataUserInfo] = useState({})
    const [idDocument,setIdDocument] = useState('')
    const [refRapport,setRefRapport ] = useState('')
    const [dataInterDelete,setDataInterDelete] = useState({})
    const [dataIsLoading,setDataIsLoading] = useState(false)

   const getRapports = async () => {
          
        
       if(dataUserInfo.allAccessReport){

        const data = await RapportDataService.getAllRapports()
        setRapports(data.docs.map((doc) => ({...doc.data(),idDoc : doc.id})))
             

       }
       
       else{

        const data = await RapportDataService.getRapportUserId(user.uid)
        setRapports(data.docs.map((doc) => ({...doc.data(),idDoc : doc.id})))
        setDataIsLoading(true)
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

// console.log(rapports)

// console.log(rapports.map(data => data.dataInter.filter(dataInter => dataInter.section === 'vueGlobale').map(img => img.image.length > 0 ? console.log(img.image[0].url) :console.log(''))))


const getDate = (date) => {

    const theDate = new Date(date)

    console.log(theDate);

    const dateYear = theDate.getFullYear()
    const dateDay = theDate.getDate()
    const dateMonth = theDate.getMonth()

    let month = ''

    switch (dateMonth) {
        case 0:
          month = 'Janvier';
          break;
          case 1:
            month = 'Février';
            break;
            case 2:
                month = 'Mars';
                break;
                case 3:
                    month = 'Avril';
                    break;
                    case 4:
                        month = 'Mai';
                        break;
                        case 5:
                            month = 'Juin';
                            break;
                            case 6:
                                month = 'Juillet';
                                break;
                                case 7:
                                    month = 'Aout';
                                    break;
                                    case 8:
                                        month = 'Septembre';
                                        break;
                                        case 9:
                                            month = 'Octobre';
                                            break;
                                            case 10:
                                                month = 'Novembre';
                                                break;
                                                case 11:
                                                    month = 'Décembre';
                                                    break;
                                                    default :
                                                    month = ''
    }

    let dateNew = `${dateDay} ${month} ${dateYear}`
// console.log(dateDay,dateMonth,dateYear);
    return dateNew
}


return (

<div>
    <p>MAJ : 1.7</p>
    
<div>
    <h1 className="title-home-rapports">Mes Rapports</h1>
        </div>
            <div ><button className="btn-create-rapport" onClick={e => { navigate('mon-rapport',{state:{docIsCreated:false,idDoc:''}})}}>Creer un nouveau rapport</button>
    </div>
    <div  className="all-rapports">
    {[...rapports].sort((a, b) => {
        // Convertissez les dates en objets Date pour la comparaison
        const dateA = new Date(a.infoInter.informationIntervention.dateIntervention);
        const dateB = new Date(b.infoInter.informationIntervention.dateIntervention);

        // Triez par ordre croissant (le plus ancien en premier)
        return dateB - dateA;
    }).map((data,key) => {
    return (
        <div  key={key}>
<div className="bloc-rapports">
                <div className={data.infoInter.informationIntervention.rapportFini ?'list-rapports-interFini': 'list-rapports'} 
                        onClick={e =>  accessMyReport(e,data.idDoc)}>

<div className="bloc-mage-infoInter-home">
{data.dataInter.filter(dataInter => dataInter.section === 'vueGlobale').map((img,index) => img.image.length > 0 ? 
    
   
    <div key={index}>
    
            <img className="image-homeRapport" src={img.image[0].url} alt='vue immeuble'/>
    </div>

    
    
    :

    <div key={index}>
    
    <img className="image-homeRapport" src={imageMaison} alt='vue immeuble'/>
    
    </div>
    )}
                       

         
                     <div className="text-infoInter-home"> 
                        
                    <p>{data.infoInter.informationIntervention.client}</p>
                    <p> {data.infoInter.informationIntervention.reference} </p>
                    <p>{getDate(data.infoInter.informationIntervention.dateIntervention)}</p>
                    </div>

                   
</div>                        
                </div>
                <p className="btn-delete-home" onClick={e => {e.preventDefault() 
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
{!dataIsLoading && <Loader/>}

  
    </div>
</div>

)

}

export default HomeRapports