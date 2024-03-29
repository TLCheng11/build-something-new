import { Dispatch, SetStateAction } from "react";
import { ChromePicker } from "react-color";
import { IProject, ISetting } from "../../../Interface";

interface Props {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: IProject;
  setting: ISetting;
  setSetting: React.Dispatch<React.SetStateAction<ISetting>>;
}

function SettingControls(props: Props) {
  const { setRefresh, currentProject, setting, setSetting } = props;

  function updateCamera(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/project_settings/${currentProject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xcamera: setting.xcamera,
        ycamera: setting.ycamera,
        zcamera: setting.zcamera,
      }),
    })
      .then((res) => res.json())
      .then(() => setRefresh((state) => !state))
      .catch(console.error);
  }

  function updateColor() {
    fetch(`/project_settings/${currentProject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bg_color: setting.bg_color,
      }),
    })
      .then((res) => res.json())
      .then(() => setRefresh((state) => !state))
      .catch(console.error);
  }

  return (
    <div id="setting-control" className="w-full bg-gray-600">
      <div className="flex">
        <p>Project Settings:</p>
      </div>
      <div className="flex">
        <p>Background Color:</p>
        <div
          className="h-7 w-16 mx-2 border rounded-sm"
          style={{ backgroundColor: currentProject.project_setting?.bg_color }}
        ></div>
        <button
          className="design-btn min-w-fit px-1 whitespace-nowrap"
          onClick={updateColor}
        >
          Save Color
        </button>
      </div>
      <div className="my-2 flex justify-center">
        <ChromePicker
          color={setting.bg_color}
          onChangeComplete={(color) =>
            setSetting({ ...setting, bg_color: color.hex })
          }
        />
      </div>
      <div className="flex">
        <h1>Camera Position:</h1>
        <div className="ml-2">
          <p className="min-w-input flex justify-between text-blue-400">
            X: {currentProject.project_setting?.xcamera}
            <span className="text-white">|</span>Y:{" "}
            {currentProject.project_setting?.ycamera}
            <span className="text-white">|</span>Z:{" "}
            {currentProject.project_setting?.zcamera}
          </p>
        </div>
      </div>
      <form className="pb-2 border-b border-black" onSubmit={updateCamera}>
        <div className="flex">
          <label htmlFor="xcamera" className="mx-1">
            X
          </label>
          <input
            className="w-14 rounded-lg text-black"
            name="xcamera"
            type="number"
            step={0.1}
            value={setting.xcamera}
            onChange={(e) =>
              setSetting({ ...setting, xcamera: parseFloat(e.target.value) })
            }
            required
          />
          <label htmlFor="ycamera" className="mx-1">
            Y
          </label>
          <input
            className="w-14 rounded-lg text-black"
            name="ycamera"
            type="number"
            step={0.1}
            value={setting.ycamera}
            onChange={(e) =>
              setSetting({ ...setting, ycamera: parseFloat(e.target.value) })
            }
            required
          />
          <label htmlFor="zcamera" className="mx-1">
            Z
          </label>
          <input
            className="w-14 rounded-lg text-black"
            name="zcamera"
            type="number"
            step={0.1}
            value={setting.zcamera}
            onChange={(e) =>
              setSetting({ ...setting, zcamera: parseFloat(e.target.value) })
            }
            required
          />
          <button
            className="design-btn ml-2 px-1 min-w-fit whitespace-nowrap"
            type="submit"
          >
            Set Camera
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingControls;
