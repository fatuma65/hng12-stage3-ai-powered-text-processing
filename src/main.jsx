import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import  InterfaceProvider from "./context/ChatContext.jsx";

const originMeta = document.createElement("meta");
originMeta.httpEquiv = "origin-trial";
originMeta.content = import.meta.env.VITE_TRANSLATOR_TOKEN;
document.head.append(originMeta);

const summaryOriginMeta = document.createElement("meta");
summaryOriginMeta.httpEquiv = "origin-trial";
summaryOriginMeta.content = import.meta.env.VITE_SUMMARIZATION_TOKEN;
document.head.append(summaryOriginMeta);

const detectorOriginMeta = document.createElement("meta");
detectorOriginMeta.httpEquiv = "origin-trial";
detectorOriginMeta.content = import.meta.env.VITE_LANGUAGE_TOKEN;
document.head.append(detectorOriginMeta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InterfaceProvider>
      <App />
    </InterfaceProvider>
  </StrictMode>
);
