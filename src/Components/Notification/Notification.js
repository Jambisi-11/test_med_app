// import React, { useEffect, useState } from 'react';
// import Navbar from '../Navbar/Navbar';
// import './Notification.css'

// // Function component Notification to display user notifications
// const Notification = ({ children }) => {
//   // State variables to manage user authentication, username, doctor data, and appointment data
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [doctorData, setDoctorData] = useState(null);
//   const [appointmentData, setAppointmentData] = useState(null);

//   // useEffect hook to perform side effects in the component
//   useEffect(() => {
//     // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
//     const storedUsername = sessionStorage.getItem('email');
//     const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
//     const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

//     // Set isLoggedIn state to true and update username if storedUsername exists
//     if (storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }

//     // Set doctorData state if storedDoctorData exists
//     if (storedDoctorData) {
//       setDoctorData(storedDoctorData);
//     }

//     // Set the latest appointment from the stored appointments
//     if (storedAppointments.length > 0) {
//       setAppointmentData(storedAppointments[storedAppointments.length - 1]);
//     }
//   }, []); // Runs only once after initial render

//   // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
//   return (
//     <div className='notification-container'>
//       {/* Render Navbar component */}
//       <Navbar />
//       {/* Render children components */}
//       {children}
      
//       {/* Display appointment details if user is logged in and appointmentData is available */}
//       {isLoggedIn && appointmentData && (
//         <div className="appointment-card">
//           <div className="appointment-card__content">
//             {/* Display title for appointment details */}
//             <h3 className="appointment-card__title">Appointment Details</h3>
            
//             <p className="appointment-card__message">
//               <strong>Doctor:</strong> {appointmentData.doctorName || "N/A"}
//             </p>
//             <p className="appointment-card__message">
//               <strong>Speciality:</strong> {appointmentData.doctorSpeciality || "N/A"}
//             </p>
//             <p className="appointment-card__message">
//               <strong>Name:</strong> {appointmentData.name || "N/A"}
//             </p>
//             <p className="appointment-card__message">
//               <strong>Phone Number:</strong> {appointmentData.phoneNumber || "N/A"}
//             </p>
//             <p className="appointment-card__message">
//               <strong>Date of Appointment:</strong> {appointmentData.appointmentDate || "N/A"}
//             </p>
//             <p className="appointment-card__message">
//               <strong>Time Slot:</strong> {appointmentData.timeSlot || "N/A"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Export Notification component for use in other parts of the application
// export default Notification;


import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [showCancel, setShowCancel] = useState(false); // Initially hidden

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    const fetchAppointmentData = () => {
      const storedAppointmentData = JSON.parse(localStorage.getItem("appointmentData"));
      setAppointmentData(storedAppointmentData);
    };

    fetchAppointmentData(); // Load appointment initially

    const handleStorageChange = () => fetchAppointmentData();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      {isLoggedIn && appointmentData && (
        <div 
          className="appointment-card" 
          onClick={() => setShowCancel(!showCancel)} // Toggle cancel button visibility
          style={{ cursor: "pointer" }}
        >
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message"><strong>Doctor:</strong> {appointmentData.doctorName}</p>
            <p className="appointment-card__message"><strong>Speciality:</strong> {appointmentData.doctorSpeciality}</p>
            <p className="appointment-card__message"><strong>Name:</strong> {appointmentData.name}</p>
            <p className="appointment-card__message"><strong>Phone Number:</strong> {appointmentData.phoneNumber}</p>
            <p className="appointment-card__message"><strong>Date:</strong> {appointmentData.appointmentDate}</p>
            <p className="appointment-card__message"><strong>Time Slot:</strong> {appointmentData.timeSlot}</p>

            {/* Show cancel button only when showCancel is true */}
            {showCancel && (
              <button 
                onClick={() => window.location.href = "/appointments"} 
                className="cancel-btn"
              >
                Go to Appointments Page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
