import { Box, Html } from "@react-three/drei";

interface Props {
  showMenu: boolean;
  type: string;
  gridArgs: [number, number, string, string];
  gridPosition?: [number, number, number];
}

function GridLayout(props: Props) {
  const { showMenu, type, gridArgs, gridPosition } = props;
  const factor: number = type === "Main" ? 20 : 10;

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
      {!showMenu && (
        <>
          <Html
            position={[gridArgs[0] / 2 + 0.2, 0.4, 0.2]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">X+</h1>
            </div>
          </Html>
          <Html
            position={[-gridArgs[0] / 2 - factor / 25, 0.4, 0.2]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">X-</h1>
            </div>
          </Html>
          <Html
            position={[-0.2, gridArgs[0] / 2 + factor / 25, 0.2]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">Y+</h1>
            </div>
          </Html>
          <Html
            position={[-0.2, -gridArgs[0] / 2, 0.2]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">Y-</h1>
            </div>
          </Html>
          <Html
            position={[-0.2, 0.4, gridArgs[0] / 2 + factor / 25]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">Z+</h1>
            </div>
          </Html>
          <Html
            position={[-0.2, 0.4, -gridArgs[0] / 2 - 0.2]}
            distanceFactor={factor}
          >
            <div>
              <h1 className="text-4xl select-none">Z-</h1>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

export default GridLayout;
