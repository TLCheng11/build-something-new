import { useState } from "react";

interface Props {
  type: string;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelPositionControls(props: Props) {
  const { type, position, setposition } = props;
  const [step, setstep] = useState<string>("0.05");

  return (
    <div id="model-position-controls" className="h-full w-full bg-gray-600">
      <div>
        <h1>{type} Positions:</h1>
      </div>
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-X-position">X-Position:</label>
        </div>
        <input
          className="design-input"
          type="number"
          step={step}
          name="model-X-position"
          value={position[0]}
          onChange={(e) =>
            setposition((position) => [
              parseFloat(e.target.value),
              position[1],
              position[2],
            ])
          }
        />
      </div>
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-Y-position">Y-Position:</label>
        </div>
        <input
          className="design-input"
          type="number"
          step={step}
          name="model-Y-position"
          value={position[1]}
          onChange={(e) =>
            setposition((position) => [
              position[0],
              parseFloat(e.target.value),
              position[2],
            ])
          }
        />
      </div>
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="model-Z-position">Z-Position:</label>
        </div>
        <input
          className="design-input"
          type="number"
          step={step}
          name="model-Z-position"
          value={position[2]}
          onChange={(e) =>
            setposition((position) => [
              position[0],
              position[1],
              parseFloat(e.target.value),
            ])
          }
        />
      </div>
    </div>
  );
}

export default ModelPositionControls;
