import React from 'react';
import './AboutUs.css';
import AboutUs from '../assets/images/AboutUs.jpg';
import missionImage from '../assets/images/missionImage.jpg';
import introductionImage from '../assets/images/introductionImage.jpg';
import ourStoryImage from '../assets/images/ALXstudent.png';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="section">
        <img src={AboutUs} alt="Vision" className="section-image" />
        <div className="section-content">
          <h2>Vision Statement:</h2>
          <p>
            At MediBridge, our vision is to empower individuals to take control of their health 
            by providing them with accessible and innovative healthcare solutions. We strive to create a 
            bridge between patients, healthcare providers, and technology, ultimately transforming
            the way healthcare is delivered and experienced.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="section-content">
          <h2>Mission Statement:</h2>
          <p>
            Our mission at MediBridge is to revolutionize healthcare through the development of user-friendly, secure
             and personalized digital solutions. We are committed to improving patient outcomes, 
             enhancing collaboration between healthcare professionals, and facilitating efficient healthcare delivery, 
             ultimately leading to a healthier and happier society.
          </p>
        </div>
        <img src={missionImage} alt="Mission" className="section-image" />
      </div>
      <div className="section">
        <img src={introductionImage} alt="Introduction" className="section-image" />
        <div className="section-content">
          <h2>Introduction:</h2>
          <p>
            Welcome to MediBridge, where we believe that everyone deserves easy access to quality healthcare. 
            In today's fast-paced world, we understand the challenges individuals face in managing their health and seeking timely medical assistance. 
            That's why we have developed a comprehensive healthcare app designed to provide you with the tools and resources you need to take control of your well-being.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="section-content">
          <h2>Our Story:</h2>
          <p>
            The journey of MediBridge began with a shared vision among a group of
            ALX students who wanted to create an application that would help to bridge
            the gap between health providers and health recipients.
          </p>
        </div>
        <img src={ourStoryImage} alt="Our Story" className="section-image" />
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you. If you have any questions, feedback, or inquiries, please don't hesitate to reach out to us. You can contact our team at:
        </p>
        <ul className="email-list">
          <li>
            <a href="mailto:kendijackline42@gmail.com">
              <i className="fas fa-envelope"></i> Email 1
            </a>
          </li>
          <li>
            <a href="mailto:temitopesam5@gmail.com">
              <i className="fas fa-envelope"></i> Email 2
            </a>
          </li>
          <li>
            <a href="mailto:circleofwilliams@gmail.com">
              <i className="fas fa-envelope"></i> Email 3
            </a>
          </li>
          <li>
            <a href="mailto:akpasubi_v@yahoo.com">
              <i className="fas fa-envelope"></i> Email 4
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUsPage;