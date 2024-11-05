import React, { useEffect, useState } from "react";


const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12; // Convert to 12-hour format
  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6; // Extra for seconds
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30; // Extra for minutes

  return (
    <div className="clock">
      <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
      <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }} />
      <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }} />
      <div className="center-circle" />
      {/* Clock Numbers */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="clock-number"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-120px)`, // Adjust translateY for spacing
          }}
        >
          {i === 0 ? 12 : i} {/* Display 12 for top, otherwise the number */}
        </div>
      ))}
    </div>
  );
};

export default Clock;
