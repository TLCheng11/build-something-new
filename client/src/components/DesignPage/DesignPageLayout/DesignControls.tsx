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
  setrefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: IProject;
  setting: ISetting;
  setsetting: React.Dispatch<React.SetStateAction<ISetting>>;
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridGroup: boolean;
  setshowGridGroup: React.Dispatch<React.SetStateAction<boolean>>;
  showGridModel: boolean;
  setshowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
  gridMain: [number, number, string, string];
  setgridMain: React.Dispatch<
    React.SetStateAction<[number, number, string, string]>
  >;
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
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
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
  setboxSize: Dispatch<SetStateAction<[number, number, number]>>;
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

function DesignControls(props: Props) {
  let navigate = useNavigate();
  const {
    setrefresh,
    currentProject,
    setting,
    setsetting,
    showGridMain,
    setshowGridMain,
    showGridGroup,
    setshowGridGroup,
    showGridModel,
    setshowGridModel,
    gridMain,
    setgridMain,
    selectedGroup,
    setselectedGroup,
    groupPosition,
    setgroupPosition,
    groupRotation,
    setgroupRotation,
    modelType,
    setmodelType,
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

  return (
    <div className="text-lg text-white p-2 bg-gray-600">
      <div className="h-full w-full flex justify-between">
        <h1
          className="cursor-pointer border-b border-black"
          onClick={() => navigate(-1)}
        >
          Back
        </h1>
        <NavLink to={`/project-test-physic/${currentProject.id}`}>
          <button className="design-btn min-w-fit px-1 mr-4 whitespace-nowrap">
            Test Physic
          </button>
        </NavLink>
      </div>
      <SettingControls
        setrefresh={setrefresh}
        currentProject={currentProject}
        setting={setting}
        setsetting={setsetting}
      />
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
        showGridGroup={showGridGroup}
        setshowGridGroup={setshowGridGroup}
        showGridModel={showGridModel}
        setshowGridModel={setshowGridModel}
        gridMain={gridMain}
        setgridMain={setgridMain}
      />
      <ModelGroupControls
        setrefresh={setrefresh}
        currentProject={currentProject}
        selectedGroup={selectedGroup}
        setselectedGroup={setselectedGroup}
        groupPosition={groupPosition}
        setgroupPosition={setgroupPosition}
        groupRotation={groupRotation}
        setgroupRotation={setgroupRotation}
        setselectedModel={setselectedModel}
      />
      <ModelTypesControls
        selectedGroup={selectedGroup}
        selectedModel={selectedModel}
        setselectedModel={setselectedModel}
        modelType={modelType}
        setmodelType={setmodelType}
      />
      {selectedModel.type && (
        <div>
          <ModelSizeContorls
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
          />
          <ModelPositionControls
            type="Model"
            position={position}
            setposition={setposition}
          />
          <ModelRotationControls
            type="Model"
            rotation={rotation}
            setrotation={setrotation}
          />
          <ModelColorControls
            modelColor={modelColor}
            setmodelColor={setmodelColor}
          />
        </div>
      )}
    </div>
  );
}

export default DesignControls;
