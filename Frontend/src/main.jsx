import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./style.scss";

import { InterviewProvider } from "./features/interview/interview.context.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InterviewProvider>
      <App />
    </InterviewProvider>
  </React.StrictMode>,
);
