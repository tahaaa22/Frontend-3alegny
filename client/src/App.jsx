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
import Order from "./pages/Order";

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
    <NextUIProvider>
      <Router>
        <div className="app">
          <div>
          <Navigation />
          </div>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/orders" element={<Order/>}/>

              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />

              <Route path="/patient" element={<PatientPortal />} />
              <Route path="/MyProfile" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfile  />} />
              <Route path="/hospitalportal" element={<HospitalPortal/>}/>
              <Route path="/pharmacyportal" element={<PharmacyPortal/>}/>
              <Route path="/phr" element={<PHRPage/>}/>
              <Route path="/ehrpatient" element={<EHRPage/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default Root;
