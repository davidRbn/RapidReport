import React from "react";
import { StyleSheet, View,Text, Image } from "@react-pdf/renderer";
import globalColor from "../globalStyles/globalStyles";





const BodyInter = ({dataInterPdf,indexData,indexConstatation,setIndexConstatation}) => {

    // const [dataTest, setDataTest] = useState(dataIntervention)

  // dataInterPdf &&  dataInterPdf.filter(data => data.section === 'constatation').map(e => console.log(e))

  const styles = StyleSheet.create({

    titleDataInter:{
        color:`${globalColor.titleColor}`,
        textAlign:'center'

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
      alignContent:'center',
      // border:"5px solid red",
      flexWrap:'wrap',
      marginTop:'10px',
      marginBottom:'10px',

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
      marginTop:'20px',
    //  position:'relative'

    },
    blocImageLeg : {

        width:"260px",
        maxHeight:'300px',
        minHeight:'200px',
        margin:"5px auto",
        padding:"2px",
        // border:`1px solid ${globalColor.titleColor} `,
        // borderRadius:'10%',
        // position:'relative'
        // display:"flex",
        // flexDirection:"column",
        // justifyContent:'space-evenly'
        
    },
    blocImageLegPortrait:{

      // transform:'rotate(90deg)' ,
      // transformOrigin:'center',
      // overflow:'hidden',

      // height:'150px',
      // width:'230px',
    //  margin:'20px 0',
      padding:'2px',
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
      

    },

    legendeImage:{

      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0 0 0',
      // transform:'translateY(10%)'
      position:'relative',
      // top:'5%'
    
    },
  
    legendeImageMiseEnPression : {
       
      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0'

    },
    
    imageRapport:{

      objectFit:'contain',
      // transform:'rotate(90deg)'
      // maxHeight:'200px',
    
    },
    imageRapportPortrait:{
      // objectFit:'scale-down',
      // transform:'rotate(90deg)',
    //   width:'185px',
    //   height:'130px',
      transform:'rotate(90deg)',
      maxHeight:'100%',
      maxWidth:'100%'
    //   transformOrigin:'center',
    //   margin:'auto'
     }


  })

// console.log(dataInterPdf)

return (

  
    <View>
      {/* {indexData === 0?<Text style={styles.titleInvestigations}>Détail des investigations : </Text>:<Text></Text>} */}
       <Text style={styles.titleDataInter}>{dataInterPdf.section === 'constatations' ? `${dataInterPdf.titre} et TH` : dataInterPdf.titre } </Text>        


<View>
    
    <Text style={styles.descriptionDataInter}>{dataInterPdf.section === "constatations" ? "" : dataInterPdf.description}</Text>

    <View wrap style={styles.containerAllImage}>

    {dataInterPdf.image.map((image,index) => (

            <View wrap={false} key={index} style={(index > 3) ? styles.firstBlocImage2: styles.firstBlocImage}>
                 <View style={styles.blocImageLeg}>
                 
                 <View style={image.orientationImage === 6 && styles.blocImageLegPortrait}>
                     <Image style={image.orientationImage === 6 ? styles.imageRapportPortrait : styles.imageRapport} source={{uri : image.url,method: "GET"}}/>
                  </View>

                    { dataInterPdf.section === "miseEnPression"?
                    <View style={styles.blocMiseEnPression}>
                    <Text style={styles.legendeImage}>Type de canalisation : réseau d'eau {image.reseau}</Text>
                         <Text style={styles.legendeImageMiseEnPression}>Pression d'épreuve : {image.epreuve} bars</Text>
                             <Text style={styles.legendeImage}>Durée de la mise en épreuve : 15 minutes</Text>
                     <Text style={styles.legendeImage}>Pression finale : {image.finale} bars</Text>        
                    </View>
                    :
                   <View> <Text style={styles.legendeImage}>{image.legende}</Text></View>
                    
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