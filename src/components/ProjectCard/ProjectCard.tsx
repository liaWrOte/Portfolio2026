import React from 'react';
import { FileSystemNode } from '../../types';
import './project-card.scss';

interface ProjectCardProps {
  project: FileSystemNode;
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
  
  // Le composant ne gère que les FileSystemNode
  const fsNode = project as FileSystemNode;
  const {
    id,
    name,
    techno,
    role,
    pitch,
    link,
    date,
    type,
    paragraph
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
      <h1 className="project-title">{name}</h1>

      {/* Project description */}
      {pitch && (
        <p className="project-description">{pitch}</p>
      )}

      {/* Project info block */}
      <div className="project-info-block">
        {date && (
          <div className="info-item">
            <span className="info-label">Date:</span>
            <span className="info-value">{date}</span>
          </div>
        )}
        
        {role && (
          <div className="info-item">
            <span className="info-label">Role:</span>
            <span className="info-value">{role}</span>
          </div>
        )}
        
        {technologies && technologies.length > 0 && (
          <div className="info-item">
            <span className="info-label">Technologies:</span>
            <div className="techno-list">
              {(technologies as string[]).map((tech: string, index: number) => (
                <span key={index} className="techno-item">{tech}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paragraphs */}
      {paragraph && paragraph.length > 0 && (
        <div className="project-paragraphs">
          {paragraph.map((para: any, index: number) => (
            <div key={index} className="paragraph-item">
              {para.Title && <h4 className="paragraph-title">{para.Title}</h4>}
              {para.Description && <p className="paragraph-description">{para.Description}</p>}
              {para.Image && para.Image.length > 0 && (
                <div className="paragraph-images">
                  {para.Image.map((img: any, imgIndex: number) => (
                    <img key={imgIndex} src={img.url} alt={img.alt || ''} className="paragraph-image" />
                  ))}
                </div>
              )}
            </div>
          ))}
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
