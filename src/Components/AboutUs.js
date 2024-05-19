// import React from 'react';
import './AboutUs.css';
import travelersIllustration from '../assets/travelersIllustration.png'; // Adjust the path if necessary

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-content">
        <div className="text-content">
          <h1>We are leading</h1>
          <h1 className="highlight">Travel Social Media Platform</h1>
          <p>
            Trek Link allows travelers to share their travel stories, experiences, and connect with like-minded adventurers from around the world.
          </p>
          <button class="animated-button">
  <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text">Sign in </span>
  <span class="circle"></span>
  <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>

        </div>
        <div className="image-content">
          <img src={travelersIllustration} alt="Travelers illustration" />
        </div>
        {/* <section className="team">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <h3>Shahd</h3>
              <p>Co-Founder & CEO</p>
            </div>
            <div className="team-member">
              <h3>Malak</h3>
              <p>Co-Founder & CTO</p>
            </div>
            <div className="team-member">
              <h3>Zainab</h3>
              <p>Co-Founder & COO</p>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default AboutUs;