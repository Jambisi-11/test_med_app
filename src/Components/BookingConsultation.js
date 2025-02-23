import React, { useState } from 'react'; // Added useState import
import DoctorCard from './InstantConsultationBooking/DoctorCardIC/DoctorCardIC';
import FindDoctorSearch from './InstantConsultationBooking/FindDoctorSearchIC/FindDoctorSearchIC';

const BookingConsultation = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="booking-container">
            <h2>Book a Consultation</h2>

            {/* Search for a doctor */}
            <FindDoctorSearch onSelectDoctor={handleDoctorSelect} />

            {/* Display doctor details if one is selected */}
            {selectedDoctor && <DoctorCard doctor={selectedDoctor} />}

            {/* Booking Button (if needed) */}
            {selectedDoctor && (
                <button className="book-btn">Book Appointment</button>
            )}
        </div> 
    ); // Closed return statement properly
};

export default BookingConsultation;
