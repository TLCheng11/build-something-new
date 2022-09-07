interface Props {
  type: string;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelRotationControls(props: Props) {
  const { type, rotation, setrotation } = props;

  return (
    <div id="model-rotation-controls" className="h-full w-full bg-gray-600">
      <div>
        <h1>{type} Rotations: (Degrees)</h1>
      </div>
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-X-rotation">X-Rotation:</label>
        </div>
        <input
          className="design-input"
          type="number"
          name="model-X-rotation"
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
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-Y-rotation">Y-Rotation:</label>
        </div>
        <input
          className="design-input"
          type="number"
          name="model-Y-rotation"
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
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-Z-rotation">Z-Rotation:</label>
        </div>
        <input
          className="design-input"
          type="number"
          name="model-Z-rotation"
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
