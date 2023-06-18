import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import globalColor from "./globalStyles/globalStyles";




const PageTwoPdf = ({dataInterPdf,dataInfoPdf}) => {


    const stylesPageTwoPdf = StyleSheet.create({


      sectionVueGlobale:{
        display:'flex',
        flexDirection:'row',
        alignContent:'space-around',
        alignItems:'center',
        width:'100%',

      },
      sectionTextVueGlobale:{

        width:'40%',
        textAlign:'center'

      },
      textVueGlobale:{

        color:`${globalColor.titleColor}`,
        paddingBottom:'5px'

      },
         blocImageLeg : {

            width:"250px",
            height:"210px",
            margin:"5px auto",
            padding:"5px",
            border:`1px solid ${globalColor.titleColor} `,
            borderRadius:'10%'
            
        },
       imageVueGlobale:{

          objectFit:'contain',
          // border:`10px solid ${globalColor.titleColor}`,
          borderRadius:'10%'
        
      },
      sectionConstatationConclusion:{

        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        height:'540px'

      },
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
            margin:'10px',
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
  {dataInterPdf.filter(data => data.section === "vueGlobale").map((data,indexData )=> ( 


  <View key={indexData}>

  {data.image.map((image,index)=> 
   
    <View key={index} style={stylesPageTwoPdf.sectionVueGlobale}>

      <View   style={stylesPageTwoPdf.sectionTextVueGlobale}>
              <Text style={stylesPageTwoPdf.textVueGlobale}>{dataInfoPdf.client}</Text>
              <Text style={stylesPageTwoPdf.textVueGlobale}>-</Text>

              <Text style={stylesPageTwoPdf.textVueGlobale}>{dataInfoPdf.copro}</Text>
      </View>  
      
      <View style={stylesPageTwoPdf.blocImageLeg}>
              <Image style={stylesPageTwoPdf.imageVueGlobale} source={{uri : image.url,method: "GET"}}/>

      </View>
  </View>
      
      )}
   
</View>
  



 ))}

 <View style={stylesPageTwoPdf.sectionConstatationConclusion}>

{dataInterPdf.filter(data => data.section === 'constatations'|| data.section === 'conclusion').map((data,indexData )=>(
        
        <View key={indexData}>
          <Text style={stylesPageTwoPdf.titleDataInter}>{data.titre}</Text>
          <Text style={stylesPageTwoPdf.description}>{data.description}</Text>
     
        </View>
       
       
       
       
       ))
     
     
         }

</View>         

</>

)




}


export default PageTwoPdf