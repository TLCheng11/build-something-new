import { Cylinder, Edges, useCursor } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "react-three-fiber";
import { DoubleSide } from "three";
import { IModelGroup, IModelCylinder } from "../../../Interface";
import GridLayout from "./GridLayout";

interface Props {
  showMenu: boolean;
  group: IModelGroup;
  cylinder: IModelCylinder;
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
  cylinderSize: [number, number, number, number, number, boolean];
  setcylinderSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number, boolean]>
  >;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelCylinder(props: Props) {
  const {
    showMenu,
    group,
    cylinder,
    gridModel,
    showGridModel,
    selectedGroup,
    setselectedGroup,
    selectedModel,
    setselectedModel,
    cylinderSize,
    setcylinderSize,
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
    [number, number, number, number, number, boolean]
  >([
    cylinder.radius_top || 0,
    cylinder.radius_bottom || 0,
    cylinder.height || 1,
    cylinder.segments || 3,
    cylinder.theta_length || 360,
    cylinder.open_ended || false,
  ]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    cylinder.xposition || 0,
    cylinder.yposition || 0,
    cylinder.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    cylinder.xrotation || 0,
    cylinder.yrotation || 0,
    cylinder.zrotation || 0,
  ]);
  const [selfColor, setselfColor] = useState<string>(
    cylinder.color || "#952DAA"
  );

  // hover pointer
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // using ref to override the useEffect clean up original state problem
  const sizeRef =
    useRef<[number, number, number, number, number, boolean]>(selfSize);
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const colorRef = useRef<String>(selfColor);
  const selectedRef = useRef<boolean>(false);

  // set size
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setselfSize(cylinderSize);
      sizeRef.current = cylinderSize;
    }
  }, [cylinderSize]);

  // set position
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setSelfPosition(position);
      positionRef.current = position;
    }
  }, [position]);

  // set rotation
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setselfRotation(rotation);
      rotationRef.current = rotation;
    }
  }, [rotation]);

  // set color
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setselfColor(modelColor);
      colorRef.current = modelColor;
    }
  }, [modelColor]);

  // toggle grids
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setselfShowGrid(showGridModel);
    }
  }, [showGridModel]);

  // set all self properties from history when selection
  useEffect(() => {
    if (
      selectedModel.type === "cylinders" &&
      selectedModel.id === cylinder.id
    ) {
      setselfShowGrid(showGridModel);
      setcylinderSize(selfSize);
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
    setselectedModel({ type: "cylinders", id: cylinder.id || 0 });
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
    if (cylinder.id) {
      // console.log(cylinder.id, "saving cylinder");
      fetch(`/model_cylinders/${cylinder.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radius_top: sizeRef.current[0],
          radius_bottom: sizeRef.current[1],
          height: sizeRef.current[2],
          segments: sizeRef.current[3],
          theta_length: sizeRef.current[4],
          open_ended: sizeRef.current[5],
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
      <Cylinder
        args={[
          selfSize[0],
          selfSize[1],
          selfSize[2],
          selfSize[3],
          1,
          selfSize[5],
          0,
          (selfSize[4] / 360) * Math.PI * 2,
        ]}
        position={[selfPosition[0], selfPosition[1], selfPosition[2]]}
        rotation={[
          (selfRotation[0] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
        onClick={handleOnClick}
        castShadow
        receiveShadow
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
      </Cylinder>
    </>
  );
}

export default ModelCylinder;
