import React, { createContext, useRef, useState } from "react";

const Context = createContext();
export default Context;

export function ContextProvider(props) {
  // zzzzzzzzzz  thf  zzzzzzzzzz
  const [hashfetti, setHashfetti] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const setPreviousIsPlaying = useRef();

  const changeHashfetti = (image, callback) => {
    setPreviousIsPlaying.current?.(false);
    setPreviousIsPlaying.current = callback;

    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setHashfetti(null), 4500));
    setHashfetti(image);
  };

  // zzzzzzzzzz  wsh  zzzzzzzzzz
  const wallpaperSize =
    localStorage.getItem("wallpaperSize") ||
    navigator.userAgent.match(/(Android|iPhone)/)
      ? "1080x1920"
      : "1920x1080";

  const value = { hashfetti, changeHashfetti, wallpaperSize };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
