import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selectedGroup: {
    id: number;
    name: string;
  };
  selectedModel: {
    type: string;
    id: number;
  };
  setselectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
}

function ModelTypesControls(props: Props) {
  const {
    selectedGroup,
    selectedModel,
    setselectedModel,
    modelType,
    setmodelType,
  } = props;

  const [isDisabled, setisDisabled] = useState<{
    add: boolean;
    copy: boolean;
  }>({ add: false, copy: false });

  function addModel() {
    fetch(`/model_${modelType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model_group_id: selectedGroup.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setselectedModel({ type: modelType, id: data.id });
      });
  }

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

  function copyModel() {
    if (selectedModel.id > 0) {
      const id = selectedModel.id;
      setselectedModel({ ...selectedModel, id: 0 });
      setTimeout(() => {
        fetch(`/model_${selectedModel.type}_copy/${id}`, {
          method: "POST",
        })
          .then((res) => {
            if (res.ok) {
              res
                .json()
                .then((data) =>
                  setselectedModel({ ...selectedModel, id: data.id })
                );
            } else res.json().then(console.log);
          })
          .catch(console.error);
      }, 500);
    }
  }

  function disableBtn(type: string) {
    setisDisabled({ ...isDisabled, [type]: true });
    setTimeout(() => {
      setisDisabled({ add: false, copy: false });
    }, 2000);
  }

  return (
    <div id="model-type-controls" className="h-full w-full bg-gray-600">
      <div className="flex mb-2">
        <h1 className="mr-3">Model Controls:</h1>
        <button
          id="delete-model"
          className="design-btn min-w-fit px-2 hover:bg-red-500"
          onClick={deleteModel}
        >
          Delete Model
        </button>
      </div>
      <div id="model-type-selection" className="flex">
        <h1 className="w-1/3">Model Type:</h1>
        <div className="px-2">
          <select
            className="design-input"
            id="model-type"
            value={modelType}
            onChange={(e) => setmodelType(e.target.value)}
          >
            <option value="planes">Plane</option>
            <option value="shapes">Shape</option>
            <option value="boxes">Box</option>
            <option value="spheres">Sphere</option>
            <option value="cylinders">Cylinder</option>
          </select>
        </div>
        <button
          id="add-model"
          className="design-btn"
          disabled={isDisabled.add}
          onClick={() => {
            disableBtn("add");
            addModel();
          }}
        >
          Add
        </button>
      </div>
      {selectedModel.id > 0 && (
        <div className="flex mt-1">
          <h1 className="w-1/3 min-w-fit mr-3">
            Selected:{" "}
            <span className="text-blue-500">
              {selectedModel.type === "planes" && "Plane"}
              {selectedModel.type === "boxes" && "Box"}
              {selectedModel.type === "spheres" && "Sphere"}
              {selectedModel.type === "shapes" && "Shape"}
              {selectedModel.type === "cylinders" && "Cylinder"}
            </span>{" "}
            {/* from ({selectedGroup.name}) */}
          </h1>
          <div>
            <button
              className="design-btn px-2 min-w-fit whitespace-nowrap hover:bg-green-600 isDisabled:opacity-60"
              disabled={isDisabled.copy}
              onClick={() => {
                disableBtn("copy");
                copyModel();
              }}
            >
              Copy Model
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelTypesControls;
