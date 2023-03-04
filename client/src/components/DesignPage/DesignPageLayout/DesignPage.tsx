import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProject, ISetting } from "../../../Interface";
import DesignCanvas from "./DesignCanvas";
import DesignControls from "./DesignControls";

interface Props {
  showMenu: boolean;
}

function DesignPage({ showMenu }: Props) {
  let navigate = useNavigate();
  const params = useParams();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });

  // states for setting
  const [setting, setSetting] = useState<ISetting>({
    xcamera: 5,
    ycamera: 5,
    zcamera: 5,
    bg_color: "#9CA3AF",
    shadow: true,
  });

  // states for grid controls
  const [gridMain, setGridMain] = useState<[number, number, string, string]>([
    10,
    20,
    "black",
    "gray",
  ]);
  const [showGridMain, setShowGridMain] = useState<boolean>(true);
  const [gridGroup, setGridGroup] = useState<[number, number, string, string]>([
    7,
    14,
    "crimson",
    "red",
  ]);
  const [showGridGroup, setShowGridGroup] = useState<boolean>(false);
  const [gridModel, setGridModel] = useState<[number, number, string, string]>([
    5,
    10,
    "purple",
    "blue",
  ]);
  const [showGridModel, setShowGridModel] = useState<boolean>(false);

  // states for Model Group
  const [selectedGroup, setSelectedGroup] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [groupPosition, setGroupPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [groupRotation, setGroupRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  // states for Models
  const [selectedModel, setSelectedModel] = useState<{
    type: string;
    id: number;
  }>({ type: "", id: 0 });

  // states for model type selection
  const [modelType, setModelType] = useState<string>("planes");

  // properties for selected model
  const [planeSize, setPlaneSize] = useState<[number, number]>([5, 5]);
  const [boxSize, setBoxSize] = useState<[number, number, number]>([1, 1, 1]);
  const [sphereSize, setSphereSize] = useState<
    [number, number, number, number, number]
  >([0.5, 32, 16, 360, 360]);
  const [shapeSize, setShapeSize] = useState<[number, number, number]>([
    0.5, 32, 360,
  ]);
  const [cylinderSize, setCylinderSize] = useState<
    [number, number, number, number, number, boolean]
  >([0.5, 0.5, 1, 3, 360, false]);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelColor, setModelColor] = useState<string>("#396BA7");

  useEffect(() => {
    fetch(`/projects/${params.project_id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setCurrentProject(data);
            if (selectedGroup.id === 0) {
              setSelectedGroup({
                id: data.model_groups[0].id,
                name: data.model_groups[0].group_name,
              });
            }
            if (firstLoad) {
              setSetting(data.project_setting);
              setFirstLoad(false);
            }
          })
          .catch(console.error);
      } else {
        const id = setTimeout(() => {
          navigate(-1);
        }, 2000);
        setNotFound(true);

        return () => clearInterval(id);
      }
    });
  }, [selectedGroup, selectedModel, refresh]);

  if (notFound) return <h1>Page Not Found</h1>;

  return (
    <div
      id="design-page"
      className="horizonal:flex h-screen w-screen bg-black overflow-auto"
    >
      <div
        id="design-controls-holder"
        className="h-1/2 w-full horizonal:h-full horizonal:w-1/4 min-w-control"
      >
        <DesignControls
          setRefresh={setRefresh}
          currentProject={currentProject}
          setting={setting}
          setSetting={setSetting}
          showGridMain={showGridMain}
          setShowGridMain={setShowGridMain}
          showGridGroup={showGridGroup}
          setShowGridGroup={setShowGridGroup}
          showGridModel={showGridModel}
          setShowGridModel={setShowGridModel}
          gridMain={gridMain}
          setGridMain={setGridMain}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          groupPosition={groupPosition}
          setGroupPosition={setGroupPosition}
          groupRotation={groupRotation}
          setGroupRotation={setGroupRotation}
          modelType={modelType}
          setModelType={setModelType}
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
      </div>
      <div
        id="design-canvas-holder"
        className="h-1/2 horizonal:h-full w-full horizonal:w-3/4 border"
      >
        <DesignCanvas
          showMenu={showMenu}
          refresh={refresh}
          currentProject={currentProject}
          setting={setting}
          gridMain={gridMain}
          showGridMain={showGridMain}
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
      </div>
    </div>
  );
}

export default DesignPage;
