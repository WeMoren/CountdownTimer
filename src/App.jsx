import React from "react";
import { useState, useEffect } from "react";
import CountdownTimer from "./Components/CountdownTimer";
import Clock from "./Components/Clock";
import "./App.css";

const colors = [
  "#0965b5",
  "#038086",
  "#077d2e",
  "#047762",
  "#8e0830",
  "#7c6a08",
  "#705704",
  "#7d2007",
  "#65035a",
  "#b50589",
];

const App = () => {
  const [bgColor, setBgColor] = useState(colors[0]);

  // Effect to change background color every seconds
  useEffect(() => {
    const colorTimer = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor); //update state
    }, 5000);

    return () => clearInterval(colorTimer);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: `linear-gradient(135deg, ${bgColor}, #000000)`,
        color: "white",
        fontFamily: "sans-serif",
        transitionDuration: "5s",
        transition: "background 1.5s ease-in-out",
      }}
    >
      <h2 style={{ marginBottom: "50px", fontSize: "4vw" }}></h2>
      <CountdownTimer />
      <Clock />
    </div>
  );
};

export default App;
