import { useEffect, useRef, useState } from "react";
import DesignCanvas from "./DesignCanvas";
import DesignControls from "./DesignControls";

function DesignPage() {
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

  // states for model type selection
  const [modelType, setmodelType] = useState<string>("Plane");

  // properties for selected model
  const [planeSize, setplaneSize] = useState<[number, number]>([1000, 1000]);
  const [size, setsize] = useState<[number, number, number]>([1, 1, 1]);
  const [postion, setpostion] = useState<number[]>([0, 0, 0]);
  const [rotation, setrotation] = useState<number[]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("blue");

  console.log(selectedModel);

  useEffect(() => {
    if (modelType === "Box") {
      setsize([1, 1, 1]);
    } else if (modelType === "Sphere") {
      setsize([1, 32, 16]);
    }
  }, [modelType]);

  return (
    <div id="design-page" className="flex h-screen w-screen bg-black">
      <div id="design-controls-holder" className="h-full w-1/4">
        <DesignControls
          showGridMain={showGridMain}
          setshowGridMain={setshowGridMain}
          modelType={modelType}
          setmodelType={setmodelType}
          planeSize={planeSize}
          setplaneSize={setplaneSize}
          size={size}
          setSize={setsize}
        />
      </div>
      <div id="design-canvas-holder" className="h-full w-3/4 border">
        <DesignCanvas
          gridMain={gridMain}
          showGridMain={showGridMain}
          size={size}
          setsize={setsize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
        />
      </div>
    </div>
  );
}

export default DesignPage;
