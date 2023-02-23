import { StyleSheet, View,Text, Image } from "@react-pdf/renderer";
import React from "react";
import globalColor from "../globalStyles/globalStyles";



const BodyLandingPage2 = ({idRapport,dataLoading,dataSend,dataInfoPdf,dataInterPdf}) => {


    const stylesLandingPage = StyleSheet.create({

        sectionObjet:{
            
            padding: '2px',
            width:'90%',
            margin:'auto' ,
            borderBottom:`1px solid ${globalColor.titleColor}`,
            borderTop:`1px solid ${globalColor.titleColor}`,
            marginBottom:'50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            
        },
        textObjet2:{
            
        
            fontSize:'14px',
            margin:'auto',
            fontWeight:'bold'
        },
        firtArray:{

            display:'flex',
            flexDirection:'row',
            margin:'auto',
            marginBottom:'20px'


        },      
          firstBlocArray : {

                border: `1px solid ${globalColor.titleColor}`,
                width:'120px',
                height: '60px',
                display: 'flex',

              
         },
         elementArray : {

            borderBottom:`1px solid ${globalColor.titleColor}`,
            height:'30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'


         },
         titleElement : {

            fontSize:'10px',
            textAlign:'center',
           
 

            
         },
         blocBodyArray:{

            height:'30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#7FCA8B',
            opacity:'0.4'


         },
         bodyArray:{

            fontSize:'10px',
            textAlign:'center',
            color:'black',
            opacity:'1'
         },

         firstBlocArray2:{

            border: `1px solid ${globalColor.titleColor}`,
            width:'160px',
            height: '60px',
            display: 'flex',
         },
         firstBlocArray3:{
            border: `1px solid ${globalColor.titleColor}`,
            width:'480px',
            height: '60px',
            display: 'flex',

         },
         blocAdress:{

            display:'flex',
            flexDirection:'row',
            margin:'auto',
         },
         blocImageLeg : {

            width:"250px",
            height:"220px",
            margin:"5px auto",
            padding:"5px",
            border:`1px solid ${globalColor.titleColor} `,
            
        },textVueGlobale:{
            fontSize:`${globalColor.textSize}`,
            margin:'10px 0'
        
        },imageVueGlobale:{

            objectFit:'contain'
        }


        

      });


return (
    
<View>

<View style={stylesLandingPage.sectionObjet}>
        <Text style={stylesLandingPage.textObjet2}>RAPPORT DE RECHERCHE DE FUITE TECHNIQUE</Text>

</View>

 <View >
    <View style={stylesLandingPage.firtArray}>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>DONNEUR D'ORDRE</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.client}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>VOS REFERENCE</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}> <Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.vosReference}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>NOS REFERENCE</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.reference}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>FRANCHISE</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}> <Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.franchise}</Text></View>

        </View>
 
    </View>



    <View style={stylesLandingPage.firtArray}>
        <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>REFERENT SIN&TEC RDF</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>ANTONIN M.</Text></View>
         </View>
         <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>INTERVENANT SIN&TEC RDF</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.intervenant}</Text></View>
         </View>
         <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>DATE D'INTERVENTION</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.dateIntervention}</Text></View>
         </View>

    </View>
       <View style={stylesLandingPage.blocAdress}>
         <View style={stylesLandingPage.firstBlocArray3}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>ADRESSE D'INTERVENTION</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.lieuIntervention}</Text></View>
            </View>



       </View>
       <View style={stylesLandingPage.firtArray}>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>ASSURE(E)</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.nomSinistre}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>TYPE DE BIEN</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}> <Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.typeDeBien}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>SITUATION</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.situation}</Text></View>

        </View>
        <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>ETAGE(S)</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}> <Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.etage}</Text></View>

        </View>
 
    </View>


    </View>
    
    <View>
        
         {dataInterPdf.filter(data => data.section === 'vueGlobale').map((data,indexData )=> 
    
            <View key={indexData}>

            {data.image.map((image,index)=> 
                
                <View key={index} style={stylesLandingPage.blocImageLeg}>
                     <Text style={stylesLandingPage.textVueGlobale}>{data.titre}</Text>
                        <Image style={stylesLandingPage.imageVueGlobale} source={{uri : image.url,method: "GET"}}/>

                </View>
                
                
                )}
             
             
            
            
            </View>
            
            )}

    </View>

</View>

)


}

export default BodyLandingPage2