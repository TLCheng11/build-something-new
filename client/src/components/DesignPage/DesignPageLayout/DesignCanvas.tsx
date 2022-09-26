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
        // shadows
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
