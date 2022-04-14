import React from 'react';
import myVideo from "../../assets/heshan-wick-business-card.mp4";

const HomeScreen = () => {
  return (
    <div>
      <label>Heshan Wickramaratne</label>
      <div >
        <video loop autoPlay muted style={{width: '100vw'}}>
          <source
            src={myVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HomeScreen;
