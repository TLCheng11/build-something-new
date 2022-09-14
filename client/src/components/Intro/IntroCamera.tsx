import { useEffect } from "react";
import { useThree } from "react-three-fiber";

function IntroCamera() {
  const { camera } = useThree();
  let xcamera = 0.01;
  let ycamera = 0.01;
  let zcamera = 0.005;

  let xrotation = 0.0005;

  useEffect(() => {
    const allIds: NodeJS.Timer[] = [];

    const idX = setInterval(() => {
      camera.position.x -= xcamera;
    }, 5);
    allIds.push(idX);

    const stopX = setInterval(() => {
      if (camera.position.x <= 0) {
        clearInterval(idX);
      }
    }, 5);
    allIds.push(stopX);

    const idRX = setInterval(() => {
      camera.rotation.x -= xrotation;
    }, 10);
    allIds.push(idRX);
    allIds.push(setTimeout(() => clearInterval(idRX), 30000));

    allIds.push(
      setTimeout(() => {
        const idY = setInterval(() => {
          camera.position.y += ycamera;
        }, 5);
        allIds.push(idY);
        allIds.push(setTimeout(() => clearInterval(idY), 25000));

        const idZ = setInterval(() => {
          camera.position.z -= zcamera;
        }, 5);
        allIds.push(idZ);
        allIds.push(setTimeout(() => clearInterval(idZ), 25000));
      }, 5000)
    );

    return () => {
      allIds.forEach((id) => clearInterval(id));
    };
  }, []);

  return <mesh></mesh>;
}

export default IntroCamera;
