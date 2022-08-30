import { Dispatch, SetStateAction } from "react";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridGroup: boolean;
  setshowGridGroup: React.Dispatch<React.SetStateAction<boolean>>;
  showGridModel: boolean;
  setshowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
}

function GridControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    showGridGroup,
    setshowGridGroup,
    showGridModel,
    setshowGridModel,
  } = props;

  return (
    <div id="design-controls" className="h-full w-full bg-gray-600">
      <div id="grid-control">
        <h1>Show Grids:</h1>
        <div className="flex">
          <div>
            <label htmlFor="show-main-grid">Main: </label>
            <input
              name="show-main-grid"
              type="checkbox"
              checked={showGridMain}
              onChange={(e) => setshowGridMain(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="show-group-grid">Group</label>
            <input
              name="show-group-grid"
              type="checkbox"
              checked={showGridGroup}
              onChange={(e) => setshowGridGroup(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="show-model-grid">Model</label>
            <input
              name="show-model-grid"
              type="checkbox"
              checked={showGridModel}
              onChange={(e) => setshowGridModel(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridControls;
