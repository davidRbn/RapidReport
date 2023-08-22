import React from "react";
import { Arrow, Transformer } from "react-konva";


const ArrowCanvas = ({shapeProps, isSelected, onSelect, onChange,arrowRef}) => {

    const trRef = React.useRef();


    React.useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          trRef.current.nodes([arrowRef.current]);
          trRef.current.getLayer().batchDraw();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSelected]);




return (
    <>
    <React.Fragment>
    <Arrow
      onClick={onSelect}
      onTap={onSelect}
      ref={arrowRef}
      {...shapeProps}
      draggable
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = arrowRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          points: [0,0,Math.max(shapeProps.points[2] * scaleX), Math.max(shapeProps.points[3] * scaleY)],
        //   pointerHeight: Math.max(node.height() * scaleY),
        });
      }}
     
    />
     {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    
    </React.Fragment>
    </>
)

}


export default ArrowCanvas