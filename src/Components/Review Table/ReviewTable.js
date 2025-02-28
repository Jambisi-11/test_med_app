


import React, { useState, useEffect } from "react";
import "./ReviewTable.css";
import ReviewForm from "../ReviewForm/ReviewForm";

const ReviewTable = () => {
  const storedData = localStorage.getItem("appointments");
  const initialAppointments = storedData ? JSON.parse(storedData) : [];

  console.log("Fetched Appointments:", initialAppointments);

  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showTable, setShowTable] = useState(true); // State to toggle visibility

  const handleFeedbackSubmit = (name, feedback, rating) => {
    if (!selectedAppointment) return;

    console.log("Submitted Feedback:", { name, feedback, rating });

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? { ...appointment, feedback, rating, patientName: name }
        : appointment
    );

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setSelectedAppointment(null);
  };

  if (!showTable) return null; // Remove table completely when closed

  return (
    <div className="review-table-container">
      <div className="table-header">
        <h2>Review Appointments</h2>
        <button className="close-btn" onClick={() => setShowTable(false)}>
          ✖
        </button>
      </div>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="review-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id || index}>
                <td>{index + 1}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.doctorSpeciality}</td>
                <td>
                  <button
                    className="feedback-btn"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    Click Here
                  </button>
                </td>
                <td>
                  {appointment.feedback ? (
                    <div className="review-given">
                      <p>
                        <strong>Feedback:</strong> {appointment.feedback}
                      </p>
                      <p>
                        <strong>Rating:</strong> {appointment.rating} ★
                      </p>
                    </div>
                  ) : (
                    "No review submitted"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedAppointment && (
        <div className="feedback-modal">
          <div className="feedback-modal-content">
            <h3>
              Provide Feedback for {selectedAppointment.doctorName} (
              {selectedAppointment.doctorSpeciality})
            </h3>
            <ReviewForm
              onSubmit={handleFeedbackSubmit}
              onClose={() => setSelectedAppointment(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;





// import React, { useState, useEffect } from "react";
// import "./ReviewTable.css";
// import ReviewForm from "../ReviewForm/ReviewForm";
// import Navbar from "../Navbar/Navbar"; // Import the Navbar component

// const ReviewTable = () => {
//   const storedData = localStorage.getItem("appointments");
//   const initialAppointments = storedData ? JSON.parse(storedData) : [];

//   const [appointments, setAppointments] = useState(initialAppointments);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [showTable, setShowTable] = useState(true); // State to toggle visibility

//   const handleFeedbackSubmit = (name, feedback, rating) => {
//     if (!selectedAppointment) return;

//     const updatedAppointments = appointments.map((appointment) =>
//       appointment.id === selectedAppointment.id
//         ? { ...appointment, feedback, rating, patientName: name }
//         : appointment
//     );

//     try {
//       localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
//       setAppointments(updatedAppointments);
//       setSelectedAppointment(null);
//     } catch (error) {
//       console.error("Failed to save feedback:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar /> {/* Render Navbar at the top */}
//       {showTable && (
//         <div className="review-table-container">
//           <div className="table-header">
//             <h2>Review Appointments</h2>
//             <button
//               className="close-btn"
//               onClick={() => setShowTable(false)}
//               aria-label="Close table"
//             >
//               ✖
//             </button>
//           </div>

//           {appointments.length === 0 ? (
//             <p>No appointments found.</p>
//           ) : (
//             <table className="review-table">
//               <thead>
//                 <tr>
//                   <th>Serial No.</th>
//                   <th>Doctor Name</th>
//                   <th>Doctor Specialty</th>
//                   <th>Provide Feedback</th>
//                   <th>Review Given</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.map((appointment, index) => (
//                   <tr key={appointment.id}>
//                     <td>{index + 1}</td>
//                     <td>{appointment.doctorName}</td>
//                     <td>{appointment.doctorSpeciality}</td>
//                     <td>
//                       <button
//                         className="feedback-btn"
//                         onClick={() => setSelectedAppointment(appointment)}
//                         aria-label="Provide feedback"
//                       >
//                         Click Here
//                       </button>
//                     </td>
//                     <td>
//                       {appointment.feedback ? (
//                         <div className="review-given">
//                           <p>
//                             <strong>Feedback:</strong> {appointment.feedback}
//                           </p>
//                           <p>
//                             <strong>Rating:</strong> {appointment.rating} ★
//                           </p>
//                         </div>
//                       ) : (
//                         "No review submitted"
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {selectedAppointment && (
//             <div className="feedback-modal">
//               <div className="feedback-modal-content">
//                 <h3>
//                   Provide Feedback for {selectedAppointment.doctorName} (
//                   {selectedAppointment.doctorSpeciality})
//                 </h3>
//                 <ReviewForm
//                   onSubmit={handleFeedbackSubmit}
//                   onClose={() => setSelectedAppointment(null)}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ReviewTable;