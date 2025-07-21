import React from "react";
import "../styles/Team.css";

const Team = () => {
  return (
    <div className="team-container">
      
      {/* Header Section */}
      <div className="team-header">
        <h1>About the Creator</h1>
        <p>
          RiverLock is a personal project I built to explore web development concepts like design, routing, and responsive UI.
          <br /><br />
          It’s one step forward in my journey to becoming a web developer.
        </p>
        <div className="divider" />
      </div>

      {/* Profile Section */}
      <div className="team-profile">
        <img
          src={`${process.env.PUBLIC_URL}/images/Penguin.jpg`} 
          alt="Hector Trillo"
          className="team-image"
        />
        <div className="team-info">
          <h3>Hector Trillo</h3>
          <p className="team-role">Web Developer</p>
          <p className="team-bio">
            I’m Hector, learning web development and dev related concepts. Currently testing the
            fundamentals of building user friendly and secure web applications.
            <br /><br />
            RiverLock is a fun way to show off my efforts to grow by putting
            some skills into practice. It’s part of my portfolio and reflects where I am in my learning journey.
          </p>
        </div>
      </div>

      <div className="divider" />

      {/* Values Section */}
      <div className="team-values">
        <h2>What I’m Learning</h2>
        <div className="values-list">
          <div className="value-item">
            <h3>Frontend Development</h3>
            <p>
              Understanding the basics of React, creating responsive UIs, and
              implementing routing for seamless navigation.
            </p>
          </div>
          <div className="value-item">
            <h3>Backend Concepts</h3>
            <p>
              Experimenting with authentication, session handling, and secure
              data management to build functional web apps.
            </p>
          </div>
          <div className="value-item">
            <h3>Problem Solving</h3>
            <p>
              Debugging, researching solutions, and learning to write clean and
              maintainable code for real world scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;