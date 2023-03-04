import { SketchPicker } from "react-color";

interface Props {
  modelColor: string;
  setModelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelColorControls(props: Props) {
  const { modelColor, setModelColor } = props;

  return (
    <div id="model-color-controls" className="w-full bg-gray-600">
      <div id="model-color-selection" className="flex flex-col">
        <div>
          <h1>Model Color:</h1>
        </div>
        <div className="flex justify-center text-black">
          <SketchPicker
            color={modelColor}
            onChangeComplete={(color) => setModelColor(color.hex)}
          />
        </div>
      </div>
    </div>
  );
}

export default ModelColorControls;
