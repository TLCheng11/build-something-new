import { Plane } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
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

  // set size
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfSize(planeSize);
    }
  }, [planeSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfPosition(position);
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setselfColor(modelColor);
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
    } else {
      setselfShowGrid(false);
    }
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setselectedModel({ type: "planes", id: plane.id || 0 });
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
        <meshBasicMaterial color={selfColor} />
      </Plane>
    </>
  );
}

export default ModelPlane;
