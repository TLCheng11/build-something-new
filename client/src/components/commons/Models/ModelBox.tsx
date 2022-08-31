import { Box } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { ModelBoxProps } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  box: ModelBoxProps;
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
}

function ModelBox(props: Props) {
  const {
    box,
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

  // set size
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfSize(boxSize);
    }
  }, [boxSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setSelfPosition(position);
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "boxes" && selectedModel.id === box.id) {
      setselfColor(modelColor);
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
    } else {
      setselfShowGrid(false);
    }
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setselectedModel({ type: "boxes", id: box.id || 0 });
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
      >
        {selfShowGrid && (
          <GridLayout
            type="Model"
            gridArgs={gridModel}
            gridPosition={[0, 0, 0]}
          />
        )}
        <meshBasicMaterial color={selfColor} />
      </Box>
    </>
  );
}

export default ModelBox;
