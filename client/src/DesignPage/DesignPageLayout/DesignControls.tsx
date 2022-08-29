import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";
import ModelControls from "../DesignControls/ModelControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
}

function DesignControls(props: Props) {
  const { showGridMain, setshowGridMain, modelType, setmodelType } = props;
  return (
    <div>
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
      />
      <ModelControls modelType={modelType} setmodelType={setmodelType} />
    </div>
  );
}

export default DesignControls;
