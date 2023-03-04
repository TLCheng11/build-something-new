import { Dispatch, SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IProject, ISetting } from "../../../Interface";
import GridControls from "../DesignControls/GridControls";
import ModelColorControls from "../DesignControls/ModelColorControls";
import ModelGroupControls from "../DesignControls/ModelGroupControls";
import ModelPositionControls from "../DesignControls/ModelPositionContorls";
import ModelRotationControls from "../DesignControls/ModelRotationControls";
import ModelSizeContorls from "../DesignControls/ModelSizeControls";
import ModelTypesControls from "../DesignControls/ModelTypeControls";
import SettingControls from "../DesignControls/SettingControls";

interface Props {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: IProject;
  setting: ISetting;
  setSetting: React.Dispatch<React.SetStateAction<ISetting>>;
  showGridMain: boolean;
  setShowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridGroup: boolean;
  setShowGridGroup: React.Dispatch<React.SetStateAction<boolean>>;
  showGridModel: boolean;
  setShowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
  gridMain: [number, number, string, string];
  setGridMain: React.Dispatch<
    React.SetStateAction<[number, number, string, string]>
  >;
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
  modelType: string;
  setModelType: Dispatch<SetStateAction<string>>;
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
  setBoxSize: Dispatch<SetStateAction<[number, number, number]>>;
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

function DesignControls(props: Props) {
  let navigate = useNavigate();
  const {
    setRefresh,
    currentProject,
    setting,
    setSetting,
    showGridMain,
    setShowGridMain,
    showGridGroup,
    setShowGridGroup,
    showGridModel,
    setShowGridModel,
    gridMain,
    setGridMain,
    selectedGroup,
    setSelectedGroup,
    groupPosition,
    setGroupPosition,
    groupRotation,
    setGroupRotation,
    modelType,
    setModelType,
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

  return (
    <div className="overflow-auto h-full text-xs lg:text-lg text-white p-2 bg-gray-600">
      <div className="w-full flex justify-between">
        <h1
          className="cursor-pointer border-b border-black"
          onClick={() => navigate(-1)}
        >
          Back
        </h1>
        <NavLink to={`/project-test-physic/${currentProject.id}`}>
          <button className="design-btn min-w-fit px-1 mr-10 horizonal:mr-4 whitespace-nowrap">
            Test Physic
          </button>
        </NavLink>
      </div>
      <SettingControls
        setRefresh={setRefresh}
        currentProject={currentProject}
        setting={setting}
        setSetting={setSetting}
      />
      <GridControls
        showGridMain={showGridMain}
        setShowGridMain={setShowGridMain}
        showGridGroup={showGridGroup}
        setShowGridGroup={setShowGridGroup}
        showGridModel={showGridModel}
        setShowGridModel={setShowGridModel}
        gridMain={gridMain}
        setGridMain={setGridMain}
      />
      <ModelGroupControls
        setRefresh={setRefresh}
        currentProject={currentProject}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groupPosition={groupPosition}
        setGroupPosition={setGroupPosition}
        groupRotation={groupRotation}
        setGroupRotation={setGroupRotation}
        setSelectedModel={setSelectedModel}
      />
      <ModelTypesControls
        selectedGroup={selectedGroup}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        modelType={modelType}
        setModelType={setModelType}
      />
      {selectedModel.type && (
        <div>
          <ModelSizeContorls
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
          />
          <ModelPositionControls
            type="Model"
            position={position}
            setPosition={setPosition}
          />
          <ModelRotationControls
            type="Model"
            rotation={rotation}
            setRotation={setRotation}
          />
          <ModelColorControls
            modelColor={modelColor}
            setModelColor={setModelColor}
          />
        </div>
      )}
    </div>
  );
}

export default DesignControls;
