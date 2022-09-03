import { Box, Loader, Plane, Sphere } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "react-three-fiber";
import { DoubleSide, Group } from "three";
import { IProject } from "../../../Interface";
import ProjectCardStage from "./ProjectCardStage";

interface Props {
  project: IProject;
}

function ProjectCard(props: Props) {
  let navigate = useNavigate();
  const { project } = props;

  const showProject = project.model_groups.map((group) => (
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
  ));

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  return (
    <div className="col-span-1 flex flex-col items-center h-screen-40 rounded-xl border">
      <div className="h-4/5 w-full rounded-t-xl bg-gray-400">
        <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <ProjectCardStage>{showProject}</ProjectCardStage>
          </Suspense>
        </Canvas>
        <Loader />
      </div>
      <div
        className="cursor-pointer w-11/12"
        onClick={() => toProjectDesign(project.id)}
      >
        {project.title}
      </div>
    </div>
  );
}

export default ProjectCard;
