import { Box, Html } from "@react-three/drei";

interface Props {
  type: string;
  gridArgs: [number, number, string, string];
  gridPosition?: [number, number, number];
}

function GridLayout(props: Props) {
  const { type, gridArgs, gridPosition } = props;
  return (
    <group position={type === "Main" ? [0, 0, 0] : gridPosition}>
      <gridHelper args={gridArgs} />
      <Box
        args={[0, 0, 0]}
        rotation={[Math.PI * 0, Math.PI * 0, Math.PI * 0.5]}
      >
        <gridHelper args={gridArgs} />
      </Box>
      <Box
        args={[0, 0, 0]}
        rotation={[Math.PI * 0.5, Math.PI * 0, Math.PI * 0]}
      >
        <gridHelper args={gridArgs} />
      </Box>
      <Html position={[gridArgs[0] / 2 + 0.2, 0.4, 0.2]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">X+</h1>
        </div>
      </Html>
      <Html position={[-gridArgs[0] / 2 - 0.7, 0.4, 0.2]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">X-</h1>
        </div>
      </Html>
      <Html position={[-0.2, gridArgs[0] / 2 + 0.7, 0.2]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">Y+</h1>
        </div>
      </Html>
      <Html position={[-0.2, -gridArgs[0] / 2, 0.2]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">Y-</h1>
        </div>
      </Html>
      <Html position={[-0.2, 0.4, gridArgs[0] / 2 + 0.7]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">Z+</h1>
        </div>
      </Html>
      <Html position={[-0.2, 0.4, -gridArgs[0] / 2 - 0.2]} distanceFactor={20}>
        <div>
          <h1 className="text-4xl">Z-</h1>
        </div>
      </Html>
    </group>
  );
}

export default GridLayout;
