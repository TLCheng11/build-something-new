import { Dispatch, SetStateAction } from "react";

interface Props {
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
}

function ModelTypesControls(props: Props) {
  const { modelType, setmodelType } = props;

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
            <option value="plane">Plane</option>
            <option value="box">Box</option>
            <option value="sphere">Sphere</option>
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
