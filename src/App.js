import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign up/Sign_Up';  // Fixed folder name
import Login from './Components/Login/Login';
import InstantConsultation  from './Components/InstantConsultationBooking/InstantConsultation'
import BookingConsultation from './Components/BookingConsultation'
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm'
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/booking-consultation" element={< BookingConsultation />} /> 
          <Route path="/review" element={< ReviewForm />} /> 
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/reports" element={<ReportsLayout />} />
        </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
