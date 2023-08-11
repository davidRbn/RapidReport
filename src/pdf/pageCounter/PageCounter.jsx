import { StyleSheet, Text } from "@react-pdf/renderer";
import React from "react";



const PageCounter = () => {


    const styles = StyleSheet.create({


        pageCounter:{

            position:'absolute',
            right:'5px',
            bottom:'5px',
            fontSize:'10px'
            
        }

    })


    return(

<>
<Text style={styles.pageCounter} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />


</>


    )


}

export default PageCounter