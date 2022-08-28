import { OrbitControls } from "@react-three/drei";
import { applyProps, Canvas } from "react-three-fiber";
import GridLayout from "../DesignUtility/GridLayout";

interface Props {
  gridMain: [number, number, string, string];
  showGridMain: boolean;
}

function DesignCanvas(props: Props) {
  const { gridMain, showGridMain } = props;

  return (
    <div id="design-canvas" className="h-full w-full bg-gray-400">
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        {showGridMain && <GridLayout gridMain={gridMain} />}
      </Canvas>
    </div>
  );
}

export default DesignCanvas;
