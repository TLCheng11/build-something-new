import { OrbitControls } from "@react-three/drei";
import { applyProps, Canvas } from "react-three-fiber";
import GridLayout from "../DesignUtility/GridLayout";
import ModelBox from "../Models/ModelBox";

interface Props {
  gridMain: [number, number, string, string];
  showGridMain: boolean;
  size: [number, number, number];
}

function DesignCanvas(props: Props) {
  const { gridMain, showGridMain, size } = props;

  return (
    <div id="design-canvas" className="h-full w-full bg-gray-400">
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        {showGridMain && <GridLayout gridMain={gridMain} />}
        <ModelBox size={size} />
      </Canvas>
    </div>
  );
}

export default DesignCanvas;
