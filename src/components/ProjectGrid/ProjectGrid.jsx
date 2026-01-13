import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './project-grid.scss';

const ProjectGrid = ({ 
  projects, 
  onProjectClick,
  selectedProjectId = null 
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="project-grid-empty">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onProjectClick}
          isSelected={project.id === selectedProjectId}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
