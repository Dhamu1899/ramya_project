import React from 'react';
import { motion } from 'framer-motion';
import './AchievementsSection.css';

const achievements = [
  { 
    id: 1, 
    title: 'Best Hospital Award', 
    year: '2022', 
    description: 'Awarded for outstanding patient care and innovation in healthcare services.',
    seal: 'image.png' 
  },
  { 
    id: 2, 
    title: 'Excellence in Patient Care', 
    year: '2021', 
    description: 'Recognized for maintaining exceptional standards in patient care.',
    seal: 'image.png' 
  },
  { 
    id: 3, 
    title: 'Innovation in Healthcare', 
    year: '2020', 
    description: 'Honored for pioneering new methods in patient treatment.',
    seal: 'image.png' 
  },
  { 
    id: 4, 
    title: 'Community Impact Award', 
    year: '2019', 
    description: 'Celebrated for significant contributions to community health initiatives.',
    seal: 'image.png' 
  },
];

const AchievementsSection = () => {
  return (
    <section className="achievements-section">
      <h2 className="achievements-title">Our Achievements</h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="achievement-card"
          >
            <img src={achievement.seal} alt={`${achievement.title} seal`} className="achievement-seal" />
            <h3 className="achievement-title">{achievement.title}</h3>
            <p className="achievement-year">{achievement.year}</p>
            <p className="achievement-description">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
