import { useEffect, useRef, useState } from "react";
import { IModelGroup } from "../../../Interface";
import GridLayout from "./GridLayout";
import ModelBox from "./ModelBox";
import ModelPlane from "./ModelPlane";
import ModelShape from "./ModelShape";
import ModelSphere from "./ModelSphere";

interface Props {
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
  setselectedGroup: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  groupPosition: [number, number, number];
  setgroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setgroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
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
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  boxSize: [number, number, number];
  setboxSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  sphereSize: [number, number, number];
  setsphereSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  shapeSize: [number, number, number];
  setshapeSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelGroup(props: Props) {
  const {
    refresh,
    group,
    gridGroup,
    showGridGroup,
    gridModel,
    showGridModel,
    selectedGroup,
    setselectedGroup,
    groupPosition,
    setgroupPosition,
    groupRotation,
    setgroupRotation,
    selectedModel,
    setselectedModel,
    planeSize,
    setplaneSize,
    boxSize,
    setboxSize,
    sphereSize,
    setsphereSize,
    shapeSize,
    setshapeSize,
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    group.xposition || 0,
    group.yposition || 0,
    group.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    group.xrotation || 0,
    group.yrotation || 0,
    group.zrotation || 0,
  ]);

  // states for child groups
  const [childGroups, setchildGroups] = useState<IModelGroup[]>([]);

  // using ref to override the useEffect clean up original state problem
  const positionRef = useRef<[number, number, number]>(selfPosition);
  const rotationRef = useRef<[number, number, number]>(selfRotation);
  const selectedRef = useRef<boolean>(false);

  const showChildGroups = childGroups.map((group) => (
    <ModelGroup
      refresh={refresh}
      key={group.id}
      group={group}
      gridGroup={gridGroup}
      showGridGroup={showGridGroup}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setselectedGroup={setselectedGroup}
      groupPosition={groupPosition}
      setgroupPosition={setgroupPosition}
      groupRotation={groupRotation}
      setgroupRotation={setgroupRotation}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      planeSize={planeSize}
      setplaneSize={setplaneSize}
      boxSize={boxSize}
      setboxSize={setboxSize}
      sphereSize={sphereSize}
      setsphereSize={setsphereSize}
      shapeSize={shapeSize}
      setshapeSize={setshapeSize}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelPlanes = group.model_planes?.map((plane) => (
    <ModelPlane
      key={plane.id}
      plane={plane}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setselectedGroup={setselectedGroup}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      planeSize={planeSize}
      setplaneSize={setplaneSize}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelShapes = group.model_shapes?.map((shape) => (
    <ModelShape
      key={shape.id}
      shape={shape}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setselectedGroup={setselectedGroup}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      shapeSize={shapeSize}
      setshapeSize={setshapeSize}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelBoxes = group.model_boxes?.map((box) => (
    <ModelBox
      key={box.id}
      box={box}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setselectedGroup={setselectedGroup}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      boxSize={boxSize}
      setboxSize={setboxSize}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelSpheres = group.model_spheres?.map((sphere) => (
    <ModelSphere
      key={sphere.id}
      sphere={sphere}
      gridModel={gridModel}
      showGridModel={showGridModel}
      selectedGroup={selectedGroup}
      setselectedGroup={setselectedGroup}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      sphereSize={sphereSize}
      setsphereSize={setsphereSize}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  // get all child groups
  useEffect(() => {
    if (group.id > 0) {
      fetch(`/model_groups/${group.id}`)
        .then((res) => res.json())
        .then((data) => setchildGroups(data.child_groups));
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
      setselfRotation(groupRotation);
      rotationRef.current = groupRotation;
    }
  }, [groupRotation]);

  // toggle grids
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setselfShowGrid(showGridGroup);
    }
  }, [showGridGroup]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedGroup.id === group.id) {
      setgroupPosition(selfPosition);
      setgroupRotation(selfRotation);
      setselfShowGrid(showGridGroup);
      selectedRef.current = true;
    } else if (selectedRef.current) {
      setselfShowGrid(false);
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
      </group>
    </>
  );
}

export default ModelGroup;
