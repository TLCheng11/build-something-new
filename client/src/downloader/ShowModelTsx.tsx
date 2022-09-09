export const showModelComponentTsx = `
import {
  Box,
  Circle,
  Cylinder,
  Loader,
  OrbitControls,
  Plane,
  Sphere,
} from "@react-three/drei";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { DoubleSide } from "three";

interface Props {
  group: IGroup;
}

interface IGroup {
  id: number;
  group_name: string;
  parent_group_id?: number | undefined;
  parent_group_name?: string | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  model_planes?: any[] | undefined;
  model_boxes?: any[] | undefined;
  model_spheres?: any[] | undefined;
  model_shapes?: any[] | undefined;
  model_cylinders?: any[] | undefined;
  child_groups?: IGroup[] | undefined;
}

function Group({ group }: Props) {
  const showChildGroups = group.child_groups?.map((group: any) => (
    <Group key={group.id} group={group} />
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

function ShowModel() {
  const [model, setmodel] = useState<any>({ model_groups: [] });

  const showModel = model.model_groups.map((group: IGroup) => (
    <Group key={group.id} group={group} />
  ));

  useEffect(() => {
    fetch("/model.json")
      .then((res) => res.json())
      .then(setmodel);
  }, []);

  return (
    <div
      style={{
        height: "800px",
        width: "1200px",
        background: "rgb(156 163 175)",
      }}
    >
      <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight position={[1000, 1000, 500]} intensity={1} />
        <spotLight position={[0, 1000, 0]} intensity={0.5} />
        <Suspense fallback={null}>{showModel}</Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default ShowModel;
`;
