import React, { useState, useEffect, memo, FunctionComponent } from "react";

type Display = "seconds" | "minutes" | "hours" | undefined;

interface Props extends FunctionComponent {
  /**
   * The url to retrieve the favicon from
   */
  expireTime: number;
  /**
   * The url to retrieve the favicon from
   */
  endDisplay: string;
  /**
   * The url to retrieve the favicon from
   */
  display: Display;
}

/**
 * Generates a static Alert box component. Children can be any valid React node
 */
export function Countdown({
  expireTime,
  endDisplay = "0",
  display = "seconds",
}: Props) {
  const now: number = parseInt((new Date().getTime() / 1000).toFixed(0));
  const [seconds, setSeconds] = useState(expireTime - now);

  useEffect(() => {
    const int = setInterval(() => {
      const newNow: number = parseInt((new Date().getTime() / 1000).toFixed(0));
      setSeconds(expireTime - newNow);
    }, 1000);
    return () => {
      clearInterval(int);
    };
  }, [expireTime]);

  if (seconds <= 0) {
    return <>{endDisplay}</>;
  }

  const a = Math.max(0, seconds);
  const n = a > 0 ? a : -a;
  const hour = Math.floor(n / 3600);
  const minute = Math.floor((n - hour * 3600) / 60);
  const second = n - hour * 3600 - minute * 60;

  return (
    <>
      {Math.max(0, seconds) < 0 ? "-" : ""}
      {display === "hours" ? `${hour}:` : ""}
      {display === "hours" || display === "minutes"
        ? `${minute.toString().padStart(2, "0")}:`
        : ""}
      {display === "hours" || display === "minutes"
        ? second.toString().padStart(2, "0")
        : seconds}
    </>
  );
}

export default memo(Countdown);
