import React, { useState, useEffect } from 'react';
import './EditPatient.css';

const EditPatient = () => {
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    address: '',
    location: '',
    state: '',
    country: '',
    mobile: '',
    reports: null,
    illnessDetails: '',
    password: '',
    confirmPassword: '',
    uniqueId: '',
  });

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'reports' ? files : value,
    }));
  };

  const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientDetails.password !== patientDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatedPatients = editMode
      ? patients.map((patient) => (patient.uniqueId === patientDetails.uniqueId ? patientDetails : patient))
      : [...patients, { ...patientDetails, uniqueId: generateUniqueId() }];

    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    alert(editMode ? 'Patient details updated successfully' : `Successfully registered! Your ID is ${patientDetails.uniqueId}`);
    resetForm();
  };

  const handleSearch = () => {
    const result = patients.find((patient) => patient.uniqueId.includes(searchQuery));
    if (result) {
      setPatientDetails(result);
      setEditMode(true);
      setFormVisible(true);
    } else {
      alert('Patient not found');
      setFormVisible(false);
    }
  };

  const resetForm = () => {
    setPatientDetails({
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      address: '',
      location: '',
      state: '',
      country: '',
      mobile: '',
      reports: null,
      illnessDetails: '',
      password: '',
      confirmPassword: '',
      uniqueId: '',
    });
    setEditMode(false);
    setFormVisible(false);
  };

  const handleEdit = (uniqueId) => {
    const patientToEdit = patients.find((patient) => patient.uniqueId === uniqueId);
    setPatientDetails(patientToEdit);
    setEditMode(true);
    setFormVisible(true);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDelete = (uniqueId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const updatedPatients = patients.filter((patient) => patient.uniqueId !== uniqueId);
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      alert('Patient deleted successfully');
    }
  };

  return (
    <div>
      {/* Main Content Section */}
      <div className={`edit-patient-container ${formVisible ? 'blur-background' : ''}`}>
        <div className="patient-list-section">
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Patient ID"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>
          <h2>Patients List</h2>
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <table className="patient-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.uniqueId}>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.mobile}</td>
                    <td>{patient.address}</td>
                    <td>{patient.uniqueId}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(patient.uniqueId)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(patient.uniqueId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Form Modal */}
      {formVisible && (
        <div className="overlay">
          <div className="edit-form-modal">
            <h2>{editMode ? 'Edit Patient Details' : 'Add New Patient'}</h2>
            <form onSubmit={handleSubmit} className="patient-form">
              <div className="form-column">
                <label>First Name*</label>
                <input type="text" name="firstName" value={patientDetails.firstName} onChange={handleChange} required />
                <label>Middle Name</label>
                <input type="text" name="middleName" value={patientDetails.middleName} onChange={handleChange} />
                <label>Last Name*</label>
                <input type="text" name="lastName" value={patientDetails.lastName} onChange={handleChange} required />
                <label>Date Of Birth*</label>
                <input type="date" name="dob" value={patientDetails.dob} onChange={handleChange} required />
                <label>Mobile*</label>
                <input type="text" name="mobile" value={patientDetails.mobile} onChange={handleChange} required />
                <label>Illness Details*</label>
                <textarea name="illnessDetails" value={patientDetails.illnessDetails} onChange={handleChange} required />
              </div>
              <div className="form-column">
                <label>Address*</label>
                <input type="text" name="address" value={patientDetails.address} onChange={handleChange} required />
                <label>Location*</label>
                <input type="text" name="location" value={patientDetails.location} onChange={handleChange} required />
                <label>State*</label>
                <input type="text" name="state" value={patientDetails.state} onChange={handleChange} required />
                <label>Country*</label>
                <input type="text" name="country" value={patientDetails.country} onChange={handleChange} required />
                <label>Reports*</label>
                <input type="file" name="reports" onChange={handleChange} multiple />
                {!editMode && (
                  <>
                    <label>Password*</label>
                    <input type="password" name="password" value={patientDetails.password} onChange={handleChange} required />
                    <label>Confirm Password*</label>
                    <input type="password" name="confirmPassword" value={patientDetails.confirmPassword} onChange={handleChange} required />
                  </>
                )}
              </div>
              <button type="submit" className="submit-button">{editMode ? 'Update Patient' : 'Add Patient'}</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPatient;
