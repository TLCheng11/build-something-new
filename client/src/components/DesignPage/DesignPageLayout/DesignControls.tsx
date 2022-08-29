import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";
import ModelSizeContorls from "../DesignControls/ModelSizeContorls";
import ModelTypesControls from "../DesignControls/ModelTypeControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
  size: [number, number, number];
  setSize: Dispatch<SetStateAction<[number, number, number]>>;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function DesignControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    modelType,
    setmodelType,
    size,
    setSize,
    planeSize,
    setplaneSize,
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
        setSize={setSize}
        planeSize={planeSize}
        setplaneSize={setplaneSize}
      />
    </div>
  );
}

export default DesignControls;
