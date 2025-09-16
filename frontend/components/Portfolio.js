import React from 'react';

const Portfolio = () => {
  const projects = [
    { title: 'Project One', description: 'This is my first project.' },
    { title: 'Project Two', description: 'This is my second project.' },
    { title: 'Project Three', description: 'This is my third project.' },
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <h2>My Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
