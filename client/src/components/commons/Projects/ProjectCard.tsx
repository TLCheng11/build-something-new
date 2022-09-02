import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "react-three-fiber";

interface Props {
  project: {
    id: number;
    title?: string | undefined;
  };
}

function ProjectCard(props: Props) {
  let navigate = useNavigate();
  const { project } = props;

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  return (
    <div className="col-span-1 flex flex-col items-center h-screen-40 rounded-xl border">
      <div className="h-4/5 w-full rounded-t-xl bg-gray-400">
        <Canvas>
          <Suspense fallback={null}></Suspense>
          <Loader />
        </Canvas>
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
