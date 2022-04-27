import React, { useState, useEffect } from "react";
import myVideo from "../../assets/heshan-wick-business-card.mp4";
import Header from "./components/Header";
import ThreeJsAboutMe from "./components/ThreeJsAboutMe";
import useRandomText from "../../hooks/useRandomText";
import { keyWords } from "../../constants/homePage";


import "./styles.sass"

const HomeScreen = () => {
  const keyWord = useRandomText(keyWords);

  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">

          {/* Intro Section */}
          <section className="intro-section">
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

          {/* Three JS ABout Me Section */}
          <section className="about-me-section">
            <div className="inner-container">
              <ThreeJsAboutMe />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
