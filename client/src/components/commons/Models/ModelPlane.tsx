import { Plane } from "@react-three/drei";
import { useEffect, useState } from "react";
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
    id,
  } = props;
  const [selfSize, setselfSize] = useState<[number, number]>([10, 10]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);

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

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "Plane" && selectedModel.id === id) {
      setplaneSize(selfSize);
      setposition(selfPosition);
      setrotation(selfRotation);
      setselfShowGrid(showGridModel);
    } else {
      setselfShowGrid(false);
    }
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick() {
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
      >
        <meshNormalMaterial />
      </Plane>
    </>
  );
}

export default ModelPlane;
