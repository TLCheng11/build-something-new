import { useBox } from "@react-three/cannon";
import { Circle } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelShape } from "../../../Interface";

interface Props {
  shape: IModelShape;
}

function PhysicShape({ shape }: Props) {
  const [ref] = useBox(() => ({
    args: [(shape.radius || 0) * 2, (shape.radius || 0) * 2, 0.01],
    position: [
      shape.xposition || 0,
      shape.yposition || 0,
      shape.zposition || 0,
    ],
    rotation: [
      ((shape.xrotation || 0) / 360) * Math.PI * 2,
      ((shape.yrotation || 0) / 360) * Math.PI * 2,
      ((shape.zrotation || 0) / 360) * Math.PI * 2,
    ],
    mass: 1,
  }));

  return (
    <Circle
      ref={ref}
      args={[
        shape.radius || 0,
        shape.segments || 0,
        0,
        ((shape.theta_length || 360) / 360) * Math.PI * 2,
      ]}
      position={[
        shape.xposition || 0,
        shape.yposition || 0,
        shape.zposition || 0,
      ]}
      rotation={[
        ((shape.xrotation || 0) / 360) * Math.PI * 2,
        ((shape.yrotation || 0) / 360) * Math.PI * 2,
        ((shape.zrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      <meshStandardMaterial color={shape.color || "#fff"} side={DoubleSide} />
    </Circle>
  );
}

export default PhysicShape;
