import { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { ISetting } from "../../../Interface";

interface Props {
  setting: ISetting | undefined;
}

function Camera({ setting }: Props) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.x = setting?.xcamera || 5;
    camera.position.y = setting?.ycamera || 5;
    camera.position.z = setting?.zcamera || 5;
  }, [setting?.xcamera, setting?.ycamera, setting?.zcamera]);

  return <mesh></mesh>;
}

export default Camera;
