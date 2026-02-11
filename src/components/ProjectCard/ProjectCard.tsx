import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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

// ImageZoomModal component
const ImageZoomModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  images: any[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}> = ({ isOpen, onClose, images, currentIndex, onIndexChange }) => {
  if (!isOpen) return null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onIndexChange(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(newIndex);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      onIndexChange(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      onIndexChange(newIndex);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [isOpen, currentIndex]);

  const currentImage = images[currentIndex];

  const portalContainer = document.querySelector('.App');
  
  if (!portalContainer) {
    return null;
  }

  return createPortal(
    <div className="image-zoom-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button className="zoom-nav-button prev" onClick={goToPrevious}>
              ‹
            </button>
            <button className="zoom-nav-button next" onClick={goToNext}>
              ›
            </button>
          </>
        )}
        
        <img 
          src={`${backendUrl}${currentImage.attributes.url}`} 
          alt={currentImage.attributes.alternativeText || ''} 
          className="zoomed-image"
        />
        {currentImage.attributes.caption && (
          <div className="zoom-caption"
            dangerouslySetInnerHTML={{ 
              __html: marked.parse(currentImage.attributes.caption) as string
            }}
          />
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="zoom-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>,
    portalContainer
  );
};

// ImageSlider component
const ImageSlider: React.FC<{ images: any[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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

  const openZoom = () => {
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <>
      <div className="image-slider">
        <div className="slider-container">
          <img 
            src={`${backendUrl}${currentImage.attributes.url}`} 
            alt={currentImage.attributes.alternativeText || ''} 
            className="slider-image" 
            onClick={openZoom}
            style={{ cursor: 'pointer' }}
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
        
        {/* Caption block */}
        {currentImage.attributes.caption && (
          <div className="slider-caption"
            dangerouslySetInnerHTML={{ 
              __html: marked.parse(currentImage.attributes.caption) as string
            }}
          />
        )}
        
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

      {/* Zoom Modal */}
      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={closeZoom}
        images={images}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </>
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
      const htmlContent = marked.parse(content) as string;
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
      {/* Project link button */}
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link-button"
          onClick={(e) => e.stopPropagation()}
        >
          Voir le projet
        </a>
      )}

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
            <span className="info-label">Date : </span>
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
              {para.Title && <h2 className="paragraph-title">{para.Title}</h2>}
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
