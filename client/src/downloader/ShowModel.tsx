export const showModelComponent = `
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "react-three-fiber";

function ShowModel() {
  return (
    <div className="h-full w-full min-h-360px min-w-360px rounded-3xl bg-gray-400">
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight position={[1000, 1000, 500]} intensity={1} />
        <spotLight position={[0, 1000, 0]} intensity={0.5} />
        <Suspense fallback={null}></Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default ShowModel;
`;
