
import React from 'react';
import './about.css';
import Sidebar from '../../sidebar/Sidebar';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Welcome to COUPLES ABROAD  - Your guide to exploring the world as couples, one journey at a time.</p>
      </header>
      
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          Couple Abroad is a travel blog dedicated to sharing authentic, inspiring, and practical travel stories and guides as couples. 
          Whether you're a seasoned traveler or planning your first adventure, we're here to help you make the most of your journey.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower travelers with insights and tips to explore the world confidently and responsibly.
          We believe in sustainable travel and aim to highlight unique experiences, hidden gems, and the diverse cultures of each destination.
        </p>
      </section>

      <section className="about-section">
        <h2>Meet the Team</h2>
        <br></br>
        <div className="team">
          <div className="team-member">
            <h3>Alex Journey</h3>
            <p>Founder & Travel Writer</p>
            <p>
              With over 10 years of travel experience, Alex started Wanderlust Trails to inspire people to step out of their comfort zones and see the world in new ways.
            </p>
          </div>
          <div className="team-member">
            <h3>Taylor Adventure</h3>
            <p>Photographer & Content Creator</p>
            <p>
              Taylor captures the beauty of each destination, bringing it to life through stunning visuals and heartfelt storytelling.
            </p>
          </div>
        </div>
      </section>
      <Sidebar/>

    </div>
  );
};

export default About;
