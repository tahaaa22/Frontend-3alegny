import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing pages
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import PatientPortal from "./pages/PatientPortal";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";

// importing components
import Navigation from "./components/Navigation";
import EditProfile from "./components/EditProfile";
import Footer from "./components/Footer";

import "./App.css";
import Appointment from "./pages/Appointment";

// import HospitalCard from "./components/HospitalCard";
import HospitalPortal from "./pages/HospitalPortal";
import PHRPage from "./components/PHRPage";
import EHRPage from "./components/EHRPage";
import Order from "./pages/Order";

function App() {
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

export default App;
