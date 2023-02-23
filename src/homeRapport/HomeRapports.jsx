import React from "react";
import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import { useState } from "react";
import RapportDataService from "../rapportDataService/RapportDataService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";





const HomeRapports = () => {

    const { user } = useContext(AuthContext);
    const [rapports, setRapports] = useState([])
    const navigate = useNavigate()





   const getallRapports = async () => {
          
        const data = await RapportDataService.getRapportUserId(user.uid)
           
           setRapports(data.docs.map((doc) => ({...doc.data()})))
           
    }
   


useEffect(() =>{
    getallRapports()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

    console.log(rapports)
    

return (

<>
<div>
<h1>Mes Rapports</h1>
</div>
<button onClick={e => { navigate('mon-rapport')}}>Creer un nouveau rapport</button>
{rapports.map((e,key) => {
return (
<button key={key}
onClick={e => console.log('Hello')}
>{e.informationIntervention.client} {e.informationIntervention.reference} {e.informationIntervention.nomSinistre}
</button>

)})}

</>

)

}

export default HomeRapports