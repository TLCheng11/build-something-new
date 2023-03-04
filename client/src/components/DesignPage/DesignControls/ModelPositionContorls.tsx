import { useState } from "react";

interface Props {
  type: string;
  position: [number, number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

function ModelPositionControls(props: Props) {
  const { type, position, setPosition } = props;
  const [step, setStep] = useState<string>("0.05");

  return (
    <div id="model-position-controls" className="w-full bg-gray-600">
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
            setPosition((position) => [
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
            setPosition((position) => [
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
            setPosition((position) => [
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
