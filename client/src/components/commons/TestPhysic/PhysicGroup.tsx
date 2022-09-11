import { IModelGroup } from "../../../Interface";
import PhysicBox from "./PhysicBoxes";
import PhysicCylinder from "./PhysicCylinder";
import PhysicPlane from "./PhysicPlane";
import PhysicShape from "./PhysicShape";
import PhysicSphere from "./PhysicSphere";

interface Props {
  group: IModelGroup;
}

function PhysicGroup({ group }: Props) {
  const showChildGroups = group.child_groups?.map((group) => (
    <PhysicGroup key={group.id} group={group} />
  ));

  const showPlanes = group.model_planes?.map((plane) => (
    <PhysicPlane key={plane.id} plane={plane} />
  ));

  const showBoxes = group.model_boxes?.map((box) => (
    <PhysicBox key={box.id} box={box} />
  ));

  const showShapes = group.model_shapes?.map((shape) => (
    <PhysicShape key={shape.id} shape={shape} />
  ));

  const showSpheres = group.model_spheres?.map((sphere) => (
    <PhysicSphere key={sphere.id} sphere={sphere} />
  ));

  const showCylinders = group.model_cylinders?.map((cylinder) => (
    <PhysicCylinder key={cylinder.id} cylinder={cylinder} />
  ));

  return (
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
      <>
        {showChildGroups}
        {showPlanes}
        {showShapes}
        {showBoxes}
        {showSpheres}
        {showCylinders}
      </>
    </group>
  );
}

export default PhysicGroup;
