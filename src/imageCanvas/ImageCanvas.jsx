import React, { Fragment, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
import useImage from "use-image";
import './imageCanvas.css'
import CircleCanvas from "./Circle";
// import imageCompression from 'browser-image-compression';
import Resizer from "react-image-file-resizer";



const ImageCanvas = ({setZoomImage,urlImageZoom,index,indexImage,setDataInter,dataInter,setContainFile,imageWidth,imageHeight,setCanvasImageLoaded}) => {

    const stageRef = React.useRef(null);
    const imageref = React.useRef(null)
    const shapeRef = React.useRef();


    const initialRectangles = [
        {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          stroke: 'red',
          id: 'rect1',
        }
      ];

      const initialCircle = [
        {
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          stroke: 'red',
          id: 'circle1',
        }
      ];

    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [circle, setCircle] = React.useState(initialCircle);

    const [selectedId, selectShape] = React.useState(null);
    const [selectRect,setSelectRect] = useState(false)
    const [selectCircle,setSelectCircle] = useState(false)



    const [im] = useImage(urlImageZoom,'Anonymous')

    let imageAspectRatio = im && (imageHeight < imageWidth) ? imageWidth / imageHeight : im && (imageHeight > imageWidth) ? imageHeight / imageWidth : 1;
    let screenHeight = window.innerHeight * 0.80

    let screenWidth = (window.innerWidth) > 700 && (imageHeight < imageWidth) ? window.innerWidth * 0.60  : window.innerWidth <= 700 && imageHeight < imageWidth ? window.innerWidth * 0.95 : screenHeight / imageAspectRatio
    let stageWidth = screenWidth;

    let stageHeight = imageWidth > imageHeight ? stageWidth / imageAspectRatio : screenHeight


    
   

    const handleExport = async (e) => {
        e.preventDefault()

        setZoomImage(false)
        setCanvasImageLoaded(true)

        stageRef.current.width(imageWidth);
        stageRef.current.height(imageHeight);

        imageref.current.width(imageWidth);
        imageref.current.height(imageHeight);


        const scaleFactorX = imageWidth / stageWidth;
        const scaleFactorY = imageHeight / stageHeight;

     



       selectRect && rectangles.forEach(rect => {
        
            shapeRef.current.x(rect.x * scaleFactorX)
            shapeRef.current.y( rect.y * scaleFactorY)
            shapeRef.current.width(rect.width * scaleFactorX)
            shapeRef.current.height(rect.height * scaleFactorY)


        });

       selectCircle && circle.forEach(rect => {
        
            shapeRef.current.x(rect.x * scaleFactorX)
            shapeRef.current.y( rect.y * scaleFactorY)
            shapeRef.current.width(rect.width * scaleFactorX)
            shapeRef.current.height(rect.height * scaleFactorY)


        });
    
        const uri = stageRef.current.toDataURL();

        const response = await fetch(uri);
        const blobImageCanvas = await response.blob();

        // const options = {
        //     maxSizeMB: 0.7,
        //     maxWidthOrHeight: 1920,
        //     useWebWorker: true,
        //     fileType:'image/png',
        //     onprogress:(e) => console.log(e)
        //   }
        //   try {
             
           

        //     const compressedFile = await imageCompression(blobImageCanvas, options);
        //     console.log(compressedFile);
          
        //     handleUploadImage(compressedFile,index,indexImage)

        //   } catch (error) {
        //     console.log(error);
        //   }


        Resizer.imageFileResizer(
            blobImageCanvas,
            1000,
            1000,
            "JPEG",
            100,
            0,
            (uri) => {
               handleUploadImage(uri,index,indexImage)

            },
           "blob"
    
          )

       
        // we also can save uri as file
        // but in the demo on Konva website it will not work
        // because of iframe restrictions
        // but feel free to use it in your apps:
        // downloadURI(uri, 'stage.png');
      };

      const handleUploadImage = (blob,index,indexImage) => {

        let url =   URL.createObjectURL(blob)

        
    const newDataInterImage = dataInter.map((data, i) => {
       if (index === i) {
         const neww = data.image.map((image, i) => i === indexImage ? { ...image, file : blob, url : url } : { ...image })
         return { ...data, image: neww }
       }
       else { return data }
     }
 
     )
     setDataInter(newDataInterImage)
     setContainFile((prevState) => prevState + 1)
     setZoomImage(false)
     setCanvasImageLoaded(false)


    }

    const checkDeselect = (e) => {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target.attrs.image ? true : false
      if (clickedOnEmpty) {
        selectShape(null);
      }
    };
  
   console.log(rectangles);
    // const screenWidth = window.innerWidth > 700 && window.innerWidth < 1200 ? 500 : window.innerWidth
    // const screenWidth = window.innerWidth * 0.95
    // const stageWidth = screenWidth;
    // const imageAspectRatio = im ? imageWidth / imageHeight : 1;
    // const stageHeight = stageWidth / imageAspectRatio;

    return (
        <div className="image-zoom" > 
       <Fragment>
        <button  className="btn-canvas" onClick={(e) =>{
            e.preventDefault()
            setSelectRect(!selectRect)
        } }>Rectangle</button>
        <button className="btn-canvas" onClick={(e) =>{
            e.preventDefault()
            setSelectCircle(!selectCircle)
        } }>Cercle</button>
       
        <button className="btn-close-canvas" onClick={(e) => {
            e.preventDefault()
            setZoomImage(false)
        }}>Fermer</button>
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={checkDeselect}
        onTouchStart={ checkDeselect}
        ref={stageRef}

      >

     
        <Layer>
        <Image
        ref={imageref}
        // onClick={() => {
            
        //     selectShape(null)}}
        image={im}
        width={stageWidth}
        height={stageHeight}
        />
       


        {selectRect &&
          rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeRef={shapeRef}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}

{selectCircle &&
          circle.map((rect, i) => {
            return (
              <CircleCanvas
                shapeRef={shapeRef}
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  const circles = circle.slice();
                  circles[i] = newAttrs;
                  setCircle(circles);
                }}
              />
            );
          })}


        </Layer>
      </Stage>
      </Fragment> 
      <button className="btn-canvas-registrer" onClick={(e) => handleExport(e)}>Enregistrer Image</button>
      </div>
    );

}

export default ImageCanvas