import { OrbitControls } from "@react-three/drei";
import { applyProps, Canvas } from "react-three-fiber";
import GridLayout from "../DesignUtility/GridLayout";
import ModelBox from "../Models/ModelBox";

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
}

function DesignCanvas(props: Props) {
  const {
    gridMain,
    showGridMain,
    size,
    setsize,
    selectedModel,
    setselectedModel,
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
          id={1}
          position={[0, 0, 0]}
        />
        <ModelBox
          size={size}
          setsize={setsize}
          selectedModel={selectedModel}
          setselectedModel={setselectedModel}
          id={2}
          position={[0, 2, 0]}
        />
      </Canvas>
    </div>
  );
}

export default DesignCanvas;
