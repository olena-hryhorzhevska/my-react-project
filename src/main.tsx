// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import 'modern-normalize';
import './global.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


