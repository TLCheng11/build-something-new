interface Props {
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelRotationControls(props: Props) {
  const { rotation, setrotation } = props;

  return (
    <div id="model-rotation-controls" className="h-full w-full bg-gray-600">
      <div>
        <h1>Model Rotations:</h1>
      </div>
      <div>
        <label htmlFor="model-rotation-x">Rotation-x:</label>
        <input
          type="number"
          name="model-rotation-x"
          value={rotation[0]}
          onChange={(e) =>
            setrotation((rotation) => [
              parseInt(e.target.value),
              rotation[1],
              rotation[2],
            ])
          }
        />
      </div>
      <div>
        <label htmlFor="model-rotation-y">Rotation-y:</label>
        <input
          type="number"
          name="model-rotation-y"
          value={rotation[1]}
          onChange={(e) =>
            setrotation((rotation) => [
              rotation[0],
              parseInt(e.target.value),
              rotation[2],
            ])
          }
        />
      </div>
      <div>
        <label htmlFor="model-rotation-z">Rotation-z:</label>
        <input
          type="number"
          name="model-rotation-z"
          value={rotation[2]}
          onChange={(e) =>
            setrotation((rotation) => [
              rotation[0],
              rotation[1],
              parseInt(e.target.value),
            ])
          }
        />
      </div>
    </div>
  );
}

export default ModelRotationControls;
