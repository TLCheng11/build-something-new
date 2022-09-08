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
  sphereSize: [number, number, number];
  setsphereSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  shapeSize: [number, number, number];
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
  } = props;
  const [step, setstep] = useState<string>("0.1");

  function deleteModel() {
    if (selectedModel.id > 0) {
      fetch(`/model_${selectedModel.type}/${selectedModel.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(() => setselectedModel({ type: "", id: 0 }));
          } else res.json().then(console.log);
        })
        .catch(console.error);
    }
  }

  return (
    <div id="model-size-controls" className="h-full w-full bg-gray-600">
      <div className="flex">
        <h1 className="mr-4">
          Selected: {selectedModel.type === "planes" && "Plane"}
          {selectedModel.type === "boxes" && "Box"}
          {selectedModel.type === "spheres" && "Sphere"}
          {selectedModel.type === "shapes" && "Shape"}
        </h1>
        <button id="delete-model" className="design-btn" onClick={deleteModel}>
          Delete
        </button>
      </div>
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
              min="0.1"
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
              min="0.1"
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
      {selectedModel.type === "boxes" && (
        <div>
          <div className="flex">
            <div className="w-1/3">
              <label htmlFor="model-width">Width:</label>
            </div>
            <input
              className="design-input"
              type="number"
              min="0.1"
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
              min="0.1"
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
              min="0.1"
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
              min="0.1"
              step={step}
              name="model-radius"
              value={sphereSize[0]}
              onChange={(e) =>
                setsphereSize((size) => [
                  parseFloat(e.target.value),
                  size[1],
                  size[2],
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
                ])
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
              min="0.1"
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
              min="0"
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
              type="number"
              min="0"
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelSizeContorls;
