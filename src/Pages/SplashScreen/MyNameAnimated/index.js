import React from "react";
import Sketch from "react-p5";
import theme from "../../../styles/theme";

const MyNameAnimated = () => {
  let myName = "HESHANWICK";
  let addedIndexes = [];
  let allIndexes = [];
  let fontSize = 20;
  let offsetX = myName.length + 5;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < myName.length; i++) {
      allIndexes.push(i);
    }
    p5.frameRate(10);
  };

  const draw = (p5) => {
    p5.background(theme.background);
    p5.fill(255);
    p5.textAlign(p5.CENTER);
    p5.textSize(fontSize);
    p5.textFont("monospace");
    p5.text(getBinaryName(p5), (p5.windowWidth / 2)-offsetX, p5.windowHeight / 2);
  };

  //helper function for displaying the binary name
  const getBinaryName = (p5) => {
    let binaryName = [];
    let randomChar, randomIndex;

    //return just the name if it's complete
    if (addedIndexes.length == myName.length) {
      return myName;
    }

    //Generating Binary values
    for (let i = 0; i < myName.length; i++) {
      randomChar = p5.random([0, 1]);
      binaryName.push(randomChar);
    }

    randomIndex = p5.random(allIndexes);
    addedIndexes.push(randomIndex);
    allIndexes = allIndexes.filter((currentIndex) => {
      return currentIndex != randomIndex;
    });

    for (let i = 0; i < addedIndexes.length; i++) {
      binaryName[addedIndexes[i]] = myName.charAt(addedIndexes[i]);
    }

    return binaryName.toString().replaceAll(",", "");
  };

  //Helper function for getting an array of indexes
  const getAllArrayIndexes = () => {
    for (let i = 0; i < myName.length; i++) {
      allIndexes.push(i);
    }
  };

  //Event Listeners
  const touchStarted = (p5) => {
    getAllArrayIndexes();
    addedIndexes = [];
  };

  const mouseClicked = (p5) => {
    getAllArrayIndexes();
    addedIndexes = [];
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      touchStarted={touchStarted}
      mouseClicked={mouseClicked}
      windowResized={windowResized}
    />
  );
};

export default MyNameAnimated;
