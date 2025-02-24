// // Following code has been commented with appropriate comments for your reference.
// import React, { useState } from 'react';

// // Function component for giving reviews
// function GiveReviews() {
//   // State variables using useState hook
//   const [showForm, setShowForm] = useState(false);
//   const [submittedMessage, setSubmittedMessage] = useState('');
//   const [showWarning, setShowWarning] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     review: '',
//     rating: 0
//   });

//   // Function to handle button click event
//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

//   // Function to handle form input changes
//   const handleChange = (e) => {
//     // Update the form data based on user input
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedMessage(formData);
//     setFormData({
//       name: '',
//       review: '',
//       rating: 0
//     });
//     // Check if all required fields are filled before submission
//     if (formData.name && formData.review && formData.rating > 0) {
//       setShowWarning(false);
//     } else {
//       setShowWarning(true);
//     }
//   };

//   return (
//     <div>
//       <h2>Form with Message</h2>
//       {!showForm ? (
//         // Display button to open the form
//         <button onClick={handleButtonClick}>Open Form</button>
//       ) : (
//         // Display form for giving feedback
//         <form onSubmit={handleSubmit}>
//           <h2>Give Your Feedback</h2>
//           {/* Display warning message if not all fields are filled */}
//           {showWarning && <p className="warning">Please fill out all fields.</p>}
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
//           </div>
//           <div>
//             <label htmlFor="review">Review:</label>
//             <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
//           </div>
//           {/* Submit button for form submission */}
//           <button type="submit">Submit</button>
//         </form>
//       )}
//       {/* Display the submitted message if available */}
//       {submittedMessage && (
//         <div>
//           <h3>Submitted Message:</h3>
//           <p>{submittedMessage}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GiveReviews;



import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debug: Log form data
    console.log("Form Data:", { name, feedback, rating });

    // Validate inputs
    if (!name.trim() || !feedback.trim() || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    // Call the onSubmit function from the parent component
    onSubmit(name, feedback, rating);

    // Reset form fields
    setName("");
    setFeedback("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="feedback">Your Feedback:</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          required
        />
      </div>

      <div className="form-group">
        <label>Rating:</label>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? "active" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;