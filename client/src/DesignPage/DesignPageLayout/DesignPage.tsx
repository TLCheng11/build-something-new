import { useEffect, useState } from "react";
import DesignCanvas from "./DesignCanvas";
import DesignControls from "./DesignControls";

function DesignPage() {
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
  const [size, setsize] = useState<number[]>([]);
  const [postion, setpostion] = useState<number[]>([0, 0, 0]);
  const [rotation, setrotation] = useState<number[]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("blue");

  useEffect(() => {
    if (modelType === "Plane") {
      setsize([1000, 1000]);
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
        />
      </div>
      <div id="design-canvas-holder" className="h-full w-3/4 border">
        <DesignCanvas gridMain={gridMain} showGridMain={showGridMain} />
      </div>
    </div>
  );
}

export default DesignPage;
