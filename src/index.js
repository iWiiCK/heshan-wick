import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import HomeScreen from "./Pages/HomeScreen";
import SplashScreen from "./Pages/SplashScreen";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter hashType="noslash">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
