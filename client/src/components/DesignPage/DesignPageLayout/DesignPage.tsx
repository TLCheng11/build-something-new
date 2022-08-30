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

  // const selectedModel
  const [selectedModel, setselectedModel] = useState<{
    type: string;
    id: number;
  }>({ type: "", id: 0 });

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

  // states for model type selection
  const [modelType, setmodelType] = useState<string>("Plane");

  // properties for selected model
  const [planeSize, setplaneSize] = useState<[number, number]>([1000, 1000]);
  const [boxSize, setboxSize] = useState<[number, number, number]>([1, 1, 1]);
  const [sphereSize, setsphereSize] = useState<[number, number, number]>([
    1, 32, 16,
  ]);
  const [position, setposition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setrotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("blue");

  // useEffect(() => {
  //   if (modelType === "Plane") {
  //     setplaneSize([1000, 1000]);
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
        />
      </div>
      <div id="design-canvas-holder" className="h-full w-3/4 border">
        <DesignCanvas
          gridMain={gridMain}
          showGridMain={showGridMain}
          gridModel={gridModel}
          showGridModel={showGridModel}
          setshowGridModel={setshowGridModel}
          boxSize={boxSize}
          setboxSize={setboxSize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
        />
      </div>
    </div>
  );
}

export default DesignPage;
