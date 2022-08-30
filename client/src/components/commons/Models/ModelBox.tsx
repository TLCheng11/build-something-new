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
    id,
  } = props;
  const [selfSize, setselfSize] = useState<[number, number, number]>([1, 1, 1]);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  const type: string = "Box";

  useEffect(() => {
    if (selectedModel.type === type && selectedModel.id === id) {
      setselfSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (selectedModel.type === type && selectedModel.id === id) {
      setSelfPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (selectedModel.type === type && selectedModel.id === id) {
      setsize(selfSize);
      setposition(selfPosition);
    }
  }, [selectedModel]);

  function handleOnClick() {
    setselectedModel({ type, id });
  }

  return (
    <Box args={selfSize} onClick={handleOnClick} position={selfPosition}>
      <meshNormalMaterial />
    </Box>
  );
}

export default ModelBox;
