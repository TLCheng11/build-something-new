import { Edges, Plane, useCursor } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { DoubleSide } from "three";
import { IModelGroup, IModelPlane } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  showMenu: boolean;
  group: IModelGroup;
  plane: IModelPlane;
  gridModel: [number, number, string, string];
  showGridModel: boolean;
  selectedGroup: {
    id: number;
    name: string;
  };
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  selectedModel: {
    type: string;
    id: number;
  };
  setSelectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  planeSize: [number, number];
  setPlaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  position: [number, number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setModelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelPlane(props: Props) {
  const {
    showMenu,
    group,
    plane,
    gridModel,
    showGridModel,
    selectedGroup,
    setSelectedGroup,
    selectedModel,
    setSelectedModel,
    planeSize,
    setPlaneSize,
    position,
    setPosition,
    rotation,
    setRotation,
    modelColor,
    setModelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setSelfShowGrid] = useState<boolean>(false);
  const [selfSize, setSelfSize] = useState<[number, number]>([
    plane.width || 10,
    plane.depth || 10,
  ]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    plane.xposition || 0,
    plane.yposition || 0,
    plane.zposition || 0,
  ]);
  const [selfRotation, setSelfRotation] = useState<[number, number, number]>([
    plane.xrotation || 0,
    plane.yrotation || 0,
    plane.zrotation || 0,
  ]);
  const [selfColor, setSelfColor] = useState<string>(plane.color || "#678546");

  // hover pointer
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // using ref to override the useEffect clean up original state problem
  const sizeRef = useRef<[number, number]>(selfSize);
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const colorRef = useRef<String>(selfColor);
  const selectedRef = useRef<boolean>(false);

  // set size
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfSize(planeSize);
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
      setSelfRotation(rotation);
      rotationRef.current = rotation;
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfColor(modelColor);
      colorRef.current = modelColor;
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedModel.type === "planes" && selectedModel.id === plane.id) {
      setSelfShowGrid(showGridModel);
      setPlaneSize(selfSize);
      setPosition(selfPosition);
      setRotation(selfRotation);
      setModelColor(selfColor);
      selectedRef.current = true;
    } else if (selectedRef.current) {
      setSelfShowGrid(false);
      saveModel();
      selectedRef.current = false;
    }
  }, [selectedModel]);

  // lock self as selected item when clicked
  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setSelectedModel({ type: "planes", id: plane.id || 0 });
    if (selectedGroup.id !== group.id) {
      setSelectedGroup({ id: group.id, name: group.group_name });
    }
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
          color: colorRef.current,
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
        castShadow
        receiveShadow
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
        <Edges
          visible={selectedRef.current || hovered}
          scale={1.05}
          color={"yellow"}
        ></Edges>
      </Plane>
    </>
  );
}

export default ModelPlane;
