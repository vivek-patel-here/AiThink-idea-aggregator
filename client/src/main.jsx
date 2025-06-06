import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./GlobalContext.jsx";
createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </GlobalContextProvider>
);
