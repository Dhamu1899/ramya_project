import React from 'react';
import './PatientLandingScreen.css';

const reports = [
  { id: 1, title: 'Blood Test Report', date: '2024-10-01', fileUrl: '/path/to/report1.pdf' },
  { id: 2, title: 'X-ray Report', date: '2024-09-25', fileUrl: '/path/to/report2.pdf' },
];

const appointments = [
  { id: 1, doctor: 'Dr. Tina', specialty: 'Cardiology', date: '2024-10-15', time: '10:00 AM' },
  { id: 2, doctor: 'Dr. Jan', specialty: 'Dermatology', date: '2024-11-01', time: '1:00 PM' },
];

const PatientLandingScreen = () => {
  return (
    <div className="patient-landing-container">
      <h1 className="patient-landing-title">Patient Landing Screen</h1>
      <p className="patient-landing-description">
        Welcome to the patient portal. Here you can manage your health records, schedule appointments, and more.
      </p>

      {/* Reports Section */}
      <section className="reports-section">
        <h2 className="section-title">Reports</h2>
        {reports.length === 0 ? (
          <p className="no-data-message">No reports available.</p>
        ) : (
          <ul className="reports-list">
            {reports.map(report => (
              <li key={report.id} className="report-item">
                <span>{report.title} - {report.date}</span>
                <a href={report.fileUrl} download className="report-download-link">Download</a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Appointments Section */}
      <section className="appointments-section">
        <h2 className="section-title">Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p className="no-data-message">No upcoming appointments.</p>
        ) : (
          <ul className="appointments-list">
            {appointments.map(appointment => (
              <li key={appointment.id} className="appointment-item">
                <span>{appointment.doctor} - {appointment.specialty} - {appointment.date} at {appointment.time}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button className="start-button">Get Started</button>
    </div>
  );
};

export default PatientLandingScreen;
