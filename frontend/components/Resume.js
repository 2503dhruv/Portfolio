import React from "react";

const Resume = () => {
  const backendURL = "http://localhost:7000"; // change for production

  return (
    <section id="resume" className="resume-section">
      <h2>Resume</h2>
      <p>Click below to download my resume:</p>
      <a href={`${backendURL}/resume`} target="_blank" rel="noopener noreferrer">
        <button>Download Resume</button>
      </a>

      <style jsx>{`
        .resume-section {
          text-align: center;
          margin: 5rem auto;
          padding: 2rem;
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #22c55e;
        }
        button {
          background: #22c55e;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover {
          background: #16a34a;
        }
      `}</style>
    </section>
  );
};

export default Resume;
