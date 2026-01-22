import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { Project } from '../../types';
import './project-showcase.scss';

interface ProjectShowcaseProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  selectedProjectId?: string;
  title?: string;
  subtitle?: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ 
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
