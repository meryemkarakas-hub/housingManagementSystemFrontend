import React from "react";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Activation from "./components/Activation";
import Ayarlar from "./components/Ayarlar";
import Menu from "./components/Menu";
import SelectManagement from "./components/SelectManagement";
import AddManagement from "./components/AddManagement";
import HomePage from "./components/HomePage";
import Carousel from "./components/Carousel";
import AddHousingInformation from "./components/AddHousingInformation";
import ViewEditHousingInformation from "./components/ViewEditHousingInformation";


function App() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    // <div style={containerStyle}>
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/home-page" />} /> 
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/auth/activation/:activationCode"
            element={<Activation />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/ayarlar" element={<Ayarlar />} />
          <Route exact path="/select-management" element={<SelectManagement />} />
          <Route exact path="/add-management" element={<AddManagement />} />
          <Route exact path="/home-page" element={<HomePage />} />
          <Route exact path="/carousel" element={<Carousel />} />
          <Route exact path="/add-housing-information" element={<AddHousingInformation />} />
          <Route exact path="/view-edit-housing-information" element={<ViewEditHousingInformation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
