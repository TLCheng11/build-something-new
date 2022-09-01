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
        <h1>
          Selected {selectedModel.type === "planes" && "Plane"}
          {selectedModel.type === "boxes" && "Box"}
          {selectedModel.type === "spheres" && "Sphere"}
        </h1>
        <button id="delete-model" className="border" onClick={deleteModel}>
          Delete
        </button>
      </div>
      <h1>Model Size:</h1>
      {selectedModel.type === "planes" && (
        <div>
          <div>
            <label htmlFor="model-width">Width:</label>
            <input
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
          <div>
            <label htmlFor="model-depth">Depth:</label>
            <input
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
          <div>
            <label htmlFor="model-width">Width:</label>
            <input
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
          <div>
            <label htmlFor="model-height">Height:</label>
            <input
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
          <div>
            <label htmlFor="model-depth">Depth:</label>
            <input
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
          <div>
            <label htmlFor="model-radius">Radius:</label>
            <input
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
          <div>
            <label htmlFor="model-width-segments">Width Segments:</label>
            <input
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
          <div>
            <label htmlFor="model-height-segments">Height Segments:</label>
            <input
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
    </div>
  );
}

export default ModelSizeContorls;
