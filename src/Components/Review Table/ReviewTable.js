

// import React, { useState } from "react";
// import "./ReviewTable.css";
// import ReviewForm from "../ReviewForm/ReviewForm";

// const ReviewTable = () => {
//   // Fetch all appointments from localStorage
//   const storedData = localStorage.getItem("appointments");
//   const initialAppointments = storedData ? JSON.parse(storedData) : [];

//   // Log the fetched data for debugging
//   console.log("Fetched Appointments:", initialAppointments);

//   // Ensure appointments is always an array
//   const [appointments, setAppointments] = useState(initialAppointments);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Handle feedback submission
//   const handleFeedbackSubmit = (name, feedback, rating) => {
//     if (!selectedAppointment) return;

//     // Debug: Log submitted feedback
//     console.log("Submitted Feedback:", { name, feedback, rating });

//     // Update the appointment with feedback
//     const updatedAppointments = appointments.map((appointment) =>
//       appointment.id === selectedAppointment.id
//         ? { ...appointment, feedback, rating, patientName: name }
//         : appointment
//     );

//     // Save updated appointments to localStorage
//     localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
//     setAppointments(updatedAppointments);
//     setSelectedAppointment(null); // Close the feedback form
//   };

//   return (
//     <div className="review-table-container">
//       <h2>Review Appointments</h2>

//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         <table className="review-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Doctor Name</th>
//               <th>Doctor Specialty</th>
//               <th>Provide Feedback</th>
//               <th>Review Given</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment, index) => (
//               <tr key={appointment.id || index}>
//                 <td>{index + 1}</td>
//                 <td>{appointment.doctorName}</td>
//                 <td>{appointment.doctorSpeciality}</td>
//                 <td>
//                   <button
//                     className="feedback-btn"
//                     onClick={() => setSelectedAppointment(appointment)}
//                   >
//                     Click Here
//                   </button>
//                 </td>
//                 <td>
//                   {appointment.feedback ? (
//                     <div className="review-given">
//                       <p>
//                         <strong>Feedback:</strong> {appointment.feedback}
//                       </p>
//                       <p>
//                         <strong>Rating:</strong> {appointment.rating} ★
//                       </p>
//                     </div>
//                   ) : (
//                     "No review submitted"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Feedback Form Modal */}
//       {selectedAppointment && (
//         <div className="feedback-modal">
//           <div className="feedback-modal-content">
//             <h3>
//               Provide Feedback for {selectedAppointment.doctorName} (
//               {selectedAppointment.doctorSpeciality})
//             </h3>
//             <ReviewForm
//               onSubmit={handleFeedbackSubmit}
//               onClose={() => setSelectedAppointment(null)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewTable;




import React, { useState, useEffect } from "react";
import "./ReviewTable.css";
import ReviewForm from "../ReviewForm/ReviewForm";

const ReviewTable = () => {
  // Fetch all appointments from localStorage
  const storedData = localStorage.getItem("appointments");
  const initialAppointments = storedData ? JSON.parse(storedData) : [];

  // Log the fetched data for debugging
  console.log("Fetched Appointments:", initialAppointments);

  // Ensure appointments is always an array
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle feedback submission
  const handleFeedbackSubmit = (name, feedback, rating) => {
    if (!selectedAppointment) return;

    // Debug: Log submitted feedback
    console.log("Submitted Feedback:", { name, feedback, rating });

    // Update the appointment with feedback
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? { ...appointment, feedback, rating, patientName: name }
        : appointment
    );

    // Save updated appointments to localStorage
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setSelectedAppointment(null); // Close the feedback form
  };

  return (
    <div className="review-table-container">
      <h2>Review Appointments</h2>

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

      {/* Feedback Form Modal */}
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