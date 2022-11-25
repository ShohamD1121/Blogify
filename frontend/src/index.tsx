import React from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
import { AuthContextProvider } from "./context/authContext";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
