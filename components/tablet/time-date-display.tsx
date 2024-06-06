"use client";

import React, { useEffect, useState } from "react";

const TimeDateDisplay: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="text-lg flex flex-col text-end">
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TimeDateDisplay;
