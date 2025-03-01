// import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import './DoctorCardIC.css';
// import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
// import { v4 as uuidv4 } from 'uuid';

// const DoctorCardIC = ({ name, speciality, experience, ratings }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [appointments, setAppointments] = useState([]);

//   // Unique key for localStorage
//   const storageKey = `appointmentData_${name}`;

//   useEffect(() => {
//     const storedData = localStorage.getItem(storageKey);
//     if (storedData) {
//       setAppointments([JSON.parse(storedData)]);
//     }
//   }, [storageKey]);

//   const handleBooking = () => {
//     setShowModal(true);
//   };

//   const handleCancel = () => {
//     setAppointments([]);
//     localStorage.removeItem(storageKey);

//     const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//     const updatedGlobalAppointments = globalAppointments.filter(appointment => appointment.doctorName !== name);
//     localStorage.setItem("appointments", JSON.stringify(updatedGlobalAppointments));

//     window.dispatchEvent(new Event("appointmentUpdated"));
//   };

//   const handleFormSubmit = (appointmentData) => {
//     const newAppointment = {
//       id: uuidv4(),
//       doctorName: name,
//       doctorSpeciality: speciality,
//       ...appointmentData,
//       feedback: "",
//       rating: null,
//     };

//     localStorage.setItem(storageKey, JSON.stringify(newAppointment));

//     const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//     const updatedAppointments = [...globalAppointments, newAppointment];
//     localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

//     setAppointments([newAppointment]);
//     setShowModal(false);
//     window.dispatchEvent(new Event("appointmentUpdated"));
//   };

//   return (
//     <div className="doctor-card-container">
//       <div className="doctor-card-details-container">
//         <div className="doctor-card-profile-image-container">
//           <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
//           </svg>
//         </div>
//         <div className="doctor-card-details">
//           <div className="doctor-card-detail-name">{name}</div>
//           <div className="doctor-card-detail-speciality">{speciality}</div>
//           <div className="doctor-card-detail-experience">{experience} years experience</div>
//           <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
//         </div>
//       </div>

//       <div className="doctor-card-options-container">
//         <Popup
//           key={appointments.length}
//           trigger={
//             <button
//               className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
//               onClick={appointments.length > 0 ? handleCancel : handleBooking}
//             >
//               {appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
//               <div>No Booking Fee</div>
//             </button>
//           }
//           modal
//           open={showModal}
//           onClose={() => setShowModal(false)}
//         >
//           {(close) => (
//             <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
//               <div>
//                 <div className="doctor-card-profile-image-container">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
//                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
//                   </svg>
//                 </div>
//                 <div className="doctor-card-details">
//                   <div className="doctor-card-detail-name">{name}</div>
//                   <div className="doctor-card-detail-speciality">{speciality}</div>
//                   <div className="doctor-card-detail-experience">{experience} years experience</div>
//                   <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
//                 </div>
//               </div>

//               {appointments.length > 0 ? (
//                 <>
//                   <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
//                   {appointments.map((appointment) => (
//                     <div className="bookedInfo" key={appointment.id}>
//                       <p><strong>Name:</strong> {appointment.name}</p>
//                       <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
//                       <p><strong>Date of Appointment:</strong> {appointment.appointmentDate}</p>
//                       <p><strong>Time Allotted:</strong> {appointment.timeSlot}</p>
//                       <button onClick={handleCancel}>Cancel Appointment</button>
//                     </div>
//                   ))}
//                 </>
//               ) : (
//                 <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
//               )}
//             </div>
//           )}
//         </Popup>
//       </div>
//     </div>
//   );
// };

// export default DoctorCardIC;





import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Unique key for localStorage
  const storageKey = `appointmentData_${name}`;

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      setAppointments([JSON.parse(storedData)]);
    }
  }, [storageKey]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    // Clear appointments for this doctor
    setAppointments([]);
    localStorage.removeItem(storageKey);

    // Update global appointments
    const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedGlobalAppointments = globalAppointments.filter(
      (appointment) => appointment.doctorName !== name
    );
    localStorage.setItem("appointments", JSON.stringify(updatedGlobalAppointments));

    // Trigger notification update
    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      doctorSpeciality: speciality,
      ...appointmentData,
      feedback: "",
      rating: null,
    };

    // Save appointment for this doctor
    localStorage.setItem(storageKey, JSON.stringify(newAppointment));

    // Update global appointments
    const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = [...globalAppointments, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    // Update state and close modal
    setAppointments([newAppointment]);
    setShowModal(false);

    // Trigger notification update
    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          key={appointments.length}
          trigger={
            <button
              className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
              onClick={appointments.length > 0 ? handleCancel : handleBooking}
              aria-label={appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
            >
              {appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p><strong>Name:</strong> {appointment.name}</p>
                      <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
                      <p><strong>Date of Appointment:</strong> {appointment.appointmentDate}</p>
                      <p><strong>Time Allotted:</strong> {appointment.timeSlot}</p>
                      <button onClick={handleCancel}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;