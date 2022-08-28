import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
}

function DesignControls(props: Props) {
  const { showGridMain, setshowGridMain } = props;
  return (
    <div>
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
      />
    </div>
  );
}

export default DesignControls;
