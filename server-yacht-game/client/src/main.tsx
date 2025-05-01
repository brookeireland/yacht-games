import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import { Dummy } from "./Dummy.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dummy />
    {/* <App /> */}
  </StrictMode>
);
