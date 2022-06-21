import React, { useRef, useState, useEffect } from "react";
import Scene from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import AboutMe from "./components/AboutMe";
import { UpCircleOutlined } from "@ant-design/icons";

import "./styles.sass";

const HomeScreen = () => {
  const canvasRef = useRef();
  const [aboutMeVisible, setAboutMeVisible] = useState(false)

  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        <div className="body-container">
          <Canvas ref={canvasRef} onClick={() => {
            return aboutMeVisible ? setAboutMeVisible(false) : null
          }}>
            <Scene
              canvasRef={canvasRef}
              aboutMeVisible={aboutMeVisible}
              setAboutMeVisible={setAboutMeVisible} />
          </Canvas>
          {aboutMeVisible ? <AboutMe setAboutMeVisible={setAboutMeVisible} /> : null}
          <div
            className="about-me-button"
            onClick={() => (setAboutMeVisible(true))}
            style={{ display: aboutMeVisible ? "none" : "block" }}
          >
            About me <UpCircleOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
