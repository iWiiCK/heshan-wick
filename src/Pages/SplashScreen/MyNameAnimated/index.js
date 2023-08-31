import React from "react";
import Sketch from "react-p5";
import theme from "../../../styles/theme";

const MyNameAnimated = ({ progress = 0 }) => {
  let bracketArray = ["<", "/", ">"];
  let formattedBrackets;
  let myName = "<heshanWick/>";
  let addedIndexes = [];
  let allIndexes = [];
  let fontSize = 25;
  let textX, textY;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < myName.length; i++) {
      allIndexes.push(i);
    }

    formattedBrackets = formatBrackets();
  };

  const draw = (p5) => {
    textX = p5.windowWidth / 2;
    textY = p5.windowHeight / 2;

    p5.background(theme.background);
    p5.fill(255);
    p5.textAlign(p5.CENTER);
    p5.textSize(fontSize);
    p5.textFont("monospace");
    p5.frameRate(10);

    p5.push();
    p5.text(getBinaryName(p5), textX, textY);
    p5.pop();

    p5.push();
    p5.fill(theme.backgroundGreen);
    p5.text(disStyledBrackets(), textX, textY);
    p5.pop();

    if (progress) {
      p5.push();
      p5.fill(255);
      p5.textSize(15);
      p5.text(`Loading ${progress}% `, textX, textY + 50);
      p5.pop();
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const disStyledBrackets = () => {
    return addedIndexes.length === myName.length ? formattedBrackets : "";
  };

  const formatBrackets = () => {
    let hiddenChar = " ";
    for (let i = 0; i < myName.length - 3; i++) {
      bracketArray.splice(1, 0, hiddenChar);
    }
    return bracketArray.toString().replaceAll(",", "");
  };

  //helper function for displaying the binary name
  const getBinaryName = (p5) => {
    let binaryName = [];
    let randomChar, randomIndex;

    //return just the name if it's complete
    if (addedIndexes.length === myName.length) {
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
      return currentIndex !== randomIndex;
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

    addedIndexes = [];
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      touchStarted={getAllArrayIndexes}
      mouseClicked={getAllArrayIndexes}
      windowResized={windowResized}
    />
  );
};

export default MyNameAnimated;
