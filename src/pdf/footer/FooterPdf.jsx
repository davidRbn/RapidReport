import React from "react";
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import globalColor from "../globalStyles/globalStyles";




const FooterPdf = () => {

    const stylesFooter = StyleSheet.create({
        
        sectionFooter:{

            width:'100%',
            height:'80px',
            position :'absolute',
            bottom:'5px',
            textAlign:'center',
            marginTop:'20px',
            
        },
        textFooter:{

            fontSize:`${globalColor.textSize}`,
            padding:'3px',
            color:'grey'
        }

    })

    return(

        
        <View fixed style={stylesFooter.sectionFooter}>
            <Text style={stylesFooter.textFooter}>SIN&amp;TEC SUD – SARL au capital de 10 000 000.00 € - 106 Allée Ampère 13240 GEMENOS</Text>
                    <Text style={stylesFooter.textFooter}>Tél : 0 488 603 911 – SIRET 878 101 658 / FR35 878 101 658 – R.C.S. Marseille</Text>
                        <Text style={stylesFooter.textFooter}>www.groupesinettec.com</Text>
                    <Text style={stylesFooter.textFooter}>Groupe MANAGEMENT PROJECTS</Text>
        </View>
        
        
    )
}

export default FooterPdf