import React from 'react';
import './project-card.scss';

const ProjectCard = ({ 
  project, 
  onClick,
  isSelected = false 
}) => {
  const {
    id,
    name,
    techno,
    role,
    pitch,
    link,
    date,
    type
  } = project;

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
          {technologies.slice(0, 4).map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="tech-tag more">+{technologies.length - 4}</span>
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
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            View Project →
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
