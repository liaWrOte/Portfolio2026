import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { marked } from 'marked';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FileSystemNode } from '../../types';
import { backendUrl } from '../../middlewares/env';
import { useTranslation } from '../../contexts/LanguageContext';
import ScrambleText from '../ScrambleText/ScrambleText';
import './project-card.scss';

interface ProjectCardProps {
  project: FileSystemNode;
  onClick: (projectId: string) => void;
  isSelected?: boolean;
}

// ImageZoomModal — affiche une seule image zoomée, sans navigation
const ImageZoomModal: React.FC<{
  image: any;
  onClose: () => void;
}> = ({ image, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const portalContainer = document.querySelector('.App');
  if (!portalContainer) return null;

  return createPortal(
    <div className="image-zoom-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <img
          src={`${backendUrl}${image.attributes.url}`}
          alt={image.attributes.alternativeText || ''}
          className="zoomed-image"
        />
        {image.attributes.caption && (
          <div
            className="zoom-caption"
            dangerouslySetInnerHTML={{
              __html: marked.parse(image.attributes.caption) as string
            }}
          />
        )}
      </div>
    </div>,
    portalContainer
  );
};

// ImageGallery — images affichées en séquence, clic pour zoomer
const ImageGallery: React.FC<{ images: any[] }> = ({ images }) => {
  const [zoomedImage, setZoomedImage] = useState<any | null>(null);

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
              onClick={() => setZoomedImage(image)}
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
      {zoomedImage && (
        <ImageZoomModal image={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isSelected = false }) => {
  const { t, getLocalizedContent, getLocalizedParagraph } = useTranslation();

  // Le composant ne gère que les FileSystemNode
  const fsNode = project as FileSystemNode;
  const { id, name, techno, role, pitch, link, date, type, paragraph, logo } = fsNode;

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
            <ScrambleText text={t('see_project')} />
          </a>
        )}

        {/* Project title */}
        <ScrambleText text={getLocalizedContent(fsNode, 'name')} tag="h1" className="project-title" />

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
              <ScrambleText text={t('date')} className="info-label" />
              <span className="info-value">{date}</span>
            </div>
          )}

          {role && (
            <div className="info-item">
              <ScrambleText text={t('role')} className="info-label" />
              <ScrambleText text={getLocalizedContent(fsNode, 'role')} className="info-value" />
            </div>
          )}

          {technologies && technologies.length > 0 && (
            <div className="info-item">
              <ScrambleText text={t('technologies')} className="info-label" />
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
                    <ScrambleText text={getLocalizedParagraph(para, 'Title', fsNode)} />
                  </h2>
                )}
                {para.Description && (
                  <div className="paragraph-description">
                    {parseContent(getLocalizedParagraph(para, 'Description', fsNode))}
                  </div>
                )}
                {para.Image && para.Image.data && para.Image.data.length > 0 && (
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
