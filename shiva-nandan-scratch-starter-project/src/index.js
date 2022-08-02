import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
import Turn15ClockProvider from "./context/Turn15ClockProvider";
import Move10StpesProvider from "./context/Move10Steps";
import GoToPosProvider from "./context/GoToPosProvider";
import XandYValuesProvider from "./context/XandYValuesProvider";

console.log("hi");

ReactDOM.render(
  <React.StrictMode>
    <Turn15ClockProvider>
      <Move10StpesProvider>
        <GoToPosProvider>
          <XandYValuesProvider>
            <App />
          </XandYValuesProvider>
        </GoToPosProvider>
      </Move10StpesProvider>
    </Turn15ClockProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
