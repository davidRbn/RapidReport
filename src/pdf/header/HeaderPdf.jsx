import React from "react";
import {Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import sintecImage from '../images/sintec.png'
import globalColor from "../globalStyles/globalStyles";
import adeauExpertise from '../images/default.png'



const HeaderPdf = ({dataInfoPdf}) => {

    const stylesHeader = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          
        },
         sectionImageHeader:{
          width:'40%',
          height:'100px',
          border:'0.8px solid #000000',
          padding:'22px 0 0 0'

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
        <View fixed style={stylesHeader.sectionPrinceHeader}>
              <View style={stylesHeader.sectionImageHeader}>     
                   <Image source={adeauExpertise}/>                 
              </View>
           <View>
             <View style={stylesHeader.sectionGreenAdress}>
                <View style={stylesHeader.sectionTextGreen}>
                  <Text style={stylesHeader.textGreen}>Compte rendu de recherche de fuite</Text>

                 </View>
                  <View style={stylesHeader.sectionTextAdress}>
                    <Text style={stylesHeader.textAdress}>
                        SIN&TEC SUD
                    </Text>
                    <Text style={stylesHeader.textAdress}> 106 Allée André Ampère,</Text>
                    <Text style={stylesHeader.textAdress}>RN8 Quartier Du Douard -</Text>
                    <Text style={stylesHeader.textAdress}>
                     
                      
                          ZI plaine de Jouques 
                    </Text>
                    <Text style={stylesHeader.textAdress}> 13420 Gémenos (France)</Text>


              </View>


             </View>
              <View>
                <View style={stylesHeader.sectionDossier}>
                  <View style={stylesHeader.textDossierN}><Text>Dossier N°</Text></View>
                  <View style={stylesHeader.textNumeroDossier}><Text>{dataInfoPdf.reference}</Text></View>
                </View>



                <View style={stylesHeader.sectionDateEtPage}>
                  <View style={stylesHeader.textDossierN}><Text>Date</Text></View>
                  <View style={stylesHeader.textDate}><Text>{dataInfoPdf.dateRapport}</Text></View>
                  <View style={stylesHeader.textNumeroPage}><Text>Page hook</Text></View>
                </View>


              </View>


           </View>
        </View>
        </>
    )
}

export default HeaderPdf