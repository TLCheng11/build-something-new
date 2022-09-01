import { OrbitControls } from "@react-three/drei";
import { applyProps, Canvas } from "react-three-fiber";
import GridLayout from "../../commons/Models/GridLayout";
import ModelBox from "../../commons/Models/ModelBox";
import ModelPlane from "../../commons/Models/ModelPlane";
import ModelGroup from "../../commons/Models/ModelGroup";
import { ModelGroupProps } from "../../../Interface";

interface Props {
  currentProject: {
    id?: number | undefined;
    title?: string | undefined;
    model_groups: [ModelGroupProps];
  };
  gridMain: [number, number, string, string];
  showGridMain: boolean;
  gridGroup: [number, number, string, string];
  showGridGroup: boolean;
  gridModel: [number, number, string, string];
  showGridModel: boolean;
  selectedGroup: number;
  setselectedGroup: React.Dispatch<React.SetStateAction<number>>;
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

function DesignCanvas(props: Props) {
  const {
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
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
  } = props;

  const showModelGroups = currentProject.model_groups.map((group) => (
    <ModelGroup
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
        {/* <ambientLight intensity={0.3} /> */}
        {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
        {/* <spotLight position={[0, 1000, 0]} intensity={1} /> */}
        {showGridMain && <GridLayout type="Main" gridArgs={gridMain} />}
        {showModelGroups}
      </Canvas>
    </div>
  );
}

export default DesignCanvas;
