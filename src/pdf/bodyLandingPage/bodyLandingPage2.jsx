import { StyleSheet, View,Text, Image, Font } from "@react-pdf/renderer";
import React from "react";
import globalColor from "../globalStyles/globalStyles";
import imageAdeau from "../images/A.d.Eau expertise2.png"
import sourceFont from "../font/helvetica/Helvetica.ttf"


const BodyLandingPage2 = ({idRapport,dataLoading,dataSend,dataInfoPdf,dataInterPdf}) => {

  Font.register({ family: 'Helvetica', src: sourceFont });


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
        imageBodyLandingPage:{

            width:"100%",
            height:'500px'
        },
        firtArray:{

            display:'flex',
            flexDirection:'row',
            alignContent:'space-around',
            justifyContent:'space-around',
            marginBottom:'20px'


        },      
          firstBlocArray : {

                // border: `1px solid ${globalColor.titleColor}`,
                width:'160px',
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
 
            fontSize:'12px',
            textAlign:'center',
           color:`${globalColor.titleColor}`,
           fontWeight:'bolder',
           fontFamily:'Helvetica'
            
         },
         blocBodyArray:{

            height:'30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'#7FCA8B',
            // opacity:'0.4'


         },
         bodyArray:{

            fontSize:'10px',
            textAlign:'center',
            color:'black',
            opacity:'1',
            fontFamily:'Helvetica'
         },

         firstBlocArray2:{

            width:'160px',
            height: '60px',
            display: 'flex',
         },
         firstBlocArray3:{
            width:'160px',
            height: '60px',
            display: 'flex',

         },
         blocAdress:{

            display:'flex',
            flexDirection:'row',
            margin:'auto',
         },
        sectionIntervenant:{
            margin:'auto'
        }


        

      });


return (
    


<View>

    <View>
        <Image style={stylesLandingPage.imageBodyLandingPage} source={imageAdeau}/>
    </View>

 <View >
    <View style={stylesLandingPage.firtArray}>
       <View> 
        <View style={stylesLandingPage.firstBlocArray}>
                <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>DONNEUR D'ORDRE</Text></View>
                 <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.client}</Text></View>
        </View>

         <View style={stylesLandingPage.firstBlocArray3}>
                 <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>ADRESSE D'INTERVENTION</Text></View>
                <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.lieuIntervention}</Text></View>
        </View>

         <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>VOS REFERENCES</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.vosReference}</Text></View>
         </View>
        </View>
       
        {/* <View style={stylesLandingPage.firstBlocArray}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>NOS REFERENCE</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.reference}</Text></View>

        </View> */}   

        <View>
        <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>DATE D'INTERVENTION</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.dateIntervention}</Text></View>
         </View>

         <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>DATE RAPPORT</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.dateIntervention}</Text></View>
         </View>


        <View>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>NOS REFERENCES</Text></View>
            <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.reference}</Text></View>
         </View>
       


        </View>

        

    </View>


    <View style={stylesLandingPage.sectionIntervenant}>

    <View style={stylesLandingPage.firstBlocArray2}>
            <View  style={stylesLandingPage.elementArray}><Text style={stylesLandingPage.titleElement}>INTERVENANT</Text></View>
                     <View  style={stylesLandingPage.blocBodyArray}><Text style={stylesLandingPage.bodyArray}>{dataInfoPdf.intervenant}</Text></View>
         </View>

    </View>

    </View>
    
    <View>
        
         {/* {dataInterPdf.filter(data => data.section === 'vueGlobale').map((data,indexData )=> 
    
            <View key={indexData}>

            {data.image.map((image,index)=> 
                
                <View key={index} style={stylesLandingPage.blocImageLeg}>
                     <Text style={stylesLandingPage.textVueGlobale}>{data.titre}</Text>
                        <Image style={stylesLandingPage.imageVueGlobale} source={{uri : image.url,method: "GET"}}/>

                </View>
                
                
                )}
             
             
            
            
            </View>
            
            )} */}

    </View>

</View>

)


}

export default BodyLandingPage2