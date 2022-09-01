import { Plane } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { DoubleSide } from "three";
import { ModelPlaneProps } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  plane: ModelPlaneProps;
  gridModel: [number, number, string, string];
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
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelPlane(props: Props) {
  const {
    plane,
    gridModel,
    showGridModel,
    selectedModel,
    setselectedModel,
    planeSize,
    setplaneSize,
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfSize, setselfSize] = useState<[number, number]>([
    plane.width || 10,
    plane.depth || 10,
  ]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    plane.xposition || 0,
    plane.yposition || 0,
    plane.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    plane.xrotation || 0,
    plane.yrotation || 0,
    plane.zrotation || 0,
  ]);
  const [selfColor, setselfColor] = useState<string>(plane.color || "#678546");
  const [selfSelected, setselfSelected] = useState<boolean>(false);

  // using ref to override the useEffect clean up original state problem
  const sizeRef = useRef<[number, number]>(selfSize);
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const colorRef = useRef<String>(selfColor);
  const selectedRef = useRef<boolean>(false);

  // set size
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfSize(planeSize);
      sizeRef.current = planeSize;
    }
  }, [planeSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfPosition(position);
      positionRef.current = position;
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfRotation(rotation);
      rotationRef.current = rotation;
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfColor(modelColor);
      colorRef.current = modelColor;
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfShowGrid(showGridModel);
      setplaneSize(selfSize);
      setposition(selfPosition);
      setrotation(selfRotation);
      setmodelColor(selfColor);
      setselfSelected(true);
      selectedRef.current = true;
    } else if (selectedRef.current) {
      setselfShowGrid(false);
      saveModel();
      selectedRef.current = false;
    }
    // console.log(plane.id, selectedRef);
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setselectedModel({ type: "planes", id: plane.id || 0 });
  }

  // save on leaving page
  useEffect(() => {
    return () => {
      if (selectedRef.current) saveModel();
    };
  }, []);

  function saveModel() {
    if (plane.id) {
      // console.log(plane.id, "saving plane");
      fetch(`/model_planes/${plane.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          width: sizeRef.current[0],
          depth: sizeRef.current[1],
          xposition: positionRef.current[0],
          yposition: positionRef.current[1],
          zposition: positionRef.current[2],
          xrotation: rotationRef.current[0],
          yrotation: rotationRef.current[1],
          zrotation: rotationRef.current[2],
          color: colorRef,
        }),
      });
    }
  }

  return (
    <>
      <Plane
        args={selfSize}
        position={selfPosition}
        rotation={[
          ((selfRotation[0] - 90) / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
        ]}
        receiveShadow
        onClick={handleOnClick}
      >
        {selfShowGrid && (
          <GridLayout
            type="Model"
            gridArgs={gridModel}
            gridPosition={[0, 0, 0]}
          />
        )}
        <meshBasicMaterial color={selfColor} side={DoubleSide} />
      </Plane>
    </>
  );
}

export default ModelPlane;
