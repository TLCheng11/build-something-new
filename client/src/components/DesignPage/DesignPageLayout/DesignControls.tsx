import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";
import ModelPositionControls from "../DesignControls/ModelPositionContorls";
import ModelSizeContorls from "../DesignControls/ModelSizeControls";
import ModelTypesControls from "../DesignControls/ModelTypeControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
  size: [number, number, number];
  setsize: Dispatch<SetStateAction<[number, number, number]>>;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function DesignControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    modelType,
    setmodelType,
    planeSize,
    setplaneSize,
    size,
    setsize,
    position,
    setposition,
  } = props;
  return (
    <div>
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
      />
      <ModelTypesControls modelType={modelType} setmodelType={setmodelType} />
      <ModelSizeContorls
        modelType={modelType}
        size={size}
        setsize={setsize}
        planeSize={planeSize}
        setplaneSize={setplaneSize}
      />
      <ModelPositionControls position={position} setposition={setposition} />
    </div>
  );
}

export default DesignControls;
