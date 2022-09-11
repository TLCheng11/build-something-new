import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import GridLayout from "../../commons/Models/GridLayout";
import ModelGroup from "../../commons/Models/ModelGroup";
import { IProject, ISetting } from "../../../Interface";
import { Suspense, useEffect, useRef } from "react";
import ModelLight from "../../commons/Models/ModelLight";
import Camera from "../../commons/Models/Camera";

interface Props {
  showMenu: boolean;
  refresh: boolean;
  currentProject: IProject;
  setting: ISetting;
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
  sphereSize: [number, number, number, number, number];
  setsphereSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number]>
  >;
  shapeSize: [number, number, number];
  setshapeSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
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

function DesignCanvas(props: Props) {
  const {
    showMenu,
    refresh,
    currentProject,
    setting,
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
    cylinderSize,
    setcylinderSize,
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
        showMenu={showMenu}
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
        cylinderSize={cylinderSize}
        setcylinderSize={setcylinderSize}
        position={position}
        setposition={setposition}
        rotation={rotation}
        setrotation={setrotation}
        modelColor={modelColor}
        setmodelColor={setmodelColor}
      />
    ));

  return (
    <div
      id="design-canvas"
      className="h-full w-full"
      style={{
        backgroundColor: setting.bg_color,
      }}
    >
      <Canvas
        camera={{
          position: [
            currentProject.project_setting?.xcamera || 5,
            currentProject.project_setting?.ycamera || 5,
            currentProject.project_setting?.zcamera || 5,
          ],
          near: 0.1,
          far: 1000,
        }}
        shadows
      >
        <Camera setting={setting} />
        <OrbitControls />
        <ModelLight />
        <Suspense fallback={null}>
          {showGridMain && (
            <GridLayout showMenu={showMenu} type="Main" gridArgs={gridMain} />
          )}
          {showModelGroups}
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default DesignCanvas;
