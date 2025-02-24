import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
    
      const appointmentDetails = {
        name,
        phoneNumber,
        appointmentDate,
        timeSlot,
        doctorName,
        doctorSpeciality,
      };
    
      localStorage.setItem("appointmentData", JSON.stringify(appointmentDetails)); // Save appointment
      onSubmit(appointmentDetails); // Update state in parent
    };
    
    
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
  <label htmlFor="appointmentDate">Date of Appointment:</label>
  <input
    type="date"
    id="appointmentDate"
    value={appointmentDate}
    onChange={(e) => setAppointmentDate(e.target.value)}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="timeSlot">Book Time Slot:</label>
  <input
    type="time"
    id="timeSlot"
    value={timeSlot}
    onChange={(e) => setTimeSlot(e.target.value)}
    required
  />
</div>

        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC
