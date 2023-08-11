import React from "react";
import "./zoomImage.css"





const ZoomImage = ({urlZoom,setZoomImage,urlImageZoom}) => {




return (

<>
    <div > 

   <img className="image-zoom" alt='' src={urlImageZoom} onClick={e => {
 
 e.preventDefault()
 setZoomImage(false)


}}/>

    </div>

</>


)



} 



export default ZoomImage 