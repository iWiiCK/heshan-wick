import React, { useRef, useState, useEffect } from "react";
import { Sparkles, OrbitControls } from "@react-three/drei";

const ColorUniverseWrapper = ({
  children,
  position = [0, 0, 0],
  color1 = "cyan",
  color2 = "blue",
}) => {
  const mesh = useRef();
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      setRotate(true);
      timeout = setTimeout(() => {
        setRotate(false);
      }, 600);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <mesh ref={mesh} position={position}>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        autoRotate={rotate}
        autoRotateSpeed={15}
      />
      <ambientLight />
      <pointLight position={[0, 800, 50]} intensity={100} color={"white"} />
      <Sparkles scale={10} size={3} position={[0, -2, 0]} noise={3} />
      <Sparkles
        scale={30}
        size={400}
        position={[0, -2, -3]}
        color={color1}
        count={2}
      />
      <Sparkles
        scale={30}
        size={400}
        position={[0, 2, -3]}
        color={color2}
        count={2}
      />
      {children}
    </mesh>
  );
};

export default ColorUniverseWrapper;
