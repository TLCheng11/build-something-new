import { SketchPicker } from "react-color";

interface Props {
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelColorControls(props: Props) {
  const { modelColor, setmodelColor } = props;

  return (
    <div id="model-color-controls" className="h-full w-full bg-gray-600">
      <div id="model-color-selection" className="flex flex-col">
        <div>
          <h1>Model Color:</h1>
        </div>
        <div>
          <SketchPicker
            color={modelColor}
            onChangeComplete={(color) => setmodelColor(color.hex)}
          />
        </div>
      </div>
    </div>
  );
}

export default ModelColorControls;
