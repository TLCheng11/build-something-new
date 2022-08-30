import { Box } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import GridLayout from "../../DesignPage/DesignUtility/GridLayout";

interface Props {
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
  boxSize: [number, number, number];
  setboxSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
  id: number;
}

function ModelBox(props: Props) {
  const {
    gridModel,
    showGridModel,
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
    id,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfSize, setselfSize] = useState<[number, number, number]>([1, 1, 1]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfColor, setselfColor] = useState<string>("#000");

  // set size
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setselfSize(boxSize);
    }
  }, [boxSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setSelfPosition(position);
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setselfColor(modelColor);
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "box" && selectedModel.id === id) {
      setselfShowGrid(showGridModel);
      setboxSize(selfSize);
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
    setselectedModel({ type: "box", id });
  }

  return (
    <>
      <Box
        args={selfSize}
        onClick={handleOnClick}
        position={[
          selfPosition[0],
          selfPosition[1] + selfSize[1] / 2,
          selfPosition[2],
        ]}
        rotation={[
          (selfRotation[0] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
      >
        {selfShowGrid && (
          <GridLayout
            type="Model"
            gridArgs={gridModel}
            gridPosition={selfPosition}
          />
        )}
        <meshBasicMaterial color={selfColor} />
      </Box>
    </>
  );
}

export default ModelBox;
