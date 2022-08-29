import { useEffect, useRef, useState } from "react";
import ModelBox from "../Models/ModelBox";
import DesignCanvas from "./DesignCanvas";
import DesignControls from "./DesignControls";

function DesignPage() {
  // const selectedRef = useRef();

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
  const [size, setsize] = useState<[number, number, number]>([2, 2, 2]);
  const [postion, setpostion] = useState<number[]>([0, 0, 0]);
  const [rotation, setrotation] = useState<number[]>([0, 0, 0]);
  const [modelColor, setmodelColor] = useState<string>("blue");

  // count control for models amount
  // const [showPlane, setShowPlane] = useState<JSX.Element[]>([]);
  // const [showBox, setShowBox] = useState<JSX.Element[]>([
  //   <ModelBox size={size} setSelectedRef={setSelectedRef} />,
  // ]);
  // const [showSphere, setShowSphere] = useState<JSX.Element[]>([]);

  // function setSelectedRef(ref: React.MutableRefObject<undefined>) {
  //   selectedRef.current = ref.current;
  // }

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
          setplaneSize={planeSize}
          size={size}
          setSize={setsize}
        />
      </div>
      <div id="design-canvas-holder" className="h-full w-3/4 border">
        <DesignCanvas
          gridMain={gridMain}
          showGridMain={showGridMain}
          size={size}
        />
      </div>
    </div>
  );
}

export default DesignPage;
