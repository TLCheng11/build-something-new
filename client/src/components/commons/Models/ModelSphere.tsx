import { Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { ModelSphereProps } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  sphere: ModelSphereProps;
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
  sphereSize: [number, number, number];
  setsphereSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelSphere(props: Props) {
  const {
    sphere,
    gridModel,
    showGridModel,
    selectedModel,
    setselectedModel,
    sphereSize,
    setsphereSize,
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
    sphere.radius || 0.5,
    sphere.width_segments || 32,
    sphere.height_segments || 16,
  ]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    sphere.xposition || 0,
    sphere.yposition || 4,
    sphere.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    sphere.xrotation || 0,
    sphere.yrotation || 0,
    sphere.zrotation || 0,
  ]);
  const [selfColor, setselfColor] = useState<string>(sphere.color || "#396BA7");

  // set size
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfSize(sphereSize);
    }
  }, [sphereSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setSelfPosition(position);
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfColor(modelColor);
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfShowGrid(showGridModel);
      setsphereSize(selfSize);
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
    setselectedModel({ type: "spheres", id: sphere.id || 0 });
  }

  return (
    <>
      <Sphere
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
      </Sphere>
    </>
  );
}

export default ModelSphere;
