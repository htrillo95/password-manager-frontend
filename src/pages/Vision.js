import React from "react";
import "../styles/Vision.css";

const Vision = () => {
  return (
    <div className="vision-container">
      <header className="vision-header">
        <h1>Vision</h1>
        <p>
          RiverLock started with a simple goal in mind: build something secure and useful from the ground up.
        </p>
      </header>

      <section className="vision-content">
        <div className="vision-section">
          <h2>Practice</h2>
          <p>
            This app isn’t meant to be perfect. It’s a way to learn by doing. Every feature, bug, and improvement is part of the process. 
            The goal is to understand how real apps work.
          </p>
        </div>

        <div className="vision-section">
          <h2>Security First</h2>
          <p>
            Even as a demo, RiverLock takes encryption seriously. Passwords are encrypted and stored safely to show how real apps handle sensitive data. 
            It’s not just for show, it’s for learning how to build secure systems the right way.
          </p>
        </div>

        <div className="vision-section">
          <h2>Growth</h2>
          <p>
            The vision is simple. Keep learning. Keep building. And eventually turn this into something bigger. 
            RiverLock is one step in the journey, and it reflects the effort to grow.
          </p>
        </div>
      </section>

      <footer className="vision-footer">
        <h2>Looking Ahead</h2>
        <p>
          RiverLock is a snapshot of progress and a reminder that it’s okay to build small while thinking big.
        </p>
      </footer>
    </div>
  );
};

export default Vision;