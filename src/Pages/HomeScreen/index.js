import React, { useState, useEffect, useRef, Suspense } from "react";
import myVideo from "../../assets/heshan-wick-business-card.mp4";
import Header from "./components/Header";
import ThreeJsAboutMe from "./components/ThreeJsAboutMe";
import ILikeToCreate from "./components/ILikeToCreate";
import MyNameAnimated from "../SplashScreen/MyNameAnimated";
import WhereMagicHappens from "./components/WhereMagicHappens";
import useRandomText from "../../hooks/useRandomText";
import { keyWords } from "../../constants/homePage";
import { ScrollControls, Scroll, useProgress, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "./styles.sass";

const HomeScreen = () => {
  const keyWord = useRandomText(keyWords);
  const canvasRef = useRef();
  const { height } = useWindowDimensions();
  const pageSpacing = -height / 130;

  // const firstsec = document.getElementById('#intro-section');
  // const secondsec = document.getElementById('#about-me-section');

  // var lastScrollTop = 0;
  // window.onscroll = function () {
  //   var st = window.pageYOffset || document.documentElement.scrollTop;
  //   if (st > lastScrollTop) {
  //     secondsec.scrollIntoView({ behavior: "smooth" });
  //   } else {
  //     firstsec.scrollIntoView({ behavior: "smooth" });
  //   }
  //   lastScrollTop = st <= 0 ? 0 : st;
  // }

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
      <Html center style={{ textAlign: "center" }}>
        <MyNameAnimated progress={progress}/>
      </Html>
    );
  }

  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        {/* <div className="header-container">
          <Header />
        </div> */}
        <div className="body-container">
          <Canvas style={{ height: "100vh" }} ref={canvasRef}>
            <Suspense fallback={<Loader />}>
              <ScrollControls
                pages={3}
                distance={1}
                damping={6}
                horizontal={false}
                infinite={false}
              >
                <Scroll>
                  <ThreeJsAboutMe position={[0, 0, 0]} />
                  <ILikeToCreate position={[0, pageSpacing * 1, 0]} />
                  <WhereMagicHappens position={[0, pageSpacing * 2, 0]} />
                </Scroll>

                {/* Intro Section */}
                {/* <Scroll html>
                <section id="#intro-section" className="intro-section">
                  <div className="video-container">
                    <video loop autoPlay muted >
                      <source src={myVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="text">
                    <h1>Creating <br /><span>{keyWord}</span><br /> things as a passion...</h1>
                  </div>
                </section>
              </Scroll> */}
              </ScrollControls>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
