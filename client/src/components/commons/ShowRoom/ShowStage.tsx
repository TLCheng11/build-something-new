import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Group } from "three";

interface Props {
  children: JSX.Element[];
}

function ShowStage({ children }: Props) {
  const turnRef = useRef<Group | null>(null);

  useFrame(() => {
    if (turnRef.current) {
      turnRef.current.rotation.y -= 0.005;
    }
  });

  return <group ref={turnRef}>{children}</group>;
}

export default ShowStage;
