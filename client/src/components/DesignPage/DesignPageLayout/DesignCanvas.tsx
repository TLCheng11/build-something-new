import { OrbitControls } from "@react-three/drei";
import { applyProps, Canvas } from "react-three-fiber";
import GridLayout from "../DesignUtility/GridLayout";
import ModelBox from "../../commons/Models/ModelBox";

interface Props {
  gridMain: [number, number, string, string];
  showGridMain: boolean;
  size: [number, number, number];
  setsize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
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
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function DesignCanvas(props: Props) {
  const {
    gridMain,
    showGridMain,
    size,
    setsize,
    selectedModel,
    setselectedModel,
    position,
    setposition,
    rotation,
    setrotation,
  } = props;

  return (
    <div id="design-canvas" className="h-full w-full bg-gray-400">
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        {showGridMain && <GridLayout gridMain={gridMain} />}
        <ModelBox
          size={size}
          setsize={setsize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
          id={1}
        />
        <ModelBox
          size={size}
          setsize={setsize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          position={position}
          setposition={setposition}
          rotation={rotation}
          setrotation={setrotation}
          id={2}
        />
      </Canvas>
    </div>
  );
}

export default DesignCanvas;
