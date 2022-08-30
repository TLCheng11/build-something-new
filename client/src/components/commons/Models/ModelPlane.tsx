import { Plane } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import GridLayout from "../../DesignPage/DesignUtility/GridLayout";

interface Props {
  gridModel: [number, number, string, string];
  showGridModel: boolean;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
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
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
  id: number;
}

function ModelPlane(props: Props) {
  const {
    gridModel,
    showGridModel,
    planeSize,
    setplaneSize,
    selectedModel,
    setselectedModel,
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
    id,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfSize, setselfSize] = useState<[number, number]>([10, 10]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfColor, setselfColor] = useState<string>("#000");

  // set size
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setselfSize(planeSize);
    }
  }, [planeSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setSelfPosition(position);
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setselfColor(modelColor);
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
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
    setselectedModel({ type: "Plane", id });
  }

  return (
    <>
      {selfShowGrid && (
        <GridLayout
          type="Model"
          gridArgs={gridModel}
          gridPosition={selfPosition}
        />
      )}
      <Plane
        args={selfSize}
        onClick={handleOnClick}
        position={selfPosition}
        rotation={[
          ((selfRotation[0] - 90) / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
        receiveShadow
      >
        <meshBasicMaterial color={selfColor} />
      </Plane>
    </>
  );
}

export default ModelPlane;
