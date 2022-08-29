import { Box } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

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
  id: number;
  position: [number, number, number];
}

function ModelBox(props: Props) {
  const { size, setsize, selectedModel, setselectedModel, id, position } =
    props;
  const [selfSize, setselfSize] = useState<[number, number, number]>([1, 1, 1]);

  const type: string = "Box";

  useEffect(() => {
    if (selectedModel.type === type && selectedModel.id === id) {
      setselfSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (selectedModel.type === type && selectedModel.id === id) {
      setsize(selfSize);
    }
  }, [selectedModel]);

  function handleOnClick() {
    setselectedModel({ type, id });
  }

  return (
    <Box args={selfSize} onClick={handleOnClick} position={position}>
      <meshNormalMaterial />
    </Box>
  );
}

export default ModelBox;
