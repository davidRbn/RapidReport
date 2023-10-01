import React, { Fragment, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
import useImage from "use-image";
import './imageCanvas.css'
import CircleCanvas from "./Circle";
// import imageCompression from 'browser-image-compression';
import Resizer from "react-image-file-resizer";
import ArrowCanvas from "./ArrowCanvas";



const ImageCanvas = ({setZoomImage,zoomImage,urlImageZoom,index,indexImage,setDataInter,dataInter,setContainFile,imageWidth,imageHeight,setCanvasImageLoaded}) => {

    const stageRef = React.useRef(null);
    const imageref = React.useRef(null)
    const shapeRef = React.useRef(null);
    const circleRef = React.useRef(null)
    const arrowRef = React.useRef(null)

    const [im] = useImage(urlImageZoom,'Anonymous')

    let imageAspectRatio = urlImageZoom && (imageHeight < imageWidth) ? imageWidth / imageHeight : urlImageZoom && (imageHeight > imageWidth) ? imageHeight / imageWidth : 1;
    let screenHeight = window.innerHeight * 0.50

    let screenWidth = (window.innerWidth) > 700 && (imageHeight < imageWidth) ? window.innerWidth * 0.50  : window.innerWidth <= 700 && imageHeight < imageWidth ? window.innerWidth * 0.95 : screenHeight / imageAspectRatio
     let stageWidth = screenWidth;

     let stageHeight = imageWidth > imageHeight ? stageWidth / imageAspectRatio : screenHeight


    const initialRectangles = [
        {
          x: 10,
          y: 10,    
          width: 100,
          height: 100,
          strokeWidth:5,
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
          strokeWidth:5,
          stroke: 'red',
          id: 'circle1',
        }
      ];

      const initialArrow = [
        {
            x: 100,
            y: 100,
            pointerLength: 10,
            pointerWidth: 10,
            points: [0, 0, 150, 150],
            fill: 'red',
            stroke: 'red',
            strokeWidth: 5,
            id:'arrow1'
        }
      ];

    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [circle, setCircle] = React.useState(initialCircle);
    const [arrow,setArrow] = React.useState(initialArrow)

    const [selectedId, selectShape] = React.useState(null);
    const [selectRect,setSelectRect] = useState(false)
    const [selectCircle,setSelectCircle] = useState(false)
    const [selectArrow,setSelectArrow] = useState(false)
 







    // let imageAspectRatio = urlImageZoom && (imageHeight < imageWidth) ? imageWidth / imageHeight : urlImageZoom && (imageHeight > imageWidth) ? imageHeight / imageWidth : 1;
    // let screenHeight = window.innerHeight * 0.50

    // let screenWidth = (window.innerWidth) > 700 && (imageHeight < imageWidth) ? window.innerWidth * 0.60  : window.innerWidth <= 700 && imageHeight < imageWidth ? window.innerWidth * 0.95 : screenHeight / imageAspectRatio
    //  stageWidth = screenWidth;

    //  stageHeight = imageWidth > imageHeight ? stageWidth / imageAspectRatio : screenHeight

    //  setCalculDimensionFinish(true)




   
    const handleExport = async (e) => {
        e.preventDefault()

        console.log('image canvas')
        setCanvasImageLoaded(true)
        setZoomImage(false)

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
            shapeRef.current.strokeWidth(rect.strokeWidth * 5)


        });

       selectCircle && circle.forEach(rect => {
        
            circleRef.current.x(rect.x * scaleFactorX)
            circleRef.current.y( rect.y * scaleFactorY)
            circleRef.current.width(rect.width * scaleFactorX)
            circleRef.current.height(rect.height * scaleFactorY)
            circleRef.current.strokeWidth(rect.strokeWidth * 5)



        });

        selectArrow && arrow.forEach(arr => {

        
              arrowRef.current.x(arr.x * scaleFactorX)
              arrowRef.current.y( arr.y * scaleFactorY)
              arrowRef.current.points([0,0,arr.points[2] * scaleFactorX,arr.points[3] * scaleFactorY])
              arrowRef.current.strokeWidth(arr.strokeWidth * 5)
              arrowRef.current.pointerLength(arr.pointerLength * 8)
              arrowRef.current.pointerWidth(arr.pointerWidth * 8)
              // circleRef.current.width(arr.width * scaleFactorX)
              // circleRef.current.height(arr.height * scaleFactorY)
  
  
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
            800,
            800,
            "PNG",
            80,
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
         <button className="btn-canvas" onClick={(e) =>{
            e.preventDefault()
            setSelectArrow(!selectArrow)
        } }>Fleche</button>
       
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
              circleRef={circleRef}
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
             {selectArrow &&
             
             arrow.map((arr, i) => {
            return (
              <ArrowCanvas
              arrowRef={arrowRef}
                key={i}
                shapeProps={arr}
                isSelected={arr.id === selectedId}
                onSelect={() => {
                    selectShape(arr.id);
                  }}
                  onChange={(newAttrs) => {
                    const arrows = arrow.slice();
                    arrows[i] = newAttrs;
                    setArrow(arrows);
                  }}
               
              />
            );
          })}
     

        </Layer>
      </Stage>
      </Fragment>
   
      <button className="btn-canvas-registrer" onClick={(e) => {handleExport(e)}}>Enregistrer Image</button>
      </div>
    );

}

export default ImageCanvas