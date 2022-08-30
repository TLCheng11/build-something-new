import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // states for grid controls
  const [gridMain, setgridMain] = useState<[number, number, string, string]>([
    10,
    20,
    "black",
    "gray",
  ]);
  const [showGridMain, setshowGridMain] = useState<boolean>(true);
  const [gridModel, setgridModel] = useState<[number, number, string, string]>([
    5,
    10,
    "blue",
    "yellow",
  ]);
  const [showGridModel, setshowGridModel] = useState<boolean>(false);

  // states for Model Group
  const [selectedGroup, setselectedGroup] = useState<number>(0);
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
  const [modelType, setmodelType] = useState<string>("Plane");

  // properties for selected model
  const [planeSize, setplaneSize] = useState<[number, number]>([10, 10]);
  const [boxSize, setboxSize] = useState<[number, number, number]>([1, 1, 1]);
  const [sphereSize, setsphereSize] = useState<[number, number, number]>([
    1, 32, 16,
  ]);
  const [position, setposition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setrotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("#fff");

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

  return (
    <div id="design-page" className="flex h-screen w-screen bg-black">
      <div id="design-controls-holder" className="h-full w-1/4">
        <DesignControls
          showGridMain={showGridMain}
          setshowGridMain={setshowGridMain}
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
          gridMain={gridMain}
          showGridMain={showGridMain}
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
