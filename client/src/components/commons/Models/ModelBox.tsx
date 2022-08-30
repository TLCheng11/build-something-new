import { Box } from "@react-three/drei";
import { useEffect, useState } from "react";

interface Props {
  size: [number, number, number];
  setsize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  selectedModel: {
    type: string;
    id: number;
  };
  setselectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  id: number;
}

function ModelBox(props: Props) {
  const {
    size,
    setsize,
    selectedModel,
    setselectedModel,
    position,
    setposition,
    rotation,
    setrotation,
    id,
  } = props;
  const [selfSize, setselfSize] = useState<[number, number, number]>([1, 1, 1]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    if (selectedModel.type === "Box" && selectedModel.id === id) {
      setselfSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (selectedModel.type === "Box" && selectedModel.id === id) {
      setSelfPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (selectedModel.type === "Box" && selectedModel.id === id) {
      setselfRotation(rotation);
    }
  }, [rotation]);

  useEffect(() => {
    if (selectedModel.type === "Box" && selectedModel.id === id) {
      setsize(selfSize);
      setposition(selfPosition);
      setrotation(selfRotation);
    }
  }, [selectedModel]);

  function handleOnClick() {
    setselectedModel({ type: "Box", id });
  }

  return (
    <Box
      args={selfSize}
      onClick={handleOnClick}
      position={selfPosition}
      rotation={[
        (selfRotation[0] / 360) * Math.PI * 2,
        (selfRotation[1] / 360) * Math.PI * 2,
        (selfRotation[2] / 360) * Math.PI * 2,
      ]}
    >
      <meshNormalMaterial />
    </Box>
  );
}

export default ModelBox;
