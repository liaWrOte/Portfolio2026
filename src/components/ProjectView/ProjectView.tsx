import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './project-view.scss';

const ProjectView = ({ node }) => {
  if (!node) return null;

  // If node is a project (has project attributes)
  if (node.type === 'project') {
    return (
      <div className="project-view">
        <ProjectCard
          project={node}
          onClick={() => {}}
          isSelected={true}
        />
      </div>
    );
  }

  // If node is a folder with children (projects list)
  if (node.children && node.children.length > 0) {
    return (
      <div className="project-view">
        <div className="project-grid">
          {node.children.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {}}
              isSelected={false}
            />
          ))}
        </div>
      </div>
    );
  }

  // Fallback for other cases
  return (
    <div className="project-view">
      <p>No project data available</p>
    </div>
  );
};

export default ProjectView;
