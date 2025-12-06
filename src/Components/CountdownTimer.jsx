import React from "react";
import { useState, useEffect, useRef } from "react";
import "./CountdownTimer.css";
const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [initialTime, setInitialTime] = useState(0);
  const timerRef = useRef(null);

  // UseEffect to handle countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      //       setShowInput(false); // Hides input field when timer starts
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  //Starting the timer
  const handleStart = () => {
    setTimeLeft(minutes * 60 + seconds); //minutes converted to seconds
    setIsRunning(true); //starting the countdown
  };

  //Resetting the timer
  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
    setShowInput(true); //show input fields again
  };

  //useEffect to handle keyboard shortcuts
  useEffect(() => {
    // If user is typing into input, ignore shortcuts
    const handleKey = (e) => {
      const key = e.key.toLowerCase();

      if (document.activeElement.tagName === "INPUT") return;

      // Start(s)
      if (key === "s") {
        setIsRunning(true);
      }

      // Pause(p)
      if (key === "p") {
        setIsRunning(false);
      }

      // Reset(r)
      if (key === "r") {
        handleReset();
      }

      // Enter(start)
      if (key === "enter") {
        handleStart();
      }

      // Space toggles Start/Pause
      if (key === " ") {
        setIsRunning((prev) => !prev);
      }

      // Arrow up add 1 minute
      if (key === "arrowup") {
        setMinutes((m) => Number(m) + 1);
        setInitialTime((t) => t + 60);
        setTimeLeft((t) => t + 60);
      }

      // Arrow down subtr 1 minute
      if (key === "arrowdown") {
        setMinutes((m) => Math.max(0, Number(m) - 1));
        setInitialTime((t) => Math.max(0, t - 60));
        setTimeLeft((t) => Math.max(0, t - 60));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  //   useEffect(() => {
  //     if (isRunning) {
  //       const element = document.documentElement;
  //       element.requestFullscreen?.();
  //     }
  //   }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60; //remaining seconds

    //Return formatted string with leading zeros
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  //   const useFullScreen = () => {
  //     const element = document.documentElement;
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.webkitRequestFullscreen) {
  //       element.webkitRequestFullscreen();
  //     } else if (element.msRequestFullscreen) {
  //       element.msRequestFullscreen();
  //     }
  //   };

  //   useFullScreen();

  return (
    <div className="container">
      {/* Displaying countdown or TIME UP!*/}

      {timeLeft > 0 ? (
        //if time left, show countdown
        <h1 className="timeLeft">{formatTime(timeLeft)}</h1>
      ) : isRunning ? (
        // if time is zero but timer was running, show TIME UP in red
        <h1 className="pulse-effect">TIME UP!</h1>
      ) : showInput ? (
        // show input fields before time starts
        <div>
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />

          {/* second input */}
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />

          {/* Start button */}
          <button onClick={handleStart}>Start</button>
        </div>
      ) : null}

      {/* Reset button to show only after timer starts */}
      {!showInput && <button onClick={handleReset}>Reset</button>}
    </div>
  );
};

export default CountdownTimer;
