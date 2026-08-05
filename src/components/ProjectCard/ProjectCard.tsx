import React, { useState, useRef, useEffect } from 'react';
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

interface ImageFile {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
}

interface ImageWithCaption {
  id?: number;
  file: ImageFile;
  caption?: string;
}

// ImageZoomModal — displays a zoomed image with pan + zoom controls
const ImageZoomModal: React.FC<{
  image: ImageWithCaption;
  onClose: () => void;
}> = ({ image, onClose }) => {
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const SCALE_STEP = 0.4;

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  const zoomBy = (delta: number) => setScale(prev => clamp(prev + delta));
  const reset = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  // Reset pan when back to 1:1
  useEffect(() => {
    if (scale <= MIN_SCALE) setTranslate({ x: 0, y: 0 });
  }, [scale]);

  // Keyboard: Esc close, +/- zoom, 0 reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === '+' || e.key === '=') zoomBy(SCALE_STEP);
      if (e.key === '-') zoomBy(-SCALE_STEP);
      if (e.key === '0') reset();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Wheel zoom — non-passive so we can preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const portalContainer = document.querySelector('.App');
  if (!portalContainer) return null;

  const pct = Math.round(scale * 100);

  return createPortal(
    <div className="image-zoom-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => zoomBy(-SCALE_STEP)} disabled={scale <= MIN_SCALE}>−</button>
          <span className="zoom-level">{pct}%</span>
          <button className="zoom-btn" onClick={() => zoomBy(SCALE_STEP)} disabled={scale >= MAX_SCALE}>+</button>
          <button className="zoom-btn zoom-reset" onClick={reset} disabled={scale === MIN_SCALE}>↺</button>
        </div>

        <div
          ref={containerRef}
          className="zoom-image-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            src={`${backendUrl}${image.file.data.attributes.url}`}
            alt={image.file.data.attributes.alternativeText || ''}
            className="zoomed-image"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease',
            }}
            draggable={false}
          />
        </div>

        {image.caption && (
          <div
            className="zoom-caption"
            dangerouslySetInnerHTML={{
              __html: marked.parse(image.caption) as string
            }}
          />
        )}
      </div>
    </div>,
    portalContainer
  );
};

// ImageGallery — images displayed in sequence, click to zoom
const ImageGallery: React.FC<{ images: ImageWithCaption[] }> = ({ images }) => {
  const [zoomedImage, setZoomedImage] = useState<ImageWithCaption | null>(null);

  const validImages = images.filter(img => img.file?.data != null);
  if (validImages.length === 0) return null;

  return (
    <>
      <div className="image-gallery">
        {validImages.map((image, index) => (
          <figure key={index} className="gallery-figure">
            <img
              src={`${backendUrl}${image.file.data.attributes.url}`}
              alt={image.file.data.attributes.alternativeText || ''}
              className="gallery-image"
              onClick={() => setZoomedImage(image)}
            />
            {image.caption && (
              <figcaption
                className="gallery-caption"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(image.caption) as string
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

  // This component handles FileSystemNode only
  const fsNode = project as FileSystemNode;
  const { id, name, techno, role, pitch, link, date, type, paragraph, logo } = fsNode;

  // Function to get localized content with a parent context
  const getLocalizedContentWithContext = (content: any, field: string, parentContext?: FileSystemNode) => {
    // First try with the content itself
    let result = getLocalizedContent(content, field);
    if (result && result !== content[field]) {
      return result;
    }

    // If that doesn't work and we have a parent context (for paragraphs)
    if (parentContext && result === content[field]) {
      const parentResult = getLocalizedContent(parentContext, field);
      if (parentResult && parentResult !== content[field]) {
        return parentResult;
      }
    }

    return content[field] || '';
  };

  // Function to parse content based on its type
  const parseContent = (content: any) => {
    if (Array.isArray(content)) {
      // It's a Strapi block
      return <BlocksRenderer content={content} />;
    } else if (typeof content === 'string') {
      // It's raw markdown — parse it to HTML
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
          {paragraph.map((para, index: number) => (
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
              {para.images && para.images.length > 0 && (
                <div className="paragraph-images">
                  <ImageGallery images={para.images} />
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
