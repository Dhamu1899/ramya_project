import React from 'react';
import './AdminLandingScreen.css';
import { useNavigate } from 'react-router-dom';

const AdminLandingScreen = () => {
  const navigate = useNavigate();

  const handleEditPatient = () => {
    navigate("/Components/EditPatient");
  };

  const handleAddDoctor = () => {
    navigate("/Components/AddDoctor");
  };

  const handleAddAdmin = () => {
    navigate("/Components/AddAdmin");
  };

  const handleBookAppointment = () => {
    navigate("/components/FindDoctor");
  };

  return (
    <div className="admin-landing">
      <header className="admin-header">Admin Dashboard</header>
      <main className="admin-main-content">
        <h1 className="admin-main-title">Welcome to the Admin Panel</h1>
        <p className="admin-main-text">
          Here you can manage users, view reports, and adjust settings.
        </p>
      </main>

      <nav className="admin-navigation">
        <ul className="admin-nav-list">
          <li className="admin-nav-item">
            <button className="admin-nav-button" onClick={handleEditPatient}>
              Edit Patient
            </button>
          </li>
          <li className="admin-nav-item">
            <button className="admin-nav-button" onClick={handleAddDoctor}>
              Add Doctor
            </button>
          </li>
          <li className="admin-nav-item">
            <button className="admin-nav-button" onClick={handleAddAdmin}>
              Add Admin
            </button>
          </li>
          <li className="admin-nav-item">
            <button className="admin-nav-button" onClick={handleBookAppointment}>
              Book Appointment
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminLandingScreen;
