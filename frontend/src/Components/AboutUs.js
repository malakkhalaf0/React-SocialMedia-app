import React from 'react';
import './AboutUs.css';
import travelersIllustration from '../assets/travelersIllustration.png'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignInClick = () => {
    navigate('/login'); // Navigate to the login page (adjust the route if needed)
  };

  return (
    <div className="about-us">
      <div className="about-us-content">
        <div className="text-content">
        {/* <p className="headerrrrrr" style={{ fontFamily: 'Poppins, sans-serif'}}>TrekLink</p> */}
        <p className="header">Trek<strong style={{color:'#fbb03b'}}>Link</strong></p>
        
          <h1 className="highlight" >We are leading Travel Social Media Platform</h1>
          <p className="gg"style={{color:'grey'}}>
            Trek Link allows travelers to share their travel stories, experiences, and connect with like-minded adventurers from around the world.
          </p>
          <button className="animated-button" onClick={handleSignInClick}>
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span className="text">Sign in </span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="image-content">
          <img src={travelersIllustration} alt="Travelers illustration" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
