import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { IProject } from "../../../Interface";
import RoomContent from "../ShowRoom/RoomContent";
import RoomStage from "../ShowRoom/RoomStage";

interface Props {
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  project: IProject;
}

function ProjectCard(props: Props) {
  let navigate = useNavigate();
  const { setrefresh, type, project } = props;

  const showProject = project.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => <RoomContent key={group.id} group={group} />);

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  function deleteProject() {
    if (window.confirm("Are you sure?")) {
      fetch(`/projects/${project.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Project deleted");
          if (setrefresh) {
            setrefresh((state: boolean) => !state);
          }
        })
        .catch(console.error);
    }
  }

  return (
    <div className="col-span-1 flex flex-col items-center min-h-360px max-h-400px rounded-xl border">
      <div className="h-4/5 w-full rounded-t-xl bg-gray-400">
        <NavLink to={`/project-detail-view/${project.id}`}>
          <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
            <Suspense fallback={null}>
              <RoomStage>{showProject}</RoomStage>
            </Suspense>
          </Canvas>
          <Loader />
        </NavLink>
      </div>
      <div className="w-11/12">
        <h1>{project.title}</h1>
        {type !== "myProject" && <h1>Creator: {project.creator}</h1>}
      </div>
      {type === "myProject" && (
        <div>
          <button
            className="border mx-1"
            onClick={() => toProjectDesign(project.id)}
          >
            Edit
          </button>
          <button className="border mx-1" onClick={deleteProject}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
