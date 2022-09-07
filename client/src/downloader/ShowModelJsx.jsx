export const showModelComponentJsx = `
import { Box, Loader, OrbitControls, Plane, Sphere } from "@react-three/drei";
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { DoubleSide } from "three";

function Group({ group }) {
  const showChildGroups = group.child_groups.map((group) => (
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
    </group>
  );
}

function ShowModel() {
  const [model, setmodel] = useState({ model_groups: [] });

  const showModel = model.model_groups.map((group) => (
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