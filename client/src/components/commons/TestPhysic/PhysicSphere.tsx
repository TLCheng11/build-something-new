import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelSphere } from "../../../Interface";

interface Props {
  sphere: IModelSphere;
}

function PhysicSphere({ sphere }: Props) {
  const [ref] = useSphere(() => ({
    args: [sphere.radius || 0],
    position: [
      sphere.xposition || 0,
      sphere.yposition || 0,
      sphere.zposition || 0,
    ],
    rotation: [
      ((sphere.xrotation || 0) / 360) * Math.PI * 2,
      ((sphere.yrotation || 0) / 360) * Math.PI * 2,
      ((sphere.zrotation || 0) / 360) * Math.PI * 2,
    ],
    mass: sphere.mass,
  }));

  return (
    <Sphere
      ref={ref}
      args={[
        sphere.radius || 0,
        sphere.width_segments || 0,
        sphere.height_segments || 0,
        0,
        ((sphere.phi_length || 0) / 360) * Math.PI * 2,
        0,
        ((sphere.theta_length || 0) / 360) * Math.PI,
      ]}
      position={[
        sphere.xposition || 0,
        sphere.yposition || 0,
        sphere.zposition || 0,
      ]}
      rotation={[
        ((sphere.xrotation || 0) / 360) * Math.PI * 2,
        ((sphere.yrotation || 0) / 360) * Math.PI * 2,
        ((sphere.zrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      <meshStandardMaterial color={sphere.color || "#fff"} side={DoubleSide} />
    </Sphere>
  );
}

export default PhysicSphere;
