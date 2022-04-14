import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MyNameAnimated from "./MyNameAnimated";
import "./styles.sass";

const SplashScreen = () => {
  const SPLASH_DURATION = 3; //in Seconds
  const [redirect, setRedirect] = useState(false);
  const timeOut = setTimeout(() => setRedirect(true), SPLASH_DURATION * 1000);

  //Cleaning the time out from useEffect
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  //Navigate to HomeScreen
  if (redirect) {
    return <Navigate to="/home" />;
  }

  //Returning the SplashScreen
  return (
    <div className="splash-screen-component-container">
      <div className="splash-screen-inner-container">
        <MyNameAnimated/>
      </div>
    </div>
  );
};

export default SplashScreen;
