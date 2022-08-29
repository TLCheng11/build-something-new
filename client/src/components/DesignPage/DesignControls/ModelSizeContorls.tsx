import { Dispatch, SetStateAction } from "react";

interface Props {
  modelType: string;
  size: [number, number, number];
  setSize: Dispatch<SetStateAction<[number, number, number]>>;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function ModelSizeContorls(props: Props) {
  const { modelType, size, setSize, planeSize, setplaneSize } = props;

  return (
    <div id="model-size-controls" className="h-full w-full bg-gray-600">
      <div>
        <h1>Model Size:</h1>
      </div>
      {modelType === "Plane" && (
        <div>
          <div>
            <label htmlFor="model-width">Width</label>
            <input
              type="number"
              min="0"
              name="model-width"
              value={planeSize[0]}
              onChange={(e) =>
                setplaneSize((size) => [parseInt(e.target.value), size[1]])
              }
            />
          </div>
          <div>
            <label htmlFor="model-depth">Depth</label>
            <input
              type="number"
              min="0"
              name="model-depth"
              value={planeSize[1]}
              onChange={(e) =>
                setplaneSize((size) => [size[0], parseInt(e.target.value)])
              }
            />
          </div>
        </div>
      )}
      {modelType === "Box" && (
        <div>
          <div>
            <label htmlFor="model-width">Width</label>
            <input
              type="number"
              min="0"
              name="model-width"
              value={size[0]}
              onChange={(e) =>
                setSize((size) => [parseInt(e.target.value), size[1], size[2]])
              }
            />
          </div>
          <div>
            <label htmlFor="model-height">Height</label>
            <input
              type="number"
              min="0"
              name="model-height"
              value={size[1]}
              onChange={(e) =>
                setSize((size) => [size[0], parseInt(e.target.value), size[2]])
              }
            />
          </div>
          <div>
            <label htmlFor="model-depth">Depth</label>
            <input
              type="number"
              min="0"
              name="model-depth"
              value={size[2]}
              onChange={(e) =>
                setSize((size) => [size[0], size[1], parseInt(e.target.value)])
              }
            />
          </div>
        </div>
      )}
      {modelType === "Sphere" && (
        <div>
          <div>
            <label htmlFor="model-radius">Radius</label>
            <input
              type="number"
              min="0"
              name="model-radius"
              value={size[0]}
              onChange={(e) =>
                setSize((size) => [parseInt(e.target.value), size[1], size[2]])
              }
            />
          </div>
          <div>
            <label htmlFor="model-width-segments">Width Segments</label>
            <input
              type="number"
              min="0"
              name="model-width-segments"
              value={size[1]}
              onChange={(e) =>
                setSize((size) => [size[0], parseInt(e.target.value), size[2]])
              }
            />
          </div>
          <div>
            <label htmlFor="model-height-segments">Height Segments</label>
            <input
              type="number"
              min="0"
              name="model-height-segments"
              value={size[2]}
              onChange={(e) =>
                setSize((size) => [size[0], size[1], parseInt(e.target.value)])
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelSizeContorls;
