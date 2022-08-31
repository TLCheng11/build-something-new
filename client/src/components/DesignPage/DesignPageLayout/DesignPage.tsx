import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DesignCanvas from "./DesignCanvas";
import DesignControls from "./DesignControls";

interface Props {
  currentUser: {
    id?: number | undefined;
    email?: string | undefined;
    username?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    dob?: Date | undefined;
    profile_img?: string | undefined;
    introduction?: string | undefined;
    is_login?: boolean | undefined;
  };
}

function DesignPage(props: Props) {
  const { currentUser } = props;
  let navigate = useNavigate();
  const params = useParams();
  const [currentProject, setcurrentProject] = useState<{
    id?: number;
    title?: string;
    model_groups: [
      {
        id?: number;
        group_name?: string;
        xposition?: number;
        yposition?: number;
        zposition?: number;
        xrotation?: number;
        yrotation?: number;
        zrotation?: number;
        model_boxed?: [];
        model_planes?: [];
        model_sphere?: [];
      }
    ];
  }>({ model_groups: [{}] });

  // states for grid controls
  const [gridMain, setgridMain] = useState<[number, number, string, string]>([
    10,
    20,
    "black",
    "gray",
  ]);
  const [showGridMain, setshowGridMain] = useState<boolean>(true);
  const [gridGroup, setgridGroup] = useState<[number, number, string, string]>([
    7,
    14,
    "red",
    "orange",
  ]);
  const [showGridGroup, setshowGridGroup] = useState<boolean>(false);
  const [gridModel, setgridModel] = useState<[number, number, string, string]>([
    5,
    10,
    "purple",
    "blue",
  ]);
  const [showGridModel, setshowGridModel] = useState<boolean>(false);

  // states for Model Group
  const [selectedGroup, setselectedGroup] = useState<string>("");
  const [groupPosition, setgroupPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [groupRotation, setgroupRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  // states for Models
  const [selectedModel, setselectedModel] = useState<{
    type: string;
    id: number;
  }>({ type: "", id: 0 });

  // states for model type selection
  const [modelType, setmodelType] = useState<string>("plane");

  // properties for selected model
  const [planeSize, setplaneSize] = useState<[number, number]>([10, 10]);
  const [boxSize, setboxSize] = useState<[number, number, number]>([1, 1, 1]);
  const [sphereSize, setsphereSize] = useState<[number, number, number]>([
    0.5, 32, 16,
  ]);
  const [position, setposition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setrotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("#396BA7");

  // useEffect(() => {
  //   if (modelType === "Plane") {
  //     setplaneSize([10, 10]);
  //   } else if (modelType === "Box") {
  //     setboxSize([1, 1, 1]);
  //   } else if (modelType === "Sphere") {
  //     setsphereSize([1, 32, 16]);
  //   }
  // }, [modelType]);

  useEffect(() => {
    if (!currentUser.id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(`/projects/${params.project_id}`)
      .then((res) => res.json())
      .then((data) => {
        setcurrentProject(data);
        setselectedGroup((group) => group || data.model_groups[0].group_name);
      });
  }, [selectedGroup]);

  console.log(currentProject);

  return (
    <div id="design-page" className="flex h-screen w-screen bg-black">
      <div id="design-controls-holder" className="h-full w-1/4 overflow-auto">
        <DesignControls
          currentProject={currentProject}
          showGridMain={showGridMain}
          setshowGridMain={setshowGridMain}
          showGridGroup={showGridGroup}
          setshowGridGroup={setshowGridGroup}
          showGridModel={showGridModel}
          setshowGridModel={setshowGridModel}
          selectedGroup={selectedGroup}
          setselectedGroup={setselectedGroup}
          groupPosition={groupPosition}
          setgroupPosition={setgroupPosition}
          groupRotation={groupRotation}
          setgroupRotation={setgroupRotation}
          modelType={modelType}
          setmodelType={setmodelType}
          selectedModel={selectedModel}
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
      </div>
      <div id="design-canvas-holder" className="h-full w-3/4 border">
        <DesignCanvas
          currentProject={currentProject}
          gridMain={gridMain}
          showGridMain={showGridMain}
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
      </div>
    </div>
  );
}

export default DesignPage;
