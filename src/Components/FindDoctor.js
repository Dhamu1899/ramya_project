import React, { useState, useEffect } from 'react';
import './FindDoctor.css';

const FindDoctor = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);

    const savedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctorList(savedDoctors);

    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    const doctorsInSameLocation = doctorList.filter(
      (doctor) => doctor.location.toLowerCase() === patient.location.toLowerCase()
    );
    setFilteredDoctors(doctorsInSameLocation);
    setIsModalOpen(true); // Open the modal when a patient is selected
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor || !appointmentDate || !appointmentTime) {
      alert('Please fill in all fields: patient, doctor, appointment date, and time.');
      return;
    }

    const newAppointment = {
      patient: selectedPatient.firstName,
      illnessDetails: selectedPatient.illnessDetails,
      doctor: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      location: selectedPatient.location,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    setAppointmentDetails(newAppointment);
    alert(`Appointment booked successfully for ${newAppointment.patient} with ${newAppointment.doctor}`);

    const updatedPatients = patients.filter((p) => p.uniqueId !== selectedPatient.uniqueId);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));

    // Reset form fields
    setSelectedPatient(null);
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
    setIsModalOpen(false); // Close the modal after submitting
  };

  const handleDeletePatient = (uniqueId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const updatedPatients = patients.filter((patient) => patient.uniqueId !== uniqueId);
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      alert('Patient deleted successfully');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without saving
    setSelectedPatient(null);
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <div className="find-doctor-container">
      <h2>Find a Doctor & Book Appointment</h2>

      {!appointmentDetails && (
        <div className="patient-list-section">
          <h3>Select a Patient</h3>
          {patients.length === 0 ? (
            <p>No patients available. Please add a patient first.</p>
          ) : (
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Unique ID</th>
                  <th>First Name</th>
                  <th>Illness Details</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.uniqueId}>
                    <td>{patient.uniqueId}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.illnessDetails}</td>
                    <td>{patient.location}</td>
                    <td>
                      <button className="action-button" onClick={() => handlePatientSelect(patient)}>Find Doctor</button>
                      <button className="delete-button" onClick={() => handleDeletePatient(patient.uniqueId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Book Appointment</h3>
            <form onSubmit={handleAppointmentSubmit} className="appointment-form">
              <div className="form-group">
                <p><strong>Selected Patient:</strong> {selectedPatient.firstName}</p>
                <p><strong>Location:</strong> {selectedPatient.location}</p>
                <p><strong>Illness Details:</strong> {selectedPatient.illnessDetails}</p>
              </div>

              <div className="form-group">
                <label>Select Doctor*</label>
                <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                  <option value="">--Select Doctor--</option>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No doctors available in this location
                    </option>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Appointment Date*</label>
                <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Appointment Time*</label>
                <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
              </div>

              <button type="submit" className="submit-button">Book Appointment</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {appointmentDetails && (
        <div className="appointment-details-section">
          <h3>Appointment Details</h3>
          <p><strong>Patient Name:</strong> {appointmentDetails.patient}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctor}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          <p><strong>Location:</strong> {appointmentDetails.location}</p>
        </div>
      )}
    </div>
  );
};

export default FindDoctor;
