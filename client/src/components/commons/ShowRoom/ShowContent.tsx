import { Box, Plane, Sphere } from "@react-three/drei";
import { DoubleSide } from "three";
import { IModelGroup } from "../../../Interface";

interface Props {
  group: IModelGroup;
}

function ShowContent({ group }: Props) {
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
          <meshBasicMaterial color={plane.color || "#fff"} side={DoubleSide} />
        </Plane>
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
          <meshBasicMaterial color={box.color || "#fff"} />
        </Box>
      ))}
      {group.model_spheres?.map((sphere) => (
        <Sphere
          key={sphere.id}
          args={[
            sphere.radius || 0,
            sphere.width_segments || 0,
            sphere.height_segments || 0,
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
          <meshBasicMaterial color={sphere.color || "#fff"} />
        </Sphere>
      ))}
    </group>
  );
}

export default ShowContent;
