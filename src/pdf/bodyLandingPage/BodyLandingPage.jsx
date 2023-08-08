import { StyleSheet, View,Text } from "@react-pdf/renderer";
import React from "react";
// import { useEffect } from "react";
import globalColor from "../globalStyles/globalStyles";
// import RapportDataService from "../../rapportDataService/RapportDataService"



const BodyLandingPage = ({idRapport,dataLoading,dataSend,dataInfoPdf}) => {

// console.log(idRapport)

//     const getRapport = async () => {

//     const res = await RapportDataService.getRapport(idRapport)
//     dataLoading(false)
//     console.log(res)
// }
 

// useEffect(() => {

// getRapport()

// },[])


    const stylesLandingPage = StyleSheet.create({

        sectionObjet:{
            
            width:'90%',
            height:'50px',
            margin:'auto' ,
            borderBottom:'2px solid #BDC3C7',
            marginTop:'50px',
            marginBottom:'0',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly'
        },
        firstSectionLandingPage:{
            width:'90%',
            display:'flex',
            marginLeft:'-100px',
            marginTop:'10px',
            flexDirection:'row',
            justifyContent:'space-evenly'

        },
        firstSectionLandingPage2:{
            width:'200px',
            marginLeft:'100px',
            marginTop:'30px'
        },
        firstSectionInfo:{
            marginTop:'30px'
             
        },
        textObjet : {
            color:`${globalColor.titleColor}`,
            fontSize:'15px'
        },
        textObjet2:{

            fontSize:`${globalColor.textSize}`
        },
        textObjet3:{
            textDecoration: 'underline',
            fontSize:`${globalColor.textSize}`,
            fontWeight:'bold'
        }

      });


return (
    <View>


<View style={stylesLandingPage.sectionObjet}>
        <View><Text style={stylesLandingPage.textObjet}>Objet :</Text></View>
        <View><Text style={stylesLandingPage.textObjet2}>Recherche de fuite d’eau, à la suite d’infiltrations</Text></View>

    </View>

    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Client : </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.client}</Text></View>   
    </View>
    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Lieu d'intervention :  </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.lieuIntervention}</Text></View>   
    </View>
    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Contact : </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.contact}</Text></View>   
    </View>
    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Nos références : </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.reference}</Text></View>   
    </View>
    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Intervenant : </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.intervenant}</Text></View>   
    </View>
    <View style={stylesLandingPage.firstSectionLandingPage}>
         <View style={stylesLandingPage.firstSectionLandingPage2}><Text style={stylesLandingPage.textObjet3}>Date de visite : </Text></View>
         <View style={stylesLandingPage.firstSectionInfo}><Text style={stylesLandingPage.textObjet2}>{dataInfoPdf.dateIntervention}</Text></View>   
    </View>
    
    </View>

)


}

export default BodyLandingPage