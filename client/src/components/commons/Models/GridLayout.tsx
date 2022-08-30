import { Box } from "@react-three/drei";

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
    </group>
  );
}

export default GridLayout;
