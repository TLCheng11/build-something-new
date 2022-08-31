import { useEffect, useState } from "react";
import { ModelGroupProps } from "../../../Interface";
import GridLayout from "./GridLayout";
import ModelBox from "./ModelBox";
import ModelPlane from "./ModelPlane";
import ModelSphere from "./ModelSphere";

interface Props {
  group: ModelGroupProps;
  gridGroup: [number, number, string, string];
  showGridGroup: boolean;
  gridModel: [number, number, string, string];
  showGridModel: boolean;
  selectedGroup: string;
  setselectedGroup: React.Dispatch<React.SetStateAction<string>>;
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
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelGroup(props: Props) {
  const {
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
    0, 0, 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  // set position
  useEffect(() => {
    if (selectedGroup === group.group_name) {
      setSelfPosition(groupPosition);
    }
  }, [groupPosition]);

  // set rotation
  useEffect(() => {
    if (selectedGroup === group.group_name) {
      setselfRotation(groupRotation);
    }
  }, [groupRotation]);

  // toggle grids
  useEffect(() => {
    if (selectedGroup === group.group_name) {
      setselfShowGrid(showGridGroup);
    }
  }, [showGridGroup]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedGroup === group.group_name) {
      setgroupPosition(selfPosition);
      setgroupRotation(selfRotation);
      setselfShowGrid(showGridGroup);
    } else {
      setselfShowGrid(false);
    }
  }, [selectedGroup]);

  // lock self as selected item when clicked
  // function handleOnClick(e: ThreeEvent<MouseEvent>) {
  //   e.stopPropagation();
  //   setselectedGroup(0);
  // }

  return (
    <>
      <group
        // onClick={handleOnClick}
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
        <ModelPlane
          gridModel={gridModel}
          showGridModel={showGridModel}
          planeSize={planeSize}
          setplaneSize={setplaneSize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
          modelColor={modelColor}
          setmodelColor={setmodelColor}
          id={1}
        />
        <ModelBox
          gridModel={gridModel}
          showGridModel={showGridModel}
          boxSize={boxSize}
          setboxSize={setboxSize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
          modelColor={modelColor}
          setmodelColor={setmodelColor}
          id={1}
        />
        <ModelSphere
          gridModel={gridModel}
          showGridModel={showGridModel}
          sphereSize={sphereSize}
          setsphereSize={setsphereSize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
          modelColor={modelColor}
          setmodelColor={setmodelColor}
          id={1}
        />
      </group>
    </>
  );
}

export default ModelGroup;
