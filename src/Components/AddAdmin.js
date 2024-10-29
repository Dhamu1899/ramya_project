import React, { useState, useEffect } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const savedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(savedAdmins);
  }, []);

  const generateUniqueId = () => {
    return `admin_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !mobile || !password || password !== confirmPassword) {
      alert('Please fill in all fields correctly. Passwords must match.');
      return;
    }

    const newAdmin = {
      id: generateUniqueId(),
      name,
      mobile,
      password,
    };

    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));

    setName('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
    setRegistrationSuccess(true);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Registration</h2>
      <form onSubmit={handleRegister} className="admin-form">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="mobile">Mobile Number*</label>
        <input
          type="tel"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="admin-button">Register</button>
      </form>

      {registrationSuccess && <p className="success-message">Registration successful! Unique ID generated.</p>}

      <h3 className="admin-list-title">Registered Admins</h3>
      {admins.length === 0 ? (
        <p className="no-admin-message">No admins registered yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Name</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddAdmin;
