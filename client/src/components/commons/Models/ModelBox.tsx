import { Box, useCursor } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { IModelBox, IModelGroup } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  showMenu: boolean;
  group: IModelGroup;
  box: IModelBox;
  gridModel: [number, number, string, string];
  selectedGroup: {
    id: number;
    name: string;
  };
  setselectedGroup: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  showGridModel: boolean;
  selectedModel: {
    type: string;
    id: number;
  };
  setselectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  boxSize: [number, number, number];
  setboxSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelBox(props: Props) {
  const {
    showMenu,
    group,
    box,
    gridModel,
    showGridModel,
    selectedGroup,
    setselectedGroup,
    selectedModel,
    setselectedModel,
    boxSize,
    setboxSize,
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfSize, setselfSize] = useState<[number, number, number]>([
    box.width || 1,
    box.height || 1,
    box.depth || 1,
  ]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    box.xposition || 0,
    box.yposition || 4,
    box.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    box.xrotation || 0,
    box.yrotation || 0,
    box.zrotation || 0,
  ]);
  const [selfColor, setselfColor] = useState<string>(box.color || "#D0021B");

  // hover pointer
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // using ref to override the useEffect clean up original state problem
  const sizeRef = useRef<[number, number, number]>(selfSize);
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const colorRef = useRef<String>(selfColor);
  const selectedRef = useRef<boolean>(false);

  // set size
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfSize(boxSize);
      sizeRef.current = boxSize;
    }
  }, [boxSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setSelfPosition(position);
      positionRef.current = position;
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfRotation(rotation);
      rotationRef.current = rotation;
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfColor(modelColor);
      colorRef.current = modelColor;
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfShowGrid(showGridModel);
      setboxSize(selfSize);
      setposition(selfPosition);
      setrotation(selfRotation);
      setmodelColor(selfColor);
      selectedRef.current = true;
    } else if (selectedRef.current) {
      setselfShowGrid(false);
      saveModel();
      selectedRef.current = false;
    }
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setselectedModel({ type: "boxes", id: box.id || 0 });
    if (selectedGroup.id !== group.id) {
      setselectedGroup({ id: group.id, name: group.group_name });
    }
  }

  // save on leaving page
  useEffect(() => {
    return () => {
      if (selectedRef.current) saveModel();
    };
  }, []);

  function saveModel() {
    if (box.id) {
      // console.log(box.id, "saving box");
      fetch(`/model_boxes/${box.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          width: sizeRef.current[0],
          height: sizeRef.current[1],
          depth: sizeRef.current[2],
          xposition: positionRef.current[0],
          yposition: positionRef.current[1],
          zposition: positionRef.current[2],
          xrotation: rotationRef.current[0],
          yrotation: rotationRef.current[1],
          zrotation: rotationRef.current[2],
          color: colorRef.current,
        }),
      });
    }
  }

  return (
    <>
      <Box
        args={selfSize}
        position={[selfPosition[0], selfPosition[1], selfPosition[2]]}
        rotation={[
          (selfRotation[0] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
        onClick={handleOnClick}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
      >
        {selfShowGrid && (
          <GridLayout
            showMenu={showMenu}
            type="Model"
            gridArgs={gridModel}
            gridPosition={[0, 0, 0]}
          />
        )}
        <meshStandardMaterial color={selfColor} />
      </Box>
    </>
  );
}

export default ModelBox;
