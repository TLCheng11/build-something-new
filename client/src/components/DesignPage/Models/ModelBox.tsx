import { Box } from "@react-three/drei";

interface Props {
  size: [number, number, number];
}

function ModelBox(props: Props) {
  const { size } = props;

  return (
    <Box args={size}>
      <meshNormalMaterial />
    </Box>
  );
}

export default ModelBox;
