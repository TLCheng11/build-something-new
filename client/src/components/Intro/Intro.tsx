import { Physics } from "@react-three/cannon";
import { Loader } from "@react-three/drei";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { IProject } from "../../Interface";
import ModelLight from "../commons/Models/ModelLight";
import PhysicGroup from "../TestPhysic/PhysicGroup";
import IntroCamera from "./IntroCamera";

function ShowModel() {
  const [model, setmodel] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [],
  });

  const showModel = model.model_groups.map((group) => (
    <PhysicGroup key={group.id} group={group} />
  ));

  useEffect(() => {
    fetch("/intro/model.json")
      .then((res) => res.json())
      .then(setmodel);
  }, []);

  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas
        camera={{
          position: [50, 3, 25],
          rotation: [0, 0, 0],
          near: 0.1,
          far: 1000,
        }}
      >
        <ModelLight />
        <IntroCamera />
        <Physics gravity={[0, -120, 0]}>
          <Suspense fallback={null}>{showModel}</Suspense>
        </Physics>
      </Canvas>
      <Loader />
    </div>
  );
}

export default ShowModel;
