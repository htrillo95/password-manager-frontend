import React from "react";
import "../styles/Team.css";

const Team = () => {
  return (
    <div className="team-container">
      {/* Header Section */}
      <div className="team-header">
        <h1>About the Creator</h1>
        <p>
          RiverLock is a personal project built by a beginner developer,
          it's an exploration of web development concepts like design,
          routing, and responsive UI. This project is a step forward in my
          journey to becoming a web developer.
        </p>
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
          <p className="team-role">Aspiring Full Stack Dev</p>
          <p className="team-bio">
            I’m Hector, learning web development and dev-related concepts. Currently testing the
            fundamentals of building user friendly and secure web applications.
            RiverLock is a fun way show off my efforts to grow as a developer by putting
            some skills into practice. This demo project is part of my
            portfolio and represents where I am in my learning journey.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="team-mission">
        <h2>About RiverLock</h2>
        <p>
          RiverLock is a demo project used for secure password
          management solutions. This is not a finished product, but a way to
          practice building secure and appealing web applications.
        </p>
        <p>
          <strong>Note:</strong> This project is built
          for learning purposes. The "team" behind it is just me, figuring things
          out as I go.
        </p>
      </div>

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