import React from "react";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Activation from "./components/Activation";
import Dashboard from "./components/Dashboard";
import Ayarlar from "./components/Ayarlar";

function App() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div style={containerStyle}>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/ayarlar" element={<Ayarlar/>} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/auth/activation/:activationCode"
            element={<Activation />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
