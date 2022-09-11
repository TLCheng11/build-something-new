import { Dispatch, SetStateAction } from "react";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridGroup: boolean;
  setshowGridGroup: React.Dispatch<React.SetStateAction<boolean>>;
  showGridModel: boolean;
  setshowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
  gridMain: [number, number, string, string];
  setgridMain: React.Dispatch<
    React.SetStateAction<[number, number, string, string]>
  >;
}

function GridControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    showGridGroup,
    setshowGridGroup,
    showGridModel,
    setshowGridModel,
    gridMain,
    setgridMain,
  } = props;

  return (
    <div id="grid-control" className="h-full w-full bg-gray-600">
      <div>
        <p>Grid Controls:</p>
      </div>
      <div className="flex">
        <p>Show Grids:</p>
        <div className="px-2">
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
        <div className="px-2">
          <label htmlFor="show-model-grid">Model</label>
          <input
            name="show-model-grid"
            type="checkbox"
            checked={showGridModel}
            onChange={(e) => setshowGridModel(e.target.checked)}
          />
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="main-grid-size">Main Grid Size:</label>
        <input
          className="design-input"
          name="main-grid-size"
          type="number"
          min={10}
          max={9999}
          value={gridMain[0]}
          onChange={(e) => {
            setgridMain([
              parseInt(e.target.value),
              parseInt(e.target.value) * 2,
              gridMain[2],
              gridMain[3],
            ]);
          }}
        />
      </div>
    </div>
  );
}

export default GridControls;
