import { Sphere, useCursor } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { DoubleSide } from "three";
import { IModelGroup, IModelSphere } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  showMenu: boolean;
  group: IModelGroup;
  sphere: IModelSphere;
  gridModel: [number, number, string, string];
  showGridModel: boolean;
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
  sphereSize: [number, number, number, number, number];
  setsphereSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number]>
  >;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelSphere(props: Props) {
  const {
    showMenu,
    group,
    sphere,
    gridModel,
    showGridModel,
    selectedGroup,
    setselectedGroup,
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
  const [selfSize, setselfSize] = useState<
    [number, number, number, number, number]
  >([
    sphere.radius || 0.5,
    sphere.width_segments || 32,
    sphere.height_segments || 16,
    sphere.phi_length || 360,
    sphere.theta_length || 360,
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

  // hover pointer
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // using ref to override the useEffect clean up original state problem
  const sizeRef = useRef<[number, number, number, number, number]>(selfSize);
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const colorRef = useRef<String>(selfColor);
  const selectedRef = useRef<boolean>(false);

  // set size
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfSize(sphereSize);
      sizeRef.current = sphereSize;
    }
  }, [sphereSize]);

  // set position
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setSelfPosition(position);
      positionRef.current = position;
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfRotation(rotation);
      rotationRef.current = rotation;
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "spheres" && selectedModel.id === sphere.id) {
      setselfColor(modelColor);
      colorRef.current = modelColor;
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
    setselectedModel({ type: "spheres", id: sphere.id || 0 });
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
    if (sphere.id) {
      // console.log(sphere.id, "saving sphere");
      fetch(`/model_spheres/${sphere.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radius: sizeRef.current[0],
          width_segments: sizeRef.current[1],
          height_segments: sizeRef.current[2],
          phi_length: sizeRef.current[3],
          theta_length: sizeRef.current[4],
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
      <Sphere
        args={[
          selfSize[0],
          selfSize[1],
          selfSize[2],
          0,
          (selfSize[3] / 360) * Math.PI * 2,
          0,
          (selfSize[4] / 360) * Math.PI,
        ]}
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
        <meshStandardMaterial color={selfColor} side={DoubleSide} />
      </Sphere>
    </>
  );
}

export default ModelSphere;
