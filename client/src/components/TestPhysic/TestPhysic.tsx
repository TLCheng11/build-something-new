import { Physics } from "@react-three/cannon";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { IProject, ISetting } from "../../Interface";
import ModelLight from "../commons/Models/ModelLight";
import PhysicGroup from "./PhysicGroup";

function TestPhysic() {
  let navigate = useNavigate();
  const params = useParams();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [project, setProject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });
  const [dataLoaded, setdataLoaded] = useState<boolean>(false);

  const showProject = project.model_groups.map((group) => (
    <PhysicGroup key={group.id} group={group} />
  ));

  useEffect(() => {
    fetch(`/projects_data/${params.project_id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setProject(data);
            setdataLoaded(true);
          })
          .catch(console.error);
      } else {
        const id = setTimeout(() => {
          navigate(-1);
        }, 2000);
        setNotFound(true);

        return () => clearInterval(id);
      }
    });
  }, []);

  if (notFound) return <h1>Page Not Found</h1>;

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundColor: project.project_setting?.bg_color }}
    >
      <button
        className="fixed flex items-end justify-end h-24 w-24 z-10 -top-12 -left-12 p-3 bg-blue-400 rounded-full hover:scale-200 transition-all duration-300"
        onClick={() => navigate(-1)}
      >
        <p className="-rotate-45">Back</p>
      </button>
      {dataLoaded ? (
        <div className="h-full w-full">
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
            shadows
          >
            <OrbitControls />
            <ModelLight />
            <Physics gravity={[0, -100, 0]}>
              <Suspense fallback={null}>{showProject}</Suspense>
            </Physics>
          </Canvas>
          <Loader />;
        </div>
      ) : (
        <div className="text-4xl">Loading...</div>
      )}
    </div>
  );
}

export default TestPhysic;
