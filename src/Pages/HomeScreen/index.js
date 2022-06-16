import React, { useRef } from "react";
import Scene from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { isMobile } from "react-device-detect";

import "./styles.sass";

const HomeScreen = () => {
  const canvasRef = useRef();
  const numOfPages = 1

  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        <div className="body-container">
          <Canvas style={{ height: "100vh", minWidth: "600px", maxWidth: "2000px" }} ref={canvasRef}>
            <ScrollControls
              pages={isMobile ? 1 : numOfPages}
              distance={1}
              damping={7}
              horizontal={false}
              infinite={false}
            >
              <Scene canvasRef={canvasRef} />
            </ScrollControls>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
