import ReactDOM from "react-dom/client";
import Routes from "./components/Routes";
import { ContextProvider } from "./components/Context";
import "./css/app.css";
// import "./css/popup.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ContextProvider>
    <Routes />
  </ContextProvider>
  // </React.StrictMode>
);
