import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { IProject } from "../../Interface";
import Camera from "../commons/Models/Camera";
import ModelLight from "../commons/Models/ModelLight";
import RoomContent from "../commons/ShowRoom/RoomContent";
import Details from "./Details";

function DetailView() {
  let navigate = useNavigate();
  const params = useParams();
  const [notFound, setnotFound] = useState<boolean>(false);
  const [project, setproject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });

  const showProject = project.model_groups.map((group) => (
    <RoomContent key={group.id} group={group} />
  ));
  // .filter((group) => !group.parent_group_id)

  useEffect(() => {
    fetch(`/projects_data/${params.project_id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setproject(data);
          })
          .catch(console.error);
      } else {
        const id = setTimeout(() => {
          navigate(-1);
        }, 2000);
        setnotFound(true);

        return () => clearInterval(id);
      }
    });
  }, []);

  if (notFound) return <h1>Page Not Found</h1>;

  return (
    <div className="h-screen w-screen pt-10 overflow-auto">
      <div
        id="detailview-background"
        className="fixed h-full w-full -z-10 bg-white"
      ></div>
      <div>
        <button
          className="fixed flex items-end justify-end h-24 w-24 -top-12 -left-12 p-3 bg-blue-400 rounded-full hover:scale-200 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <p className="-rotate-45">Back</p>
        </button>
      </div>
      <div className="flex h-5/6 w-full">
        <div className="flex justify-center h-full w-2/3 m-2">
          <div
            className="h-full w-full mx-5 min-h-360px min-w-360px rounded-3xl bg-blue-200"
            style={{ backgroundColor: project.project_setting?.bg_color }}
          >
            <Canvas
              camera={{
                position: [
                  project.project_setting?.xcamera || 5,
                  project.project_setting?.ycamera || 5,
                  project.project_setting?.zcamera || 5,
                ],
                near: 0.1,
                far: 1000,
              }}
            >
              <Camera setting={project.project_setting} />
              <OrbitControls />
              <ModelLight />
              <Suspense fallback={null}>{showProject}</Suspense>
            </Canvas>
            <Loader />
          </div>
        </div>
        <Details project={project} />
      </div>
    </div>
  );
}

export default DetailView;
