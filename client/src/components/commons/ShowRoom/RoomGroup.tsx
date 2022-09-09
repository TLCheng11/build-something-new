import { Box, Circle, Cylinder, Plane, Sphere } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelGroup } from "../../../Interface";

interface Props {
  group: IModelGroup;
}

function RoomGroup({ group }: Props) {
  const showChildGroups = group.child_groups?.map((group) => (
    <RoomGroup key={group.id} group={group} />
  ));

  return (
    <group
      position={[
        group.xposition || 0,
        group.yposition || 0,
        group.zposition || 0,
      ]}
      rotation={[
        ((group.xrotation || 0) / 360) * Math.PI * 2,
        ((group.yrotation || 0) / 360) * Math.PI * 2,
        ((group.zrotation || 0) / 360) * Math.PI * 2,
      ]}
    >
      {showChildGroups}
      {group.model_planes?.map((plane) => (
        <Plane
          key={plane.id}
          args={[plane.width || 0, plane.depth || 0]}
          position={[
            plane.xposition || 0,
            plane.yposition || 0,
            plane.zposition || 0,
          ]}
          rotation={[
            (((plane.xrotation || 0) - 90) / 360) * Math.PI * 2,
            ((plane.yrotation || 0) / 360) * Math.PI * 2,
            ((plane.zrotation || 0) / 360) * Math.PI * 2,
          ]}
        >
          <meshStandardMaterial
            color={plane.color || "#fff"}
            side={DoubleSide}
          />
        </Plane>
      ))}
      {group.model_shapes?.map((shape) => (
        <Circle
          key={shape.id}
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
          <meshStandardMaterial
            color={shape.color || "#fff"}
            side={DoubleSide}
          />
        </Circle>
      ))}
      {group.model_boxes?.map((box) => (
        <Box
          key={box.id}
          args={[box.width || 0, box.height || 0, box.depth || 0]}
          position={[
            box.xposition || 0,
            box.yposition || 0,
            box.zposition || 0,
          ]}
          rotation={[
            ((box.xrotation || 0) / 360) * Math.PI * 2,
            ((box.yrotation || 0) / 360) * Math.PI * 2,
            ((box.zrotation || 0) / 360) * Math.PI * 2,
          ]}
        >
          <meshStandardMaterial color={box.color || "#fff"} />
        </Box>
      ))}
      {group.model_spheres?.map((sphere) => (
        <Sphere
          key={sphere.id}
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
          <meshStandardMaterial color={sphere.color || "#fff"} />
        </Sphere>
      ))}
      {group.model_cylinders?.map((cylinder) => (
        <Cylinder
          key={cylinder.id}
          args={[
            cylinder.radius_top || 0,
            cylinder.radius_bottom || 0,
            cylinder.height || 0,
            cylinder.segments || 0,
            1,
            false,
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
      ))}
    </group>
  );
}

export default RoomGroup;
