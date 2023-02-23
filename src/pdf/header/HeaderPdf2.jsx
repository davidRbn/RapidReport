import React from "react";
import { View, StyleSheet,Image } from '@react-pdf/renderer';
import sintecImage from '../images/sintec.png'
import globalColor from "../globalStyles/globalStyles";

const HeaderPdf2 = ({dataInfoPdf}) => {

    const stylesHeader = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          
        },
         sectionImageHeader:{
          width:'100%',
          textAlign:'center',

        },
        
        sintecImage : {

         width:'220px',
         height:'70px',
         margin:'auto',
         marginBottom:'10px'

        },
          sectionPrinceHeader: {
          width : '90%',
          height:'120px',
          minHeight:'120px',
          border: ' 0.8px solid #000000',
          margin:' 10px auto',
          display:'flex',
          flexDirection:'row'
          
        },
        sectionGreenAdress:{
          display:'flex',
          flexDirection:'row',
          borderBottom:'1px solid #000000',
          height:'80px',

          
          
        },
        sectionTextGreen:{
          width:'60%',
          textAlign:'center',
          padding:'10px',
          borderRight:'0.8px solid #000000'


        },
        textGreen : {
          color:`${globalColor.titleColor}`,
          fontSize:'25px',
  
        },
        sectionTextAdress:{
          width:'40%',
          textAlign:'center',
          paddingTop:'6px'



        },
        textAdress:{
          fontSize:'10px',

        },
        sectionDossier:{
          display:'flex',
          flexDirection:'row',
          borderBottom:'1px solid #000000 '

        },
        textDossierN:{
          borderRight:' 0.8px solid #000000',
          textAlign:'center',
          width:'90px',
        },
        textNumeroDossier:{
          width:'292px',
          textAlign:'center'
        },
        sectionDateEtPage:{
          display:'flex',
          flexDirection:'row',
        },
        textDate:{
          width:'140px',
          textAlign:'center'

        },
        textNumeroPage:{
          borderLeft:'0.8px solid #000000',
          width:'153px',
          textAlign:'center'
          

        }

      });

    return(

        <>
              <View fixed style={stylesHeader.sectionImageHeader}>     
                   <Image style={stylesHeader.sintecImage} source={sintecImage}/>                 
              </View>
          
        </>
    )
}

export default HeaderPdf2