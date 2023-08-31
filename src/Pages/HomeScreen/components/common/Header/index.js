import React from "react";
import "./styles.sass";

const Header = () => {
  return (
    <div className="header-component-container">
      <div className="inner-component-container">
        <div className="heshan-wick">
          <label>
            HESHAN <span>WICK</span>
          </label>
        </div>
        <div className="menu-extended">
          <a href="#">Home</a>
          <a href="#">About Me</a>
          <a href="#">Expertise</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
