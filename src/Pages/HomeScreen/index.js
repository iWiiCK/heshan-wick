import React from "react";
import myVideo from "../../assets/heshan-wick-business-card.mp4";
import Header from "./components/Header";
import "./styles.sass"

const HomeScreen = () => {
  return (
    <div className="home-screen-component-container">
      <div className="inner-component-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <section className="intro-section">
            <video loop autoPlay muted >
              <source src={myVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className = "text">
              <h1>Creating Magnificent things as a passion :)</h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
