import { Dispatch, SetStateAction } from "react";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
}

function GridControls(props: Props) {
  const { showGridMain, setshowGridMain } = props;

  return (
    <div id="design-controls" className="h-full w-full bg-gray-600">
      <div id="grid-control">
        <label>Show Grids:</label>
        <div>
          <label htmlFor="show-main-grid">Main: </label>
          <input
            name="show-main-grid"
            type="checkbox"
            checked={showGridMain}
            onChange={(e) => setshowGridMain(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default GridControls;
