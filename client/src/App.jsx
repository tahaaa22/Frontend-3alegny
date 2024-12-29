import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Importing pages
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import PatientPortal from "./pages/PatientPortal";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import HospitalPortal from "./pages/HospitalPortal";
import PharmacyPortal from "./pages/PharmacyPortal";
import PHRPage from "./components/PHRPage";
import EHRPage from "./components/EHRPage";
import AdminPortal from "./components/AdminPortal";
import EditPHR from "./components/EditPHR";
import EditProfile from "./components/EditProfile";
// Importing components
import Navigation from "./components/Navigation";
import Navigation2 from "./components/Navigation2";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const location = useLocation();

  // Determine visibility of navigation and footer based on the route
  const showNavAndFooter =
    ["/", "/about", "/login", "/signup"].includes(location.pathname);
  const showNav2AndFooter =
    [
      "/patient",
      "/appointment",
      "/MyProfile",
      "/edit-profile",
      "/phr",
    ].includes(location.pathname);
  const hideAll = [
    "/adminportal",
    "/hospitalportal",
    "/ehrpatient",
    "/pharmacyportal",
  ].includes(location.pathname);

  return (
    <div className="app">
      {showNavAndFooter && <Navigation />}
      {showNav2AndFooter && <Navigation2 />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/patient" element={<PatientPortal />} />
          <Route path="/MyProfile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-phr" element={<EditPHR />} />
          <Route path="/hospitalportal" element={<HospitalPortal />} />
          <Route path="/pharmacyportal" element={<PharmacyPortal />} />
          <Route path="/phr" element={<PHRPage />} />
          <Route path="/ehrpatient" element={<EHRPage />} />
          <Route path="/adminportal" element={<AdminPortal />} />
        </Routes>
      </main>
      {showNavAndFooter && <Footer />}
      {showNav2AndFooter && <Footer />}
    </div>
  );
}

function Root() {
  return (
    <NextUIProvider>
      <Router>
        <App />
      </Router>
    </NextUIProvider>
  );
}

export default Root;
