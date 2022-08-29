interface Props {
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelPositionControls(props: Props) {
  const { position, setposition } = props;

  return (
    <div id="model-position-controls" className="h-full w-full bg-gray-600">
      <div>
        <label htmlFor="model-position-x">Position-x:</label>
        <input
          type="number"
          name="model-position-x"
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
        <label htmlFor="model-position-y">Position-y:</label>
        <input
          type="number"
          name="model-position-y"
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
        <label htmlFor="model-position-z">Position-z:</label>
        <input
          type="number"
          name="model-position-z"
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
