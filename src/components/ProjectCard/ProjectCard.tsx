import React from 'react';
import { Project, FileSystemNode } from '../../types';
import './project-card.scss';

interface ProjectCardProps {
  project: Project | FileSystemNode;
  onClick: (projectId: string) => void;
  isSelected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onClick,
  isSelected = false 
}) => {
  // Debug pour voir la structure du project
  console.log('ProjectCard project:', project);
  
  // Vérification si c'est un FileSystemNode (avec name direct) ou un Project (avec attributes)
  const isFileSystemNode = 'name' in project && !('attributes' in project);
  
  if (isFileSystemNode) {
    // Structure FileSystemNode : { id, name, type, children, ... }
    const fsNode = project as FileSystemNode;
    const {
      id,
      name,
      techno,
      role,
      pitch,
      link,
      date,
      type
    } = fsNode;

    // Ensure techno is an array
    const technologies = Array.isArray(techno) ? techno : 
                     (typeof techno === 'string' ? [techno] : []);

    return (
      <div 
        className={`project-card ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(id)}
      >
        {/* Project header with icon */}
        <div className="project-card-header">
          <div className="project-icon">
            📄
          </div>
          <div className="project-meta">
            {type && <span className="project-type">{type}</span>}
            {date && <span className="project-date">{date}</span>}
          </div>
        </div>

        {/* Project title */}
        <h3 className="project-title">{name}</h3>

        {/* Project description */}
        {pitch && (
          <p className="project-description">{pitch}</p>
        )}

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="project-technologies">
            {(technologies as string[]).slice(0, 4).map((tech: string, index: number) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {(technologies as string[]).length > 4 && (
              <span className="tech-tag more">+{(technologies as string[]).length - 4}</span>
            )}
          </div>
        )}

        {/* Role */}
        {role && (
          <div className="project-role">
            <span className="role-label">Role:</span>
            <span className="role-value">{role}</span>
          </div>
        )}

        {/* Project link */}
        {link && (
          <div className="project-link">
            <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              View Project →
            </a>
          </div>
        )}
      </div>
    );
  }

  // Structure Project Strapi : { id, attributes: { title, ... } }
  const strapiProject = project as Project;
  const {
    id,
    attributes: {
      title: name,
      techno,
      role,
      pitch,
      link,
      date,
      type
    }
  } = strapiProject;

  // Ensure techno is an array
  const technologies = Array.isArray(techno) ? techno : 
                   (typeof techno === 'string' ? [techno] : []);

  return (
    <div 
      className={`project-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(id)}
    >
      {/* Project header with icon */}
      <div className="project-card-header">
        <div className="project-icon">
          📄
        </div>
        <div className="project-meta">
          {type && <span className="project-type">{type}</span>}
          {date && <span className="project-date">{date}</span>}
        </div>
      </div>

      {/* Project title */}
      <h3 className="project-title">{name}</h3>

      {/* Project description */}
      {pitch && (
        <p className="project-description">{pitch}</p>
      )}

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="project-technologies">
          {(technologies as string[]).slice(0, 4).map((tech: string, index: number) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
          {(technologies as string[]).length > 4 && (
            <span className="tech-tag more">+{(technologies as string[]).length - 4}</span>
          )}
        </div>
      )}

      {/* Role */}
      {role && (
        <div className="project-role">
          <span className="role-label">Role:</span>
          <span className="role-value">{role}</span>
        </div>
      )}

      {/* Project link */}
      {link && (
        <div className="project-link">
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            View Project →
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
