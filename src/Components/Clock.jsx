import React, { useState, useEffect } from "react";
import "./Clock.css";
const Clock = () => {
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const dateFormat = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const dateTimeOutput = now.toLocaleString("en-US", dateFormat);
      const formattedOutput = dateTimeOutput.replace("", " ");
      setLiveTime(formattedOutput);
    };
    //Run instantly
    updateClock();

    const clockInterval = setInterval(updateClock, 1000);
    //clean up
    return () => clearInterval(clockInterval);
  });
  return (
    <div>
      <p className="clock">{liveTime}</p>
    </div>
  );
};

export default Clock;
