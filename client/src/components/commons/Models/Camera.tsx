import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { ISetting } from "../../../Interface";

interface Props {
  setting: ISetting;
}

function Camera({ setting }: Props) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.x = setting.xcamera;
    camera.position.y = setting.ycamera;
    camera.position.z = setting.zcamera;
  }, [setting]);

  return <mesh></mesh>;
}

export default Camera;
