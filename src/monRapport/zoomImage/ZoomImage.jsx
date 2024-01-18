import React from "react";
import "./zoomImage.css"
import ImageCanvas from "../../imageCanvas/ImageCanvas";





const ZoomImage = ({urlZoom,setZoomImage,urlImageZoom}) => {




return (

<>
    <div className="image-zoom" > 
{/* 
   <img className="image-zoom" alt='' src={urlImageZoom} onClick={e => {
 
 e.preventDefault()
 setZoomImage(false)

}}/> */}
<ImageCanvas urlImageZoom={urlImageZoom} setZoomImage={setZoomImage}/>

    </div>

</>


)



} 



export default ZoomImage 