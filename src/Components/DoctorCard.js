import React from 'react';
import { motion } from 'framer-motion';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }} // Rotate on hover
      className="doctor-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img src={doctor.image} alt={doctor.name} className="doctor-card-image" />
      <div className="doctor-card-details">
        <h3 className="doctor-card-name">{doctor.name}</h3>
        <p className="doctor-card-specialty">{doctor.specialty}</p>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
