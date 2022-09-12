import { usePlane } from "@react-three/cannon";
import { Plane } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelPlane } from "../../Interface";

interface Props {
  plane: IModelPlane;
}

function PhysicPlane({ plane }: Props) {
  const [ref] = usePlane(() => ({
    args: [plane.width || 0, plane.depth || 0],
    position: [
      plane.xposition || 0,
      plane.yposition || 0,
      plane.zposition || 0,
    ],
    rotation: [
      (((plane.xrotation || 0) - 90) / 360) * Math.PI * 2,
      ((plane.zrotation || 0) / 360) * Math.PI * 2,
      ((plane.yrotation || 0) / 360) * Math.PI * 2,
    ],
    mass: 0,
  }));

  return (
    <Plane
      ref={ref}
      args={[plane.width || 0, plane.depth || 0]}
      position={[
        plane.xposition || 0,
        plane.yposition || 0,
        plane.zposition || 0,
      ]}
      rotation={[
        (((plane.xrotation || 0) - 90) / 360) * Math.PI * 2,
        ((plane.zrotation || 0) / 360) * Math.PI * 2,
        ((plane.yrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      <meshStandardMaterial color={plane.color || "#fff"} side={DoubleSide} />
    </Plane>
  );
}

export default PhysicPlane;
