import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { ICurrentProject } from "../../Interface";
import RoomContent from "../commons/ShowRoom/RoomContent";

function DetailView() {
  let navigate = useNavigate();
  const params = useParams();
  const [notFound, setnotFound] = useState<boolean>(false);
  const [currentProject, setcurrentProject] = useState<ICurrentProject>({
    model_groups: [{ id: 0, group_name: "" }],
  });

  const showProject = currentProject.model_groups
    .filter((group) => !group.parent_group_id)
    .map((group) => <RoomContent key={group.id} group={group} />);

  useEffect(() => {
    fetch(`/projects/${params.project_id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setcurrentProject(data);
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
    <div className="h-screen w-screen bg-black">
      <div className="flex justify-center h-4/5 w-full">
        <div className="h-full w-4/5 rounded-3xl bg-gray-400">
          <Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
            <Suspense fallback={null}>{showProject}</Suspense>
            <OrbitControls />
          </Canvas>
          <Loader />
        </div>
      </div>
    </div>
  );
}

export default DetailView;
