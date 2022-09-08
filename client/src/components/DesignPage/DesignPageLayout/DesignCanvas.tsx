import { Cone, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import GridLayout from "../../commons/Models/GridLayout";
import ModelGroup from "../../commons/Models/ModelGroup";
import { IProject } from "../../../Interface";
import { Suspense } from "react";
import ModelLight from "../../commons/Models/ModelLight";
import { DoubleSide } from "three";

interface Props {
  refresh: boolean;
  currentProject: IProject;
  gridMain: [number, number, string, string];
  showGridMain: boolean;
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

function DesignCanvas(props: Props) {
  const {
    refresh,
    currentProject,
    gridMain,
    showGridMain,
    gridModel,
    showGridModel,
    gridGroup,
    showGridGroup,
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

  const showModelGroups = currentProject.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => (
      <ModelGroup
        key={group.id}
        refresh={refresh}
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

  return (
    <div id="design-canvas" className="h-full w-full bg-gray-400">
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        <ModelLight />
        <Suspense fallback={null}>
          {showGridMain && <GridLayout type="Main" gridArgs={gridMain} />}
          {showModelGroups}
        </Suspense>
        <Cone args={[2, 5, 3, 1, false, 0, 6.28]} position={[0, 2.5, 0]}>
          <meshStandardMaterial
            color={"red"}
            side={DoubleSide}
          ></meshStandardMaterial>
        </Cone>
      </Canvas>
      <Loader />
    </div>
  );
}

export default DesignCanvas;
