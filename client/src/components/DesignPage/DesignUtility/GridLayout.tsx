import { Box } from "@react-three/drei";

interface Props {
  gridMain: [number, number, string, string];
}

function GridLayout(props: Props) {
  return (
    <group>
      <gridHelper args={props.gridMain} />
      <Box
        args={[0, 0, 0]}
        rotation={[Math.PI * 0, Math.PI * 0, Math.PI * 0.5]}
      >
        <gridHelper args={props.gridMain} />
      </Box>
      <Box
        args={[0, 0, 0]}
        rotation={[Math.PI * 0.5, Math.PI * 0, Math.PI * 0]}
      >
        <gridHelper args={props.gridMain} />
      </Box>
    </group>
  );
}

export default GridLayout;
