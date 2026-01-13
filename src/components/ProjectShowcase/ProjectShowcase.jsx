import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import './project-showcase.scss';

const ProjectShowcase = ({ 
  projects, 
  onProjectClick,
  selectedProjectId,
  title = "Projects",
  subtitle = "Explore my work"
}) => {
  return (
    <div className="project-showcase">
      {/* Header section */}
      <div className="showcase-header">
        <h1 className="showcase-title">{title}</h1>
        {subtitle && <p className="showcase-subtitle">{subtitle}</p>}
      </div>

      {/* Projects grid */}
      <ProjectGrid 
        projects={projects}
        onProjectClick={onProjectClick}
        selectedProjectId={selectedProjectId}
      />
    </div>
  );
};

export default ProjectShowcase;
