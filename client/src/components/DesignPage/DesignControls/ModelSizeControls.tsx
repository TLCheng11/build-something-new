import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selectedModel: {
    type: string;
    id: number;
  };
  setselectedModel: Dispatch<
    SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  boxSize: [number, number, number];
  setboxSize: Dispatch<SetStateAction<[number, number, number]>>;
  sphereSize: [number, number, number, number, number];
  setsphereSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number]>
  >;
  shapeSize: [number, number, number];
  cylinderSize: [number, number, number, number, number, boolean];
  setcylinderSize: React.Dispatch<
    React.SetStateAction<[number, number, number, number, number, boolean]>
  >;
  setshapeSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelSizeContorls(props: Props) {
  const {
    selectedModel,
    setselectedModel,
    boxSize,
    setboxSize,
    planeSize,
    setplaneSize,
    sphereSize,
    setsphereSize,
    shapeSize,
    setshapeSize,
    cylinderSize,
    setcylinderSize,
  } = props;
  const [step, setstep] = useState<string>("0.05");

  return (
    <div id="model-size-controls" className="h-full w-full bg-gray-600">
      <h1>Model Size:</h1>
      {selectedModel.type === "planes" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-width">Width:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-width"
              value={planeSize[0]}
              onChange={(e) =>
                setplaneSize((size) => [parseFloat(e.target.value), size[1]])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-depth">Depth:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-depth"
              value={planeSize[1]}
              onChange={(e) =>
                setplaneSize((size) => [size[0], parseFloat(e.target.value)])
              }
            />
          </div>
        </div>
      )}

      {selectedModel.type === "shapes" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-radius">Radius:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-radius"
              value={shapeSize[0]}
              onChange={(e) =>
                setshapeSize((size) => [
                  parseFloat(e.target.value),
                  size[1],
                  size[2],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-segments">Segments:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="3"
              name="model-segments"
              value={shapeSize[1]}
              onChange={(e) =>
                setshapeSize((size) => [
                  size[0],
                  parseFloat(e.target.value),
                  size[2],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-theta-length">Theta Length:</label>
            </div>
            <input
              className="design-input"
              type="range"
              min={1}
              max={720}
              name="model-theta-length"
              value={shapeSize[2]}
              onChange={(e) =>
                setshapeSize((size) => [
                  size[0],
                  size[1],
                  parseFloat(e.target.value),
                ])
              }
            />
            <input
              className="w-4 mr-2 rounded-md"
              type="number"
              min={1}
              max={720}
              value={shapeSize[2]}
              onChange={(e) =>
                setshapeSize((size) => [
                  size[0],
                  size[1],
                  parseFloat(e.target.value),
                ])
              }
            />
            <p>{shapeSize[2]}</p>
          </div>
        </div>
      )}

      {selectedModel.type === "boxes" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-width">Width:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-width"
              value={boxSize[0]}
              onChange={(e) =>
                setboxSize((size) => [
                  parseFloat(e.target.value),
                  size[1],
                  size[2],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-height">Height:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-height"
              value={boxSize[1]}
              onChange={(e) =>
                setboxSize((size) => [
                  size[0],
                  parseFloat(e.target.value),
                  size[2],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-depth">Depth:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-depth"
              value={boxSize[2]}
              onChange={(e) =>
                setboxSize((size) => [
                  size[0],
                  size[1],
                  parseFloat(e.target.value),
                ])
              }
            />
          </div>
        </div>
      )}

      {selectedModel.type === "spheres" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-radius">Radius:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-radius"
              value={sphereSize[0]}
              onChange={(e) =>
                setsphereSize((size) => [
                  parseFloat(e.target.value),
                  size[1],
                  size[2],
                  size[3],
                  size[4],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-width-segments">W-Segments:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0"
              name="model-width-segments"
              value={sphereSize[1]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  parseFloat(e.target.value),
                  size[2],
                  size[3],
                  size[4],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-height-segments">H-Segments:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0"
              name="model-height-segments"
              value={sphereSize[2]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  size[1],
                  parseFloat(e.target.value),
                  size[3],
                  size[4],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-phi-length">Phi Length:</label>
            </div>
            <input
              className="design-input"
              type="range"
              min={1}
              max={720}
              name="model-phi-length"
              value={sphereSize[3]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  parseFloat(e.target.value),
                  size[4],
                ])
              }
            />
            <input
              className="w-4 mr-2 rounded-md"
              type="number"
              min={1}
              max={720}
              value={sphereSize[3]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  parseFloat(e.target.value),
                  size[4],
                ])
              }
            />
            <p>{sphereSize[3]}</p>
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-theta-length">Theta Length:</label>
            </div>
            <input
              className="design-input"
              type="range"
              min={1}
              max={720}
              name="model-theta-length"
              value={sphereSize[4]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  size[3],
                  parseFloat(e.target.value),
                ])
              }
            />
            <input
              className="w-4 mr-2 rounded-md"
              type="number"
              min={1}
              max={720}
              value={sphereSize[4]}
              onChange={(e) =>
                setsphereSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  size[3],
                  parseFloat(e.target.value),
                ])
              }
            />
            <p>{sphereSize[4]}</p>
          </div>
        </div>
      )}

      {selectedModel.type === "cylinders" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-radius-top">Radius Top:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0"
              step={step}
              name="model-radius-top"
              value={cylinderSize[0]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  parseFloat(e.target.value),
                  size[1],
                  size[2],
                  size[3],
                  size[4],
                  size[5],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-radius-bottom">Radius Bot:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-radius-bottom"
              value={cylinderSize[1]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  parseFloat(e.target.value),
                  size[2],
                  size[3],
                  size[4],
                  size[5],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-height">Height:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.05"
              step={step}
              name="model-height"
              value={cylinderSize[2]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  size[1],
                  parseFloat(e.target.value),
                  size[3],
                  size[4],
                  size[5],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-segments">Segments:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="2"
              name="model-segments"
              value={cylinderSize[3]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  parseFloat(e.target.value),
                  size[4],
                  size[5],
                ])
              }
            />
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-theta-length">Theta Length:</label>
            </div>
            <input
              className="design-input"
              type="range"
              min={1}
              max={720}
              name="model-theta-length"
              value={cylinderSize[4]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  size[3],
                  parseFloat(e.target.value),
                  size[5],
                ])
              }
            />
            <input
              className="w-4 mr-2 rounded-md"
              type="number"
              min={1}
              max={720}
              value={cylinderSize[4]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  size[3],
                  parseFloat(e.target.value),
                  size[5],
                ])
              }
            />
            <p>{cylinderSize[4]}</p>
          </div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-open-ended">Open Ended:</label>
            </div>
            <input
              className="design-input relative -left-14"
              type="checkbox"
              name="model-open-ended"
              checked={cylinderSize[5]}
              onChange={(e) =>
                setcylinderSize((size) => [
                  size[0],
                  size[1],
                  size[2],
                  size[3],
                  size[4],
                  e.target.checked,
                ])
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelSizeContorls;
