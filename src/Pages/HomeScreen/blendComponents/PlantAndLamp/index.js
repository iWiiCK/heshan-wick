import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Model from "./Model";

const PlantAndLamp = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} scale={scale} position={position} rotation={rotation}>
      <Model />
    </mesh>
  );
};

export default PlantAndLamp;
