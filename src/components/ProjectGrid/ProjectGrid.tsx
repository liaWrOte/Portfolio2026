import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { Project, FileSystemNode } from '../../types';
import './project-grid.scss';

interface ProjectGridProps {
  projects: (Project | FileSystemNode)[];
  onProjectClick: (projectId: string) => void;
  selectedProjectId?: string | null;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ 
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
      {projects.map((project: Project | FileSystemNode) => (
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
