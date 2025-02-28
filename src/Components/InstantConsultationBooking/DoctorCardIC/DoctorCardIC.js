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
    setAppointments([]);
    localStorage.removeItem(storageKey);

    const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedGlobalAppointments = globalAppointments.filter(appointment => appointment.doctorName !== name);
    localStorage.setItem("appointments", JSON.stringify(updatedGlobalAppointments));

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

    localStorage.setItem(storageKey, JSON.stringify(newAppointment));

    const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = [...globalAppointments, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    setAppointments([newAppointment]);
    setShowModal(false);
    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
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

//   // Load appointments from localStorage on mount
//   useEffect(() => {
//     const storedData = localStorage.getItem(storageKey);
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setAppointments([parsedData]);
//     }
//   }, [storageKey]);

//   const handleBooking = () => {
//     setShowModal(true);
//   };

//   // Cancel Appointment
//   const handleCancel = () => {
//     console.log("Canceling appointment for:", name); // Debugging

//     // Clear the appointments state
//     setAppointments([]);

//     // Remove from localStorage
//     localStorage.removeItem(storageKey);
//     console.log("Appointment data removed from localStorage for key:", storageKey); // Debugging

//     // Dispatch custom event to notify `Notification.js`
//     window.dispatchEvent(new Event("appointmentUpdated"));
//     console.log("appointmentUpdated event dispatched"); // Debugging
//   };

//   // Save Appointment
//   const handleFormSubmit = (appointmentData) => {
//     const newAppointment = {
//       id: uuidv4(),
//       ...appointmentData,
//     };
//     const updatedAppointments = [...appointments, newAppointment];
//     setAppointments(updatedAppointments);
//     setShowModal(false);

//     // Save to localStorage
//     localStorage.setItem(storageKey, JSON.stringify(newAppointment));
//     console.log("Appointment data saved to localStorage for key:", storageKey); // Debugging

//     // Dispatch custom event to notify `Notification.js`
//     window.dispatchEvent(new Event("appointmentUpdated"));
//     console.log("appointmentUpdated event dispatched"); // Debugging
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
//           key={appointments.length} // Force re-render when appointments change
//           trigger={
//             <button
//               className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
//               onClick={appointments.length > 0 ? handleCancel : handleBooking} // Handle cancel directly on the button
//             >
//               {appointments.length > 0 ? (
//                 <div>Cancel Appointment</div>
//               ) : (
//                 <div>Book Appointment</div>
//               )}
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





// import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import './DoctorCardIC.css';
// import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
// import { v4 as uuidv4 } from 'uuid';

// const DoctorCardIC = ({ id, name, speciality, experience, ratings }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [appointments, setAppointments] = useState([]);

//   // Unique key for localStorage
//   const storageKey = `appointmentData_${id}`;

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
//     const updatedGlobalAppointments = globalAppointments.filter(
//       (appointment) => appointment.doctorName !== name
//     );
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

//     try {
//       localStorage.setItem(storageKey, JSON.stringify(newAppointment));

//       const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//       const updatedAppointments = [...globalAppointments, newAppointment];
//       localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

//       setAppointments([newAppointment]);
//       setShowModal(false);
//       window.dispatchEvent(new Event("appointmentUpdated"));
//     } catch (error) {
//       console.error("Failed to save appointment:", error);
//     }
//   };

//   return (
//     <div className="doctor-card-container">
//       <div className="doctor-card-details-container">
//         <div className="doctor-card-profile-image-container">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="46"
//             height="46"
//             fill="currentColor"
//             className="bi bi-person-fill"
//             viewBox="0 0 16 16"
//           >
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
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
//               aria-label={appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
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
//             <div className="doctorbg">
//               <div>
//                 <div className="doctor-card-profile-image-container">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="46"
//                     height="46"
//                     fill="currentColor"
//                     className="bi bi-person-fill"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
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




// import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import './DoctorCardIC.css';
// import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
// import { v4 as uuidv4 } from 'uuid';

// const DoctorCardIC = ({ id, name, speciality, experience, ratings }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [appointment, setAppointment] = useState(null); // Store a single appointment for this doctor

//   // Unique key for localStorage
//   const storageKey = `appointmentData_${id}`;

//   useEffect(() => {
//     const storedData = localStorage.getItem(storageKey);
//     if (storedData) {
//       setAppointment(JSON.parse(storedData));
//     }
//   }, [storageKey]);

//   const handleBooking = () => {
//     setShowModal(true);
//   };

//   const handleCancel = () => {
//     setAppointment(null);
//     localStorage.removeItem(storageKey);

//     const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//     const updatedGlobalAppointments = globalAppointments.filter(
//       (appt) => appt.doctorId !== id // Use doctorId instead of doctorName
//     );
//     localStorage.setItem("appointments", JSON.stringify(updatedGlobalAppointments));

//     window.dispatchEvent(new Event("appointmentUpdated"));
//   };

//   const handleFormSubmit = (appointmentData) => {
//     const newAppointment = {
//       id: uuidv4(), // Unique ID for the appointment
//       doctorId: id, // Associate the appointment with this doctor
//       doctorName: name,
//       doctorSpeciality: speciality,
//       ...appointmentData,
//       feedback: "",
//       rating: null,
//     };

//     try {
//       // Save the appointment for this doctor
//       localStorage.setItem(storageKey, JSON.stringify(newAppointment));

//       // Update global appointments
//       const globalAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
//       const updatedAppointments = [...globalAppointments, newAppointment];
//       localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

//       setAppointment(newAppointment);
//       setShowModal(false);
//       window.dispatchEvent(new Event("appointmentUpdated"));
//     } catch (error) {
//       console.error("Failed to save appointment:", error);
//     }
//   };

//   return (
//     <div className="doctor-card-container">
//       <div className="doctor-card-details-container">
//         <div className="doctor-card-profile-image-container">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="46"
//             height="46"
//             fill="currentColor"
//             className="bi bi-person-fill"
//             viewBox="0 0 16 16"
//           >
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
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
//           key={appointment ? appointment.id : 'no-appointment'} // Unique key for Popup
//           trigger={
//             <button
//               className={`book-appointment-btn ${appointment ? 'cancel-appointment' : ''}`}
//               onClick={appointment ? handleCancel : handleBooking}
//               aria-label={appointment ? "Cancel Appointment" : "Book Appointment"}
//             >
//               {appointment ? "Cancel Appointment" : "Book Appointment"}
//               <div>No Booking Fee</div>
//             </button>
//           }
//           modal
//           open={showModal}
//           onClose={() => setShowModal(false)}
//         >
//           {(close) => (
//             <div className="doctorbg">
//               <div>
//                 <div className="doctor-card-profile-image-container">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="46"
//                     height="46"
//                     fill="currentColor"
//                     className="bi bi-person-fill"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                   </svg>
//                 </div>
//                 <div className="doctor-card-details">
//                   <div className="doctor-card-detail-name">{name}</div>
//                   <div className="doctor-card-detail-speciality">{speciality}</div>
//                   <div className="doctor-card-detail-experience">{experience} years experience</div>
//                   <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
//                 </div>
//               </div>

//               {appointment ? (
//                 <>
//                   <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
//                   <div className="bookedInfo">
//                     <p><strong>Name:</strong> {appointment.name}</p>
//                     <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
//                     <p><strong>Date of Appointment:</strong> {appointment.appointmentDate}</p>
//                     <p><strong>Time Allotted:</strong> {appointment.timeSlot}</p>
//                     <button onClick={handleCancel}>Cancel Appointment</button>
//                   </div>
//                 </>
//               ) : (
//                 <AppointmentFormIC
//                   doctorName={name}
//                   doctorSpeciality={speciality}
//                   doctorId={id} // Pass the doctor's ID
//                   onSubmit={handleFormSubmit}
//                 />
//               )}
//             </div>
//           )}
//         </Popup>
//       </div>
//     </div>
//   );
// };

// export default DoctorCardIC;