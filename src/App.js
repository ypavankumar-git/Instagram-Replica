import React from "react";
import "./App.css";
import Paths from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Paths />
      <ToastContainer />
    </div>
  );
}

export default App;
