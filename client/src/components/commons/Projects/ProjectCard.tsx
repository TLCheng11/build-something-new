import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { IProject } from "../../../Interface";
import RoomContent from "../ShowRoom/RoomContent";
import RoomStage from "../ShowRoom/RoomStage";

interface Props {
  type: string;
  project: IProject;
}

function ProjectCard(props: Props) {
  let navigate = useNavigate();
  const { type, project } = props;

  const showProject = project.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => <RoomContent key={group.id} group={group} />);

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  return (
    <div className="col-span-1 flex flex-col items-center min-h-360px max-h-400px rounded-xl border">
      <div className="h-4/5 w-full rounded-t-xl bg-gray-400">
        <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <RoomStage>{showProject}</RoomStage>
          </Suspense>
        </Canvas>
        <Loader />
      </div>
      <div className="w-11/12">
        <h1>{project.title}</h1>
        {type !== "myProject" && <h1>Creator: {project.creator}</h1>}
      </div>
      {type === "myProject" && (
        <button onClick={() => toProjectDesign(project.id)}>Edit</button>
      )}
    </div>
  );
}

export default ProjectCard;
