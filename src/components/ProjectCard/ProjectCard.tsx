import React, { useState } from 'react';
import { marked } from 'marked';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FileSystemNode } from '../../types';
import { backendUrl } from '../../middlewares/env';
import './project-card.scss';

interface ProjectCardProps {
  project: FileSystemNode;
  onClick: (projectId: string) => void;
  isSelected?: boolean;
}

// ImageSlider component
const ImageSlider: React.FC<{ images: any[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) return null;

  return (
    <div className="image-slider">
      <div className="slider-container">
        <img 
          src={`${backendUrl}${images[currentIndex].attributes.url}`} 
          alt={images[currentIndex].attributes.alternativeText || ''} 
          className="slider-image" 
        />
        
        {images.length > 1 && (
          <>
            <button className="slider-button prev" onClick={goToPrevious}>
              ‹
            </button>
            <button className="slider-button next" onClick={goToNext}>
              ›
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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

  // Debug du contenu
  if (pitch) console.log('Pitch content:', pitch);
  if (paragraph) console.log('Paragraph content:', paragraph);

  // Fonction pour parser le contenu selon son type
  const parseContent = (content: any) => {
    if (Array.isArray(content)) {
      // C'est un bloc Strapi
      return <BlocksRenderer content={content} />;
    } else if (typeof content === 'string') {
      // C'est du markdown brut - on le parse en HTML
      const htmlContent = marked(content) as string;
      return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    return null;
  };

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
        <div className="project-description">
          {parseContent(pitch)}
        </div>
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
              {para.Description && (
                <div className="paragraph-description">
                  {parseContent(para.Description)}
                </div>
              )}
              {para.Image && para.Image.data.length > 0 && (
                <div className="paragraph-images">
                  <ImageSlider images={para.Image.data} />
                </div>
               )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProjectCard;
