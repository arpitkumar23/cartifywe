import React from "react";
import "../css/Title.css";  
import Title from "../contect/Title";

const About = () => {
  return (
    <div className="about-container">
      
      {/* Hero Section */}
      

      {/* Our Story */}
      <section className="about-section">
       <Title text1="ABOUT" text2="US" />
        <div className="story-content">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
            alt="Our Story"
            className="section-image"
          />
          <p>
            Founded in 2023, our e-commerce store was built with a simple idea — 
            to bring premium quality products closer to customers with the ease of 
            shopping online. We aim to provide an effortless shopping experience 
            with trust, value, and transparency at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section mission-vision">
        <div className="mv-card">
          <img src="https://img.icons8.com/color/96/000000/mission.png" alt="Mission" />
          <h2>Our Mission</h2>
          <p>
            To deliver high-quality, affordable products that add value to our 
            customers’ lives, while making online shopping simple and enjoyable.
          </p>
        </div>
        <div className="mv-card">
          <img src="https://img.icons8.com/color/96/000000/vision.png" alt="Vision" />
          <h2>Our Vision</h2>
          <p>
            To become one of the most loved and trusted e-commerce platforms by 
            consistently providing customer satisfaction and innovation.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-section">
        <h2>Our Core Values</h2>
        <div className="values-list">
          <div className="value-card">
            <img src="https://img.icons8.com/color/48/000000/customer.png" alt="Customer First" />
            <p>Customer First – Your satisfaction is our priority.</p>
          </div>
          <div className="value-card">
            <img src="https://img.icons8.com/color/48/000000/handshake.png" alt="Trust" />
            <p>Trust & Transparency – We keep things clear and honest.</p>
          </div>
          <div className="value-card">
            <img src="https://img.icons8.com/color/48/000000/quality.png" alt="Quality" />
            <p>Quality Commitment – Only the best products make it to you.</p>
          </div>
          <div className="value-card">
            <img src="https://img.icons8.com/color/48/000000/idea.png" alt="Innovation" />
            <p>Innovation – Always improving your shopping experience.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section why-choose">
        <h2>Why Shop With Us?</h2>
        <div className="badges">
          <div className="badge">🛡 Secure Payments</div>
          <div className="badge">🚚 Fast Delivery</div>
          <div className="badge">⭐ Premium Quality</div>
          <div className="badge">📞 24/7 Support</div>
        </div>
      </section>

    </div>
  );
};

export default About;
