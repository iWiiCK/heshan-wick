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
        <div className="menu">
          <a> Home |</a>
          <a> About Me |</a>
          <a> Expertise |</a>
          <a> Contact </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
