import React from "react";
import { StyleSheet, View,Text, Image } from "@react-pdf/renderer";
import globalColor from "../globalStyles/globalStyles";





const BodyInter = ({dataInterPdf,indexData,indexConstatation,setIndexConstatation}) => {

    // const [dataTest, setDataTest] = useState(dataIntervention)

  // dataInterPdf &&  dataInterPdf.filter(data => data.section === 'constatation').map(e => console.log(e))

  const styles = StyleSheet.create({

    titleDataInter:{
        color:`${globalColor.titleColor}`

    },
    titleInvestigations:{
      color: `${globalColor.secondaryColor}`,
      fontSize:'20px',
      marginBottom:'5px'
    },
    descriptionDataInter: {
      
      marginTop:'20px',
      marginRight:"20px",
      marginLeft: '20px',
      fontSize:`${globalColor.textSize}`,
      lineHeight:`${globalColor.lineHeigth}`

    },
    containerAllImage:{
      display:"flex",
      flexDirection:"row",
      alignContent:'space-around',
      // border:"5px solid red",
      flexWrap:'wrap',
      marginTop:'20px',

    },
    firstBlocImage:{

      width:"50%",
      // border:"5px solid blue",
      margin:'0 auto'

    },
    firstBlocImage2:{
     
     width:"50%",
      // border:"5px solid blue",
      margin:'0 auto',
      marginTop:'60px'


    },
    blocImageLeg : {

        width:"250px",
        height:"220px",
        margin:"5px auto",
        padding:"2px",
        
    },

    legendeImage:{

      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0'
    
    },

    legendeImageMiseEnPression : {
       
      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0'

    },
    
    imageRapport:{

      objectFit:'contain'
    }


  })

return (

  
    <View>
      {indexData === 0?<Text style={styles.titleInvestigations}>Détail des investigations : </Text>:<Text></Text>}
       <Text style={styles.titleDataInter}>{dataInterPdf.section === 'constatations' ? `${dataInterPdf.titre} et TH` : dataInterPdf.titre } </Text>        


<View>
    
    <Text style={styles.descriptionDataInter}>{dataInterPdf.section === "constatations" ? "" : dataInterPdf.description}</Text>

    <View  wrap style={styles.containerAllImage}>

    {dataInterPdf.image.map((image,index) => (

            <View wrap={false} key={index} style={(index > 3) ? styles.firstBlocImage2: styles.firstBlocImage}>
                 <View style={styles.blocImageLeg}>
                    <Image style={styles.imageRapport} source={{uri : image.url,method: "GET"}}/>


                    { dataInterPdf.section === "miseEnPression"?
                    <>
                    <Text style={styles.legendeImage}>Type de canalisation : réseau d'eau {image.reseau}</Text>
                         <Text style={styles.legendeImageMiseEnPression}>Pression d'épreuve : {image.epreuve} bars</Text>
                             <Text style={styles.legendeImage}>Durée de la mise en épreuve : 15 minutes</Text>
                     <Text style={styles.legendeImage}>Pression finale : {image.finale} bars</Text>        
                    </>
                    :
                    <Text style={styles.legendeImage}>{image.legende}</Text>
                    
                    }
                   
              </View>
                


            </View>


    ))}

</View>

               
      </View> 
      

    </View>
      
    
    
    
)





}


export default BodyInter