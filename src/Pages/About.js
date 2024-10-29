import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1 className="about-title">About Our Hospital</h1>
      <p className="about-text">
        Welcome to our hospital. We provide comprehensive healthcare services 
        with a commitment to excellence and compassion. Our mission is to 
        enhance the health of the communities we serve through quality 
        healthcare, education, and research.
      </p>
      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-text">
        Our mission is to deliver high-quality, patient-centered care 
        and to promote health and wellness in our community. We believe 
        that every patient deserves individualized attention and care.
      </p>
      <h2 className="about-subtitle">Our Values</h2>
      <ul className="about-list">
        <li className="about-list-item">Compassion</li>
        <li className="about-list-item">Integrity</li>
        <li className="about-list-item">Teamwork</li>
        <li className="about-list-item">Innovation</li>
        <li className="about-list-item">Respect</li>
      </ul>
      <h2 className="about-subtitle">Services We Offer</h2>
      <p className="about-text">
        Our hospital offers a range of services including:
      </p>
      <ul className="about-list">
        <li className="about-list-item">Emergency Care</li>
        <li className="about-list-item">Inpatient & Outpatient Services</li>
        <li className="about-list-item">Surgery</li>
        <li className="about-list-item">Diagnostics</li>
        <li className="about-list-item">Maternity Care</li>
        <li className="about-list-item">Pediatrics</li>
      </ul>
    </div>
  );
}

export default About;
