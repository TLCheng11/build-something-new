import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";
import ModelPositionControls from "../DesignControls/ModelPositionContorls";
import ModelRotationControls from "../DesignControls/ModelRotationControls";
import ModelSizeContorls from "../DesignControls/ModelSizeControls";
import ModelTypesControls from "../DesignControls/ModelTypeControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridModel: boolean;
  setshowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
  selectedModel: {
    type: string;
    id: number;
  };
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  size: [number, number, number];
  setsize: Dispatch<SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function DesignControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    showGridModel,
    setshowGridModel,
    modelType,
    setmodelType,
    selectedModel,
    planeSize,
    setplaneSize,
    size,
    setsize,
    position,
    setposition,
    rotation,
    setrotation,
  } = props;
  return (
    <div>
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
        showGridModel={showGridModel}
        setshowGridModel={setshowGridModel}
      />
      <ModelTypesControls modelType={modelType} setmodelType={setmodelType} />
      <ModelSizeContorls
        selectedModel={selectedModel}
        size={size}
        setsize={setsize}
        planeSize={planeSize}
        setplaneSize={setplaneSize}
      />
      <ModelPositionControls position={position} setposition={setposition} />
      <ModelRotationControls rotation={rotation} setrotation={setrotation} />
    </div>
  );
}

export default DesignControls;
