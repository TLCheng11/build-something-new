import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { IProject } from "../../Interface";
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

  const showProject = project.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => <RoomContent key={group.id} group={group} />);

  useEffect(() => {
    fetch(`/projects/${params.project_id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setproject(data);
          })
          .catch(console.error);
      } else {
        const id = setTimeout(() => {
          navigate("/");
        }, 2000);
        setnotFound(true);

        return () => clearInterval(id);
      }
    });
  }, []);

  if (notFound) return <h1>Page Not Found</h1>;

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div
        id="detailview-background"
        className="fixed h-full w-full -z-10 bg-black"
      ></div>
      <div className="fixed">
        <button
          className="text-white text-3xl m-2 border"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="flex justify-center h-4/5 w-full my-2">
        <div className="h-full w-4/5 min-h-360px min-w-360px rounded-3xl bg-gray-400">
          <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
            <OrbitControls />
            <ModelLight />
            <Suspense fallback={null}>{showProject}</Suspense>
          </Canvas>
          <Loader />
        </div>
      </div>
      <Details project={project} />
    </div>
  );
}

export default DetailView;
