import React, { useRef } from "react";
import Scene from "./components/Scene";
import { Canvas } from "@react-three/fiber";

import "./styles.sass";

const HomeScreen = () => {
  const canvasRef = useRef();

  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        <div className="body-container">
          <Canvas style={{ height: "100vh" }} ref={canvasRef} >
            <Scene canvasRef={canvasRef} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
