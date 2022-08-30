import ModelPositionControls from "./ModelPositionContorls";
import ModelRotationControls from "./ModelRotationControls";

interface Props {
  groupPosition: [number, number, number];
  setgroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setgroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}

function ModelGroupControls(props: Props) {
  const { groupPosition, setgroupPosition, groupRotation, setgroupRotation } =
    props;

  return (
    <div>
      <ModelPositionControls
        type="Group"
        position={groupPosition}
        setposition={setgroupPosition}
      />
      <ModelRotationControls
        type="Group"
        rotation={groupRotation}
        setrotation={setgroupRotation}
      />
    </div>
  );
}

export default ModelGroupControls;
