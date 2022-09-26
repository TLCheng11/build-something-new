export const showModelComponentPhysicJsx = `
import {
  Physics,
  useBox,
  useCylinder,
  usePlane,
  useSphere,
} from "@react-three/cannon";
import {
  Box,
  Circle,
  Cylinder,
  Loader,
  OrbitControls,
  Plane,
  Sphere,
} from "@react-three/drei";
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { DoubleSide } from "three";

function PhysicPlane({ plane }) {
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
    mass: plane.mass,
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

function PhysicShape({ shape }) {
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
    mass: shape.mass,
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

function PhysicBox({ box }) {
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

function PhysicSphere({ sphere }) {
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

function PhysicCylinder({ cylinder }) {
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

function PhysicGroup({ group }) {
  const showChildGroups = group.child_groups?.map((child) => {
    return <PhysicGroup key={group.id} group={child} />;
  });

  const showPlanes = group.model_planes?.map((plane) => (
    <PhysicPlane key={plane.id} plane={plane} />
  ));

  const showBoxes = group.model_boxes?.map((box) => (
    <PhysicBox key={box.id} box={box} />
  ));

  const showShapes = group.model_shapes?.map((shape) => (
    <PhysicShape key={shape.id} shape={shape} />
  ));

  const showSpheres = group.model_spheres?.map((sphere) => (
    <PhysicSphere key={sphere.id} sphere={sphere} />
  ));

  const showCylinders = group.model_cylinders?.map((cylinder) => (
    <PhysicCylinder key={cylinder.id} cylinder={cylinder} />
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
      <>
        {showChildGroups}
        {showPlanes}
        {showShapes}
        {showBoxes}
        {showSpheres}
        {showCylinders}
      </>
    </group>
  );
}

function ShowModel() {
  const [model, setModel] = useState({ model_groups: [] });

  const showModel = model.model_groups.map((group) => (
    <PhysicGroup key={group.id} group={group} />
  ));

  useEffect(() => {
    fetch("/model.json")
      .then((res) => res.json())
      .then(setModel);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: model.project_setting?.bg_color,
      }}
    >
      <Canvas
        camera={{
          position: [
            model.project_setting?.xcamera,
            model.project_setting?.ycamera,
            model.project_setting?.zcamera,
          ],
          near: 0.1,
          far: 1000,
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight position={[1000, 1000, 500]} intensity={1} />
        <spotLight position={[0, 1000, 0]} intensity={0.5} />
        <Physics gravity={[0, -100, 0]}>
          <Suspense fallback={null}>{showModel}</Suspense>
        </Physics>
      </Canvas>
      <Loader />
    </div>
  );
}

export default ShowModel;
`;
