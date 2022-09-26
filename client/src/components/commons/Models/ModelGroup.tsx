import { useEffect, useRef, useState } from "react";
import { IModelGroup } from "../../../Interface";
import GridLayout from "./GridLayout";
import ModelBox from "./ModelBox";
import ModelCylinder from "./ModelCylinder";
import ModelPlane from "./ModelPlane";
import ModelShape from "./ModelShape";
import ModelSphere from "./ModelSphere";

interface Props {
  showMenu: boolean;
  refresh: boolean;
  group: IModelGroup;
  gridGroup: [number, number, string, string];
  showGridGroup: boolean;
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
  groupPosition: [number, number, number];
  setGroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setGroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
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
  boxSize: [number, number, number];
  setBoxSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  sphereSize: [number, number, number, number, number];
  setSphereSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number]>
  >;
  shapeSize: [number, number, number];
  setShapeSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  cylinderSize: [number, number, number, number, number, boolean];
  setCylinderSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number, boolean]>
  >;
  position: [number, number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setModelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelGroup(props: Props) {
  const {
    showMenu,
    refresh,
    group,
    gridGroup,
    showGridGroup,
    gridModel,
    showGridModel,
    selectedGroup,
    setSelectedGroup,
    groupPosition,
    setGroupPosition,
    groupRotation,
    setGroupRotation,
    selectedModel,
    setSelectedModel,
    planeSize,
    setPlaneSize,
    boxSize,
    setBoxSize,
    sphereSize,
    setSphereSize,
    shapeSize,
    setShapeSize,
    cylinderSize,
    setCylinderSize,
    position,
    setPosition,
    rotation,
    setRotation,
    modelColor,
    setModelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setSelfShowGrid] = useState<boolean>(false);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    group.xposition || 0,
    group.yposition || 0,
    group.zposition || 0,
  ]);
  const [selfRotation, setSelfRotation] = useState<[number, number, number]>([
    group.xrotation || 0,
    group.yrotation || 0,
    group.zrotation || 0,
  ]);

  // states for child groups
  const [childGroups, setChildGroups] = useState<IModelGroup[]>([]);

  // using ref to override the useEffect clean up original state problem
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const selectedRef = useRef<boolean>(false);

  const showChildGroups = childGroups.map((group) => (
    <ModelGroup
      key={group.id}
      showMenu={showMenu}
      refresh={refresh}
      group={group}
      gridGroup={gridGroup}
      showGridGroup={showGridGroup}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      groupPosition={groupPosition}
      setGroupPosition={setGroupPosition}
      groupRotation={groupRotation}
      setGroupRotation={setGroupRotation}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      planeSize={planeSize}
      setPlaneSize={setPlaneSize}
      boxSize={boxSize}
      setBoxSize={setBoxSize}
      sphereSize={sphereSize}
      setSphereSize={setSphereSize}
      shapeSize={shapeSize}
      setShapeSize={setShapeSize}
      cylinderSize={cylinderSize}
      setCylinderSize={setCylinderSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  const showModelPlanes = group.model_planes?.map((plane) => (
    <ModelPlane
      key={plane.id}
      showMenu={showMenu}
      group={group}
      plane={plane}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      planeSize={planeSize}
      setPlaneSize={setPlaneSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  const showModelShapes = group.model_shapes?.map((shape) => (
    <ModelShape
      key={shape.id}
      showMenu={showMenu}
      group={group}
      shape={shape}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      shapeSize={shapeSize}
      setShapeSize={setShapeSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  const showModelBoxes = group.model_boxes?.map((box) => (
    <ModelBox
      key={box.id}
      showMenu={showMenu}
      group={group}
      box={box}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      boxSize={boxSize}
      setBoxSize={setBoxSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  const showModelSpheres = group.model_spheres?.map((sphere) => (
    <ModelSphere
      key={sphere.id}
      showMenu={showMenu}
      group={group}
      sphere={sphere}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      sphereSize={sphereSize}
      setSphereSize={setSphereSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  const showModelCylinders = group.model_cylinders?.map((cylinder) => (
    <ModelCylinder
      key={cylinder.id}
      showMenu={showMenu}
      group={group}
      cylinder={cylinder}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      cylinderSize={cylinderSize}
      setCylinderSize={setCylinderSize}
      position={position}
      setPosition={setPosition}
      rotation={rotation}
      setRotation={setRotation}
      modelColor={modelColor}
      setModelColor={setModelColor}
    />
  ));

  // get all child groups
  useEffect(() => {
    if (group.id > 0) {
      fetch(`/model_groups/${group.id}`)
        .then((res) => res.json())
        .then((data) => setChildGroups(data.child_groups));
    }
  }, [group]);

  // set position
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setSelfPosition(groupPosition);
      positionRef.current = groupPosition;
    }
  }, [groupPosition]);

  // set rotation
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setSelfRotation(groupRotation);
      rotationRef.current = groupRotation;
    }
  }, [groupRotation]);

  // toggle grids
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setSelfShowGrid(showGridGroup);
    }
  }, [showGridGroup]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setGroupPosition(selfPosition);
      setGroupRotation(selfRotation);
      setSelfShowGrid(showGridGroup);
      selectedRef.current = true;
    } else if (selectedRef.current) {
      setSelfShowGrid(false);
      saveGroup();
      selectedRef.current = false;
    }
    // console.log(group.group_name, selectedRef);
  }, [selectedGroup]);

  // save on leaving page
  useEffect(() => {
    return () => {
      if (selectedRef.current) saveGroup();
    };
  }, []);

  function saveGroup() {
    if (group.id) {
      // console.log(group.group_name, "saving group");
      fetch(`/model_groups/${group.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xposition: positionRef.current[0],
          yposition: positionRef.current[1],
          zposition: positionRef.current[2],
          xrotation: rotationRef.current[0],
          yrotation: rotationRef.current[1],
          zrotation: rotationRef.current[2],
        }),
      });
    }
  }

  return (
    <>
      <group
        position={selfPosition}
        rotation={[
          (selfRotation[0] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
      >
        {selfShowGrid && (
          <GridLayout
            showMenu={showMenu}
            type="Group"
            gridArgs={gridGroup}
            gridPosition={[0, 0, 0]}
          />
        )}
        {showChildGroups}
        {showModelPlanes}
        {showModelShapes}
        {showModelBoxes}
        {showModelSpheres}
        {showModelCylinders}
      </group>
    </>
  );
}

export default ModelGroup;
