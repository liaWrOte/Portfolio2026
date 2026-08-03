import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { marked } from 'marked';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FileSystemNode } from '../../types';
import { backendUrl } from '../../middlewares/env';
import { useTranslation } from '../../contexts/LanguageContext';
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
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

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
          <div
            className="zoom-caption"
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

// ImageGallery component
const ImageGallery: React.FC<{ images: any[] }> = ({ images }) => {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="image-gallery">
        {images.map((image, index) => (
          <figure key={index} className="gallery-figure">
            <img
              src={`${backendUrl}${image.attributes.url}`}
              alt={image.attributes.alternativeText || ''}
              className="gallery-image"
              onClick={() => setZoomIndex(index)}
            />
            {image.attributes.caption && (
              <figcaption
                className="gallery-caption"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(image.attributes.caption) as string
                }}
              />
            )}
          </figure>
        ))}
      </div>

      {zoomIndex !== null && (
        <ImageZoomModal
          isOpen={true}
          onClose={() => setZoomIndex(null)}
          images={images}
          currentIndex={zoomIndex}
          onIndexChange={setZoomIndex}
        />
      )}
    </>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isSelected = false }) => {
  const { t, getLocalizedContent, getLocalizedParagraph } = useTranslation();

  // Le composant ne gère que les FileSystemNode
  const fsNode = project as FileSystemNode;
  const { id, name, techno, role, pitch, link, date, type, paragraph } = fsNode;

  // Fonction pour obtenir le contenu localisé avec contexte parent
  const getLocalizedContentWithContext = (content: any, field: string, parentContext?: any) => {
    // D'abord essayer avec le contenu lui-même
    let result = getLocalizedContent(content, field);
    if (result && result !== content[field]) {
      return result;
    }

    // Si ça ne marche pas et qu'on a un contexte parent (pour les paragraphes)
    if (parentContext && result === content[field]) {
      const parentResult = getLocalizedContent(parentContext, field);
      if (parentResult && parentResult !== content[field]) {
        return parentResult;
      }
    }

    return content[field] || '';
  };

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
  const technologies = Array.isArray(techno) ? techno : typeof techno === 'string' ? [techno] : [];

  return (
    <div className={`project-card ${isSelected ? 'selected' : ''}`} onClick={() => onClick(id)}>
      <div className="project-header-card">
        {/* Project link button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
            onClick={(e) => e.stopPropagation()}
          >
            {t('see_project')}
          </a>
        )}

        {/* Project title */}
        <h1 className="project-title">{getLocalizedContent(fsNode, 'name')}</h1>

        {/* Project description */}
        {pitch && (
          <div className="project-description">
            {parseContent(getLocalizedContent(fsNode, 'pitch'))}
          </div>
        )}

        {/* Project info block */}
        <div className="project-info-block">
          {date && (
            <div className="info-item">
              <span className="info-label">{t('date')} </span>
              <span className="info-value">{date}</span>
            </div>
          )}

          {role && (
            <div className="info-item">
              <span className="info-label">{t('role')}</span>
              <span className="info-value">{getLocalizedContent(fsNode, 'role')}</span>
            </div>
          )}

          {technologies && technologies.length > 0 && (
            <div className="info-item">
              <span className="info-label">{t('technologies')}</span>
              <div className="techno-list">
                {(technologies as string[]).map((tech: string, index: number) => (
                  <span key={index} className="techno-item">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Paragraphs */}
      {paragraph && paragraph.length > 0 && (
        <div className="project-paragraphs">
          {paragraph.map((para: any, index: number) => {
            console.log(`🔍 Paragraph ${index}:`, para);
            console.log(`🔍 Paragraph ${index} localizations:`, para.localizations);
            return (
              <div key={index} className="paragraph-item">
                {para.Title && (
                  <h2 className="paragraph-title">
                    {getLocalizedParagraph(para, 'Title', fsNode)}
                  </h2>
                )}
                {para.Description && (
                  <div className="paragraph-description">
                    {parseContent(getLocalizedParagraph(para, 'Description', fsNode))}
                  </div>
                )}
                {para.Image && para.Image.data.length > 0 && (
                  <div className="paragraph-images">
                    <ImageGallery images={para.Image.data} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
