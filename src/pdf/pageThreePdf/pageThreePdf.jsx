import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import globalColor from "../globalStyles/globalStyles";




const PageThreePdf = ({dataInterPdf}) => {


    const stylesPageThreePdf = StyleSheet.create({

        blocArray:{

            margin:'auto',
            

        },
         ligneArray:{

            display:'flex',
            flexDirection:'row',
            margin:'auto'
            // width:'510px'


         },
         ligneArray2:{

            display:'flex',
            flexDirection:'row',
            backgroundColor:'#7FCA8B',
            opacity:'0.4',
            width:'510px'


         },
           headArray1:{
             
            color:`${globalColor.titleColor}`,
            fontSize:`${globalColor.textSize}`,
            padding:'5px 5px',
            border: `1px solid ${globalColor.titleColor}`,
            width:'270px',
            textAlign:'center'


           },
          headArray:{
             color:`${globalColor.titleColor}`,
            fontSize:`${globalColor.textSize}`,
            padding:'5px 5px',
            // border: `1px solid ${globalColor.titleColor}`,
            width:'120px',
            textAlign:'center',

          },
          textAlignMoyen1 : {

            fontSize:`${globalColor.textSize}`,
            width:'200px',
            textAlign:'center',
            padding:'2px 5px',
            borderBottom: `2px solid ${globalColor.titleColor}`,
            borderRight: `2px solid ${globalColor.titleColor}`,

            

          },
          textAlignMoyen : {

            fontSize:`${globalColor.textSize}`,
            textAlign:'center',
            padding:'2px 5px',
            width:'30px',
            borderBottom: `2px solid ${globalColor.titleColor}`,
            opacity:'1'
            


          },
          blocOrigineDesordre:{

            marginTop:"40px"

          },
        titleDataInter:{
            color:`${globalColor.titleColor}`,
            margin:'20px',
            textAlign:'center'
    
        },
        description : {

            margin: '5px 20px',
            fontSize:`${globalColor.textSize}`,
            lineHeight:`${globalColor.lineHeigth}`,
            
        }
    
    
    })


         /* {dataInterPdf.filter(data => data.section === 'vueGlobale').map((data,indexData )=> 
    
            <View key={indexData}>

            {data.image.map((image,index)=> 
                
                <View key={index} style={stylesLandingPage.blocImageLeg}>
                     <Text style={stylesLandingPage.textVueGlobale}>{data.titre}</Text>
                        <Image style={stylesLandingPage.imageVueGlobale} source={{uri : image.url,method: "GET"}}/>

                </View>
                
                
                )}
             
             
            
            
            </View>
            
            )} */





return (

<>
  {dataInterPdf.filter(data => data.section === 'investigations'|| data.section === "moyenTechnique").map((data,indexData )=> 
    
   { if(data.section === 'moyenTechnique'){

return ( 
<View key={indexData}>
<Text style={stylesPageThreePdf.titleDataInter}>{data.titre}</Text>
    
    <View>
        {/* <Text style={stylesPageThreePdf.titleDataInter}>Investigations : </Text> */}
          <Text  style={stylesPageThreePdf.description}>Lors de notre intervention, nous avons mis en œuvre les moyens techniques suivants :</Text>
    </View>

     <View  style={stylesPageThreePdf.blocArray}>

     {/* <View style={stylesPageThreePdf.ligneArray}>
          <Text style={stylesPageThreePdf.headArray1} >MOYENS TECHNIQUES DISPONIBLES</Text>
          <Text style={stylesPageThreePdf.headArray}>MIS EN OEUVRE</Text>  
          <Text style={stylesPageThreePdf.headArray}>CONCLUANT</Text>  
     </View> 
     */}
         {data.moyenTechnique.map((moyen,indexMoyen) => 
            
            
            <View key={indexMoyen} style={stylesPageThreePdf.ligneArray } >

                 <Text style={stylesPageThreePdf.textAlignMoyen1}>{moyen.materielUtilise}</Text>
                 <Text style={stylesPageThreePdf.textAlignMoyen}>{moyen.isUse ? 'X' : ''}</Text>
                 {/* <Text style={stylesPageThreePdf.textAlignMoyen}></Text> */}


            </View>
                    
            
            )} 
</View>
 </View>    )     
      

   }else {
       
   return (<View style={stylesPageThreePdf.blocOrigineDesordre} key={indexData}>
    <Text style={stylesPageThreePdf.titleDataInter}>{data.titre}</Text>
    <Text style={stylesPageThreePdf.description}>{data.description}</Text>
  
  </View>)


   }
   
   
   }
    
    
    
    )}

</>

)




}


export default PageThreePdf