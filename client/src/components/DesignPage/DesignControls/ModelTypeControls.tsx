import { Dispatch, SetStateAction } from "react";

interface Props {
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
}

function ModelTypesControls(props: Props) {
  const { modelType, setmodelType } = props;

  function addModel() {
    fetch(`/${modelType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }

  return (
    <div id="model-type-controls" className="h-full w-full bg-gray-600">
      <h1>Model Control:</h1>
      <div id="model-type-selection" className="flex">
        <h1>Model Type:</h1>
        <div className="px-2">
          <select
            id="model-type"
            value={modelType}
            onChange={(e) => setmodelType(e.target.value)}
          >
            <option value="planes">Plane</option>
            <option value="boxes">Box</option>
            <option value="spheres">Sphere</option>
          </select>
        </div>
        <button id="add-model" className="border">
          Add
        </button>
      </div>
    </div>
  );
}

export default ModelTypesControls;
