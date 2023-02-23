import React from 'react'
import { Page, Document, StyleSheet} from '@react-pdf/renderer';
import FooterPdf from '../pdf/footer/FooterPdf';
import BodyInter from '../pdf/bodyInter/BodyInter';
import { useState } from 'react';
import HeaderPdf2 from '../pdf/header/HeaderPdf2';
import BodyLandingPage2 from '../pdf/bodyLandingPage/bodyLandingPage2';
import PageTwoPdf from '../pdf/PageTwoPdf';



const Rapport = ({idRapport,dataLoading,dataSend,dataInfoPdf,dataInterPdf}) => {

// const [numberPhoto,setNumberPhoto] = useState(0)
// const [dataTest, setDataTest] = useState(dataIntervention)
const [indexConstatation,setIndexConstatation] = useState(0)



// const changeNumberPhoto = (indexData,indexImage) => {

//   let numberPhoto = 0
//   let totalNumberImage = 0 

//   if(indexData === 0){

//     return numberPhoto = indexImage + 1
//   }else if (indexData > 0){

//    const test = dataTest.filter((e,index) => index <= indexData).map(data => totalNumberImage = data.image.length + totalNumberImage)

//    console.log(test)
      
    // for (let i = 0; i < indexData; i++){

    //  totalNumberImage = totalNumberImage +  dataTest[indexData - 1 ].image.length +  dataTest[indexData - 1 ].image.length
    // //  totalNumberImage+=
    // //  numberPhoto = totalNumberImage + indexImage + indexData

    // console.log(totalNumberImage)

    // }

//   }
// return numberPhoto

// }

    const styles = StyleSheet.create({
        document: { 
            width: '100%',
            height:'100%'
        },
        page: {
          backgroundColor: '#FFFFFF',
          paddingBottom:'120px'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });



    return(
        <Document style={styles.document}>
        <Page wrap size="A4" style={styles.page}>
            <HeaderPdf2 dataInfoPdf={dataInfoPdf}/>
            <BodyLandingPage2 idRapport={idRapport} dataLoading={dataLoading} dataSend={dataSend} dataInfoPdf={dataInfoPdf} dataInterPdf={dataInterPdf}/>
            <FooterPdf/>
        </Page>

<Page>
    <HeaderPdf2/>
          <PageTwoPdf dataInterPdf={dataInterPdf} />
    <FooterPdf/>


</Page>


{dataInterPdf.filter(data => (data.image.length > 0 )&& data.section !== 'vueGlobale').map((dataInter,indexData) => {


  
  return (
    
  <Page key={indexData} size="A4" style={styles.page}>  
          <HeaderPdf2 dataInfoPdf={dataInfoPdf}/>
            <BodyInter setIndexConstatation={setIndexConstatation} indexConstatation={indexConstatation} indexData={indexData} dataInterPdf={dataInter}/>
          <FooterPdf/>
   </Page>
       
    
)})}
        
        
      </Document>
    )
}

export default Rapport