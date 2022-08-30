interface Props {
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelPositionControls(props: Props) {
  const { position, setposition } = props;

  return (
    <div id="model-position-controls" className="h-full w-full bg-gray-600">
      <div>
        <h1>Model Positions:</h1>
      </div>
      <div>
        <label htmlFor="model-X-position">X-Position:</label>
        <input
          type="number"
          name="model-X-position"
          value={position[0]}
          onChange={(e) =>
            setposition((position) => [
              parseInt(e.target.value),
              position[1],
              position[2],
            ])
          }
        />
      </div>
      <div>
        <label htmlFor="model-Y-position">Y-Position:</label>
        <input
          type="number"
          name="model-Y-position"
          value={position[1]}
          onChange={(e) =>
            setposition((position) => [
              position[0],
              parseInt(e.target.value),
              position[2],
            ])
          }
        />
      </div>
      <div>
        <label htmlFor="model-Z-position">Z-Position:</label>
        <input
          type="number"
          name="model-Z-position"
          value={position[2]}
          onChange={(e) =>
            setposition((position) => [
              position[0],
              position[1],
              parseInt(e.target.value),
            ])
          }
        />
      </div>
    </div>
  );
}

export default ModelPositionControls;
