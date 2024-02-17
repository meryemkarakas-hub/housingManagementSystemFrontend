import React from "react";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Activation from "./Activation";

function App() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div style={containerStyle}>
    <Activation/>
    </div>
  );
}

export default App;
