
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import "./Notification.css";

// const Notification = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [appointmentData, setAppointmentData] = useState(null);
//   const [showCancel, setShowCancel] = useState(false);
//   const navigate = useNavigate();

//   // Fetch appointment data from localStorage
//   const fetchAppointmentData = () => {
//     try {
//       const storedData = localStorage.getItem("appointmentData");
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         if (
//           parsedData?.doctorName &&
//           parsedData?.doctorSpeciality &&
//           parsedData?.name &&
//           parsedData?.phoneNumber &&
//           parsedData?.appointmentDate &&
//           parsedData?.timeSlot
//         ) {
//           setAppointmentData(parsedData);
//         } else {
//           setAppointmentData(null);
//         }
//       } else {
//         setAppointmentData(null);
//       }
//     } catch (error) {
//       console.error("Error parsing appointment data:", error);
//       setAppointmentData(null);
//     }
//   };

//   // Check if the user is logged in and fetch appointment data
//   useEffect(() => {
//     setIsLoggedIn(!!sessionStorage.getItem("email"));
//     fetchAppointmentData();

//     // Listen for custom event to trigger re-render
//     const handleAppointmentUpdate = () => {
//       fetchAppointmentData();
//     };
//     window.addEventListener("appointmentUpdated", handleAppointmentUpdate);

//     return () => {
//       window.removeEventListener("appointmentUpdated", handleAppointmentUpdate);
//     };
//   }, []);

//   // Navigate to the booking page
//   const handleGoToBooking = (e) => {
//     e.stopPropagation();
//     if (appointmentData?.doctorSpeciality) {
//       sessionStorage.setItem("lastSpeciality", appointmentData.doctorSpeciality);
//       navigate(`/instant-consultation?speciality=${encodeURIComponent(appointmentData.doctorSpeciality)}`);
//     }
//   };

//   // Clear the appointment data without confirmation
//   const handleClearAppointment = () => {
//     localStorage.removeItem("appointmentData");
//     setAppointmentData(null);
//     setShowCancel(false);

//     // Dispatch custom event to notify other components
//     window.dispatchEvent(new Event("appointmentUpdated"));
//   };

//   return (
//     <div>
//       <Navbar />
//       {children}

//       {isLoggedIn && appointmentData && (
//         <div
//           className="appointment-card"
//           onClick={() => setShowCancel((prev) => !prev)}
//           role="button"
//           tabIndex={0}
//           aria-label="Appointment details"
//         >
//           <div className="appointment-card__content">
//             <h3 className="appointment-card__title">Appointment Details</h3>
//             <p><strong>Doctor:</strong> {appointmentData?.doctorName}</p>
//             <p><strong>Speciality:</strong> {appointmentData?.doctorSpeciality}</p>
//             <p><strong>Name:</strong> {appointmentData?.name}</p>
//             <p><strong>Phone Number:</strong> {appointmentData?.phoneNumber}</p>
//             <p><strong>Date:</strong> {appointmentData?.appointmentDate}</p>
//             <p><strong>Time Slot:</strong> {appointmentData?.timeSlot}</p>

//             {showCancel && (
//               <div className="appointment-card__actions">
//                 <button
//                   onClick={handleGoToBooking}
//                   className="cancel-btn"
//                   aria-label="Go to booking page"
//                 >
//                   Go to Booking Page
//                 </button>
//                 <button
//                   onClick={handleClearAppointment}
//                   className="clear-btn"
//                   aria-label="Clear appointment"
//                 >
//                   Clear Appointment
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {isLoggedIn && !appointmentData && (
//         <p className="no-appointment">No appointment found.</p>
//       )}
//     </div>
//   );
// };

// export default Notification;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const navigate = useNavigate();

  // Fetch appointment data from localStorage
  const fetchAppointmentData = () => {
    try {
      const storedData = localStorage.getItem("appointmentData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (
          parsedData?.doctorName &&
          parsedData?.doctorSpeciality &&
          parsedData?.name &&
          parsedData?.phoneNumber &&
          parsedData?.appointmentDate &&
          parsedData?.timeSlot
        ) {
          setAppointmentData(parsedData);
        } else {
          setAppointmentData(null);
        }
      } else {
        setAppointmentData(null);
      }
    } catch (error) {
      console.error("Error parsing appointment data:", error);
      setAppointmentData(null);
    }
  };

  // Check if the user is logged in and fetch appointment data
  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("email"));
    fetchAppointmentData();

    // Listen for custom event to trigger re-render
    const handleAppointmentUpdate = () => {
      fetchAppointmentData();
    };
    window.addEventListener("appointmentUpdated", handleAppointmentUpdate);

    return () => {
      window.removeEventListener("appointmentUpdated", handleAppointmentUpdate);
    };
  }, []);

  // Navigate to the booking page
  const handleGoToBooking = (e) => {
    e.stopPropagation();
    if (appointmentData?.doctorSpeciality) {
      sessionStorage.setItem("lastSpeciality", appointmentData.doctorSpeciality);
      navigate(`/instant-consultation?speciality=${encodeURIComponent(appointmentData.doctorSpeciality)}`);
    }
  };

  // Clear the appointment data without confirmation
  const handleClearAppointment = () => {
    localStorage.removeItem("appointmentData");
    setAppointmentData(null);
    setShowCancel(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointmentData && (
        <div
          className="appointment-card"
          onClick={() => setShowCancel((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label="Appointment details"
        >
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p><strong>Doctor:</strong> {appointmentData?.doctorName}</p>
            <p><strong>Speciality:</strong> {appointmentData?.doctorSpeciality}</p>
            <p><strong>Name:</strong> {appointmentData?.name}</p>
            <p><strong>Phone Number:</strong> {appointmentData?.phoneNumber}</p>
            <p><strong>Date:</strong> {appointmentData?.appointmentDate}</p>
            <p><strong>Time Slot:</strong> {appointmentData?.timeSlot}</p>

            {showCancel && (
              <div className="appointment-card__actions">
                <button
                  onClick={handleGoToBooking}
                  className="cancel-btn"
                  aria-label="Go to booking page"
                >
                  Go to Booking Page
                </button>
                <button
                  onClick={handleClearAppointment}
                  className="clear-btn"
                  aria-label="Clear appointment"
                >
                  Clear Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isLoggedIn && !appointmentData && (
        <p className="no-appointment">No appointment found.</p>
      )}
    </div>
  );
};

export default Notification;