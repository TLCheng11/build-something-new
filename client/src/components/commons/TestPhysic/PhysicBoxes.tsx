import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import { IModelBox } from "../../../Interface";

interface Props {
  box: IModelBox;
}

function PhysicBox({ box }: Props) {
  const [ref] = useBox(() => ({
    args: [box.width || 0, box.height || 0, box.depth || 0],
    position: [box.xposition || 0, box.yposition || 0, box.zposition || 0],
    rotation: [
      ((box.xrotation || 0) / 360) * Math.PI * 2,
      ((box.yrotation || 0) / 360) * Math.PI * 2,
      ((box.zrotation || 0) / 360) * Math.PI * 2,
    ],
    mass: box.mass,
  }));

  return (
    <Box
      ref={ref}
      args={[box.width || 0, box.height || 0, box.depth || 0]}
      position={[box.xposition || 0, box.yposition || 0, box.zposition || 0]}
      rotation={[
        ((box.xrotation || 0) / 360) * Math.PI * 2,
        ((box.yrotation || 0) / 360) * Math.PI * 2,
        ((box.zrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      <meshStandardMaterial color={box.color || "#fff"} />
    </Box>
  );
}

export default PhysicBox;
