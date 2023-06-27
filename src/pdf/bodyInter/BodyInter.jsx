import React from "react";
import { StyleSheet, View,Text, Image } from "@react-pdf/renderer";
import globalColor from "../globalStyles/globalStyles";





const BodyInter = ({dataInterPdf,indexDataPdf,indexData,indexConstatation,setIndexConstatation}) => {

    // const [dataTest, setDataTest] = useState(dataIntervention)

  // dataInterPdf &&  dataInterPdf.filter(data => data.section === 'constatation').map(e => console.log(e))


  // const incrementCounter = () => {
  //   setPhotoCounter((prevCounter) => prevCounter + 1)

  //   return photoCounter
  // };

  const getBlockImageLegStyle = (length,index) => {
    

              // return (length > 1 && length < 5) || length === 4 || length === 7 || length === 8 ? styles.blocImageMoyen : length === 1 ? styles.blocImageGrand : styles.blocImageLegPetit
  
              if((length > 1 && length < 5) || length === 4 || length === 7 || length === 8 ){

                if((length === 7 || length === 8) && (index === 4 || index === 5)){

                  return [styles.blocImageMoyen,styles.blocImageMoyenSecondPage]
                }else {

                  return styles.blocImageMoyen
                }

              }else if (length === 1){

                  return styles.blocImageGrand 

              }else {

                return styles.blocImageLegPetit
              }
  }

  const getContainerImage = (length) => {


               return length === 2 ? styles.containeAllImageColonne : styles.containerAllImage  
  }


  const styles = StyleSheet.create({

    titleDataInter:{
        color:`${globalColor.titleColor}`,
        textAlign:'center',
        padding:'2px',
        // borderBottom:'1px solid black'

    },
    titleInvestigations:{
      color: `${globalColor.secondaryColor}`,
      fontSize:'20px',
      marginBottom:'5px'
    },
    descriptionDataInter: {
      
      marginTop:'10px',
      marginBottom:'0px',
      marginLeft:'5px',
      marginRight:'5px',
      fontSize:`${globalColor.textSize}`,
      lineHeight:`${globalColor.lineHeigth}`,
      textAlign:'center',
      maxHeight:'92px',
      minHeight:'90px'

    },
    containerAllImage:
    
    {
      display:"flex",
      flexDirection:"row",
      // alignContent:'center',
      justifyContent:'center',
      // border:"5px solid red",
      flexWrap:'wrap',
      marginTop:'5px',
      // marginBottom:'10px',

    },
    containeAllImageColonne:{

      display:"flex",
      flexDirection:"column",
      alignContent:'center',
      justifyContent:'space-evenly',
      // border:"5px solid red",
      flexWrap:'wrap',
      marginTop:'5px',
      // marginBottom:'10px',
   

    },
    containerAll2Image:{

      display:"flex",
      flexDirection:"column",
      alignContent:'center',
      justifyContent:'space-evenly',
      // border:"5px solid red",
      flexWrap:'wrap',
      marginTop:'5px',
      // height:'570px'

    },
    firstBlocImage:{

      // width:"50%",
      // // border:"5px solid blue",
      // margin:'0 auto'

    },
    firstBlocImage2:{
     
     width:"50%",

      // border:"5px solid blue",
      margin:'0 auto',
      marginTop:'20px',
    //  position:'relative'

    },
    blocImageLegPetit : {

        width:"220px",
        maxHeight:'300px',
        minHeight:'200px',
        margin:"5px auto",
        padding:"2px",
        // border:`1px solid ${globalColor.titleColor} `,
        // borderRadius:'10%',
        // position:'relative'
        // display:"flex",
        // flexDirection:"column",
        // justifyContent:'space-evenly',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent:'center',
         border:`2px solid ${globalColor.titleColor}`,
         borderRadius:'5%'

        
    },

    blocImageMoyen:{

      width:"280px",
      maxHeight:'300px',
      minHeight:'280px',
      margin:"5px auto",
      padding:"2px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      textAlign: 'center',
      border:`2px solid ${globalColor.titleColor}`,
      borderRadius:'5%'

    },
    blocImageMoyenSecondPage:{

      marginTop:"80px",
      marginBottom:'50px'

    },
    blocImageGrand:{

      width:"350px",
      maxHeight:'400px',
      minHeight:'350px',
      margin:"5px auto",
      padding:"2px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      textAlign: 'center',
      border:`2px solid ${globalColor.titleColor}`,
      borderRadius:'5%',

    },
    blocImageLegPortrait:{

      // transform:'rotate(90deg)' ,
      // transformOrigin:'center',
      // overflow:'hidden',

      // height:'150px',
      // width:'230px',
    //  margin:'20px 0',
      padding:'2px',
      width:'300px',
      height:'220px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      position: 'relative', // ou 'absolute' en fonction du contexte
      top: '50%',
      transform: 'translateY(-50%)',
      

    },

    legendeImage:{

      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0 0 0',
      maxHeight:'30px'
      // transform:'translateY(10%)'
      // position:'relative',
      // top:'5%',
    
    },
    legendeImagePortrait:{

      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      margin:'5px 0 0 0',
      // transform:'translateY(10%)'
      // top:'5%'
    

    },
  
    legendeImageMiseEnPression : {
       
      textAlign:'center',
      fontSize:`${globalColor.textSize}`,
      // margin:'5px 0'
      margin:'5px 0 0 0',


    },
    
    imageRapport:{

      objectFit:'contain',
      // transform:'rotate(90deg)'
      // maxHeight:'200px',
      // border:`10px solid ${globalColor.titleColor}`,
      borderRadius:'10%'
    
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



// console.log(dataInterPdf);

return (

  
    <View>
      {/* {indexData === 0?<Text style={styles.titleInvestigations}>Détail des investigations : </Text>:<Text></Text>} */}
       <Text style={styles.titleDataInter}>{dataInterPdf.section === 'constatations' ? `${dataInterPdf.titre} et TH` : dataInterPdf.titre } </Text>        


<View>
    
    <Text style={styles.descriptionDataInter}>{dataInterPdf.section === "constatations" ? "" : dataInterPdf.description}</Text>

    <View style={getContainerImage(dataInterPdf.image.length)}>

    {dataInterPdf.image.map((image,index) => {
    

    
    return (

          

            // <View debug wrap={false} key={index} style={(index > 3) ? styles.firstBlocImage2: styles.firstBlocImage}>
                 <View  key={index} style={getBlockImageLegStyle(dataInterPdf.image.length,index)}>
                 
                 {/* <Text style={styles.photoNumber}>{counter.current}</Text> */}
                 <View wrap={false} style={image.orientationImage === 6 && styles.blocImageLegPortrait}>
                     <Image style={image.orientationImage === 6 ? styles.imageRapportPortrait : styles.imageRapport} source={{uri : image.url,method: "GET"}}/>
                  </View>

                    { dataInterPdf.section === "miseEnPression"?
                    <View style={styles.blocMiseEnPression}>
                    <Text style={styles.legendeImage}>Type de canalisation : réseau d'eau {image.reseau}</Text>
                         <Text style={styles.legendeImageMiseEnPression}>Pression d'épreuve : {image.epreuve}</Text>
                             <Text style={styles.legendeImage}>Durée de la mise en épreuve : 15 minutes</Text>
                     <Text style={styles.legendeImage}>Pression finale : {image.finale}</Text>        
                    </View>
                    :
                   <Text style={image.orientationImage === 6 ? styles.legendeImagePortrait:styles.legendeImage}>{image.legende}</Text>
                    
                    }
                   
              </View>
                


            // </View>


    )})}

</View>

               
      </View> 
      

    </View>
      
    
    
    
)





}


export default BodyInter