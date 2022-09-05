import { Loader } from "@react-three/drei";
import { Suspense, useState } from "react";
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
  const [onMarket, setonMarket] = useState<boolean>(project.on_market);

  const showProject = project.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => <RoomContent key={group.id} group={group} />);

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  function putOnMarket(e: React.ChangeEvent<HTMLInputElement>) {
    fetch(`/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ on_market: e.target.checked }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setonMarket(data.on_market));
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  function deleteProject() {
    if (window.confirm("Are you sure?")) {
      fetch(`/projects/${project.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              alert(data.message);
              if (setrefresh) {
                setrefresh((state: boolean) => !state);
              }
            });
          } else {
            res.json().then((data) => alert(data.error));
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
            <ambientLight intensity={0.3} />
            <directionalLight position={[1000, 1000, 500]} intensity={1} />
            <spotLight position={[0, 1000, 0]} intensity={0.5} />
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
          <div className="flex items-center justify-center w-full mb-12">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  className="sr-only"
                  type="checkbox"
                  checked={onMarket}
                  onChange={(e) => {
                    putOnMarket(e);
                  }}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
              <div className="ml-3 text-white font-medium">On Market</div>
            </label>
          </div>
          <button
            className="border mx-1 disabled:opacity-60"
            onClick={() => toProjectDesign(project.id)}
            disabled={onMarket}
          >
            Edit
          </button>
          <button
            className="border mx-1 disabled:opacity-60"
            onClick={deleteProject}
            disabled={onMarket}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
