import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import globalColor from "./globalStyles/globalStyles";




const PageTwoPdf = ({dataInterPdf}) => {


    const stylesPageTwoPdf = StyleSheet.create({

        blocArray:{

            margin:'auto'

        },
         ligneArray:{

            display:'flex',
            flexDirection:'row',
            width:'510px'


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
            border: `1px solid ${globalColor.titleColor}`,
            width:'120px',
            textAlign:'center',

          },
          textAlignMoyen1 : {

            fontSize:`${globalColor.textSize}`,
            width:'270px',
            textAlign:'center',
            padding:'2px 5px',
            border: `1px solid ${globalColor.titleColor}`,
            

          },
          textAlignMoyen : {

            fontSize:`${globalColor.textSize}`,
            textAlign:'center',
            padding:'2px 5px',
            width:'120px',
            border: `1px solid ${globalColor.titleColor}`,
            opacity:'1'
            


          },

        titleDataInter:{
            color:`${globalColor.titleColor}`,
            margin:'10px'
    
        },
        description : {

            margin: '5px 20px',
            fontSize:`${globalColor.textSize}`,
            lineHeight:`${globalColor.lineHeigth}`,
            
        }
    
    
    })





return (

<>
  {dataInterPdf.filter(data => data.section === 'constatations'|| data.section === "moyenTechnique" || data.section === 'conclusion').map((data,indexData )=> 
    
   { if(data.section === 'moyenTechnique'){

return ( 
<View key={indexData}>
    
    <View>
        <Text style={stylesPageTwoPdf.titleDataInter}>Investigations : </Text>
          <Text  style={stylesPageTwoPdf.description}>Lors de notre intervention, nous avons mis en œuvre les moyens techniques suivants :</Text>
    </View>

    <View  style={stylesPageTwoPdf.blocArray}>

     <View style={stylesPageTwoPdf.ligneArray}>
          <Text style={stylesPageTwoPdf.headArray1} >MOYENS TECHNIQUES DISPONIBLES</Text>
          <Text style={stylesPageTwoPdf.headArray}>MIS EN OEUVRE</Text>  
          <Text style={stylesPageTwoPdf.headArray}>CONCLUANT</Text>  
     </View>
    
         {data.moyenTechnique.map((moyen,indexMoyen) => 
            
            
            <View key={indexMoyen} style={indexMoyen  % 2 === 1  ? stylesPageTwoPdf.ligneArray :  stylesPageTwoPdf.ligneArray2 } >

                 <Text style={stylesPageTwoPdf.textAlignMoyen1}>{moyen.materielUtilise}</Text>
                 <Text style={stylesPageTwoPdf.textAlignMoyen}>{moyen.isUse ? 'X' : ''}</Text>
                 <Text style={stylesPageTwoPdf.textAlignMoyen}></Text>


            </View>
                    
            
            )} 
</View>
 </View>    )     
      

   }else {
       
   return (<View key={indexData}>
    <Text style={stylesPageTwoPdf.titleDataInter}>{data.titre} : </Text>
    <Text style={stylesPageTwoPdf.description}>{data.description}</Text>
  
  </View>)


   }
   
   
   }
    
    
    
    )}

</>

)




}


export default PageTwoPdf