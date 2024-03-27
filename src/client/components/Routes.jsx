import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Renderer from "./THFRenderer";
import Context from "./Context";

export default function () {
  const { hashfetti } = useContext(Context);

  return (
    <>
      <Renderer imageUrl={hashfetti} />
      <BrowserRouter>
        <Routes>
          <Route path="/:service?/:year?/:month?/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
