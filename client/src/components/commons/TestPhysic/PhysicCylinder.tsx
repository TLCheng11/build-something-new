import { useCylinder } from "@react-three/cannon";
import { Cylinder } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelCylinder } from "../../../Interface";

interface Props {
  cylinder: IModelCylinder;
}

function PhysicCylinder({ cylinder }: Props) {
  const [ref] = useCylinder(() => ({
    args: [
      cylinder.radius_top || 0,
      cylinder.radius_bottom || 0,
      cylinder.height || 0,
      cylinder.segments || 0,
    ],
    position: [
      cylinder.xposition || 0,
      cylinder.yposition || 0,
      cylinder.zposition || 0,
    ],
    rotation: [
      ((cylinder.xrotation || 0) / 360) * Math.PI * 2,
      ((cylinder.yrotation || 0) / 360) * Math.PI * 2,
      ((cylinder.zrotation || 0) / 360) * Math.PI * 2,
    ],
    mass: cylinder.mass,
  }));

  return (
    <Cylinder
      ref={ref}
      args={[
        cylinder.radius_top || 0,
        cylinder.radius_bottom || 0,
        cylinder.height || 0,
        cylinder.segments || 0,
        1,
        cylinder.open_ended || false,
        0,
        ((cylinder.theta_length || 360) / 360) * Math.PI * 2,
      ]}
      position={[
        cylinder.xposition || 0,
        cylinder.yposition || 0,
        cylinder.zposition || 0,
      ]}
      rotation={[
        ((cylinder.xrotation || 0) / 360) * Math.PI * 2,
        ((cylinder.yrotation || 0) / 360) * Math.PI * 2,
        ((cylinder.zrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      <meshStandardMaterial
        color={cylinder.color || "#fff"}
        side={DoubleSide}
      />
    </Cylinder>
  );
}

export default PhysicCylinder;
