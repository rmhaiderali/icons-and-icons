import React, { createContext, useRef, useState } from "react";

const Context = createContext();
export default Context;

export function ContextProvider(props) {
  const [hashfetti, setHashfetti] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const setPreviousIsPlaying = useRef();

  const changeHashfetti = (image, callback) => {
    setPreviousIsPlaying.current?.(false);
    setPreviousIsPlaying.current = callback;

    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => setHashfetti(null), 4500));
    setHashfetti(image);
  };

  const value = { hashfetti, changeHashfetti };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
