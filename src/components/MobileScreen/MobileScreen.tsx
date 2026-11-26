import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { marked } from 'marked';
import LogoSvg from '../Logo/LogoSvg';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import ScrambleText from '../ScrambleText/ScrambleText';
import { useTranslation } from '../../contexts/LanguageContext';
import { mediaUrl } from '../../middlewares/env';
import { fetchProjects } from '../../actions/main';
import './mobile-screen.scss';

const CONTACTS = [
  { label: 'LINKEDIN', value: '/in/sandrine-mze', href: 'https://www.linkedin.com/in/sandrinemze/' },
  { label: 'GITHUB',   value: 'github.com/liaWrOte', href: 'https://github.com/liaWrOte' },
];

const MobileProjectCard: React.FC<{ project: any }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const { t, getLocalizedContent } = useTranslation();

  const name = getLocalizedContent(project, 'name') || project.name;
  const role = getLocalizedContent(project, 'role') || project.role;
  const logoUrl = project.logo?.data?.attributes?.url
    ? mediaUrl(project.logo.data.attributes.url)
    : null;
  const technologies: string[] = typeof project.techno === 'string'
    ? project.techno.split(' - ').map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(project.techno) ? project.techno : [];
  const description: string = project.paragraph?.[0]?.Description || '';

  const renderDescription = (text: string) => {
    if (!text) return null;
    return <div dangerouslySetInnerHTML={{ __html: marked.parse(text) as string }} />;
  };

  return (
    <div className={`ms-project${expanded ? ' ms-project--open' : ''}`}>
      <button
        className="ms-project-header"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        type="button"
      >
        {logoUrl
          ? <img src={logoUrl} alt="" aria-hidden="true" className="ms-project-logo" />
          : <span className="ms-project-logo-placeholder" aria-hidden="true" />
        }
        <span className="ms-project-name">{name}</span>
        <span className="ms-project-toggle" aria-hidden="true">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="ms-project-body">
          {project.date && (
            <div className="ms-meta-row">
              <span className="ms-meta-label">{t('date')}</span>
              <span>{project.date}</span>
            </div>
          )}
          {role && (
            <div className="ms-meta-row">
              <span className="ms-meta-label">{t('role')}</span>
              <span>{role}</span>
            </div>
          )}
          {technologies.length > 0 && (
            <div className="ms-meta-row ms-meta-row--wrap">
              <span className="ms-meta-label">{t('technologies')}</span>
              <div className="ms-tech-list">
                {technologies.map((tech: string, i: number) => (
                  <span key={i} className="ms-tech-item">{tech}</span>
                ))}
              </div>
            </div>
          )}
          {description && <div className="ms-project-pitch">{renderDescription(description)}</div>}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-project-link"
            >
              <ScrambleText text={t('see_project')} />
              <span aria-hidden="true"> ›</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const MobileScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileSystem = useSelector((state: any) => state.main.fileSystem);

  useEffect(() => {
    if (!fileSystem) dispatch(fetchProjects() as any);
  }, []);

  const getCategoryLabel = (cat: any): string => {
    const key = `folder_${cat.name.toLowerCase().replace(/\s+/g, '_')}`;
    const translated = t(key);
    return translated !== key ? translated : cat.name;
  };

  const parseStartYear = (date: string): number => {
    if (!date) return 0;
    const match = date.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const isOngoing = (date: string): boolean =>
    /aujourd'hui|today|présent|present/i.test(date || '');

  const categories = (fileSystem?.children || []).filter((c: any) => c.type === 'folder').map((cat: any) => ({
    ...cat,
    children: [...(cat.children || [])].sort((a: any, b: any) => {
      const yearDiff = parseStartYear(b.date) - parseStartYear(a.date);
      if (yearDiff !== 0) return yearDiff;
      return (isOngoing(b.date) ? 1 : 0) - (isOngoing(a.date) ? 1 : 0);
    }),
  }));

  return (
    <div className="mobile-screen">
      <header className="ms-header">
        <LogoSvg className="ms-logo" />
        <div className="ms-identity">
          <p className="ms-name">SANDRINE M'ZE</p>
          <ScrambleText text={t('developer')} tag="p" className="ms-role" />
        </div>
        <LanguageSwitch />
      </header>

      {/* Projects */}
      <section className="ms-section" aria-label={t('projects')}>
        <p className="ms-prompt">C:\PORTFOLIO\{t('projects').toUpperCase()}&gt;</p>

        {!fileSystem ? (
          <div className="ms-loading" aria-label="Chargement">
            <span className="ms-cursor" aria-hidden="true">█</span>
            <span> LOADING...</span>
          </div>
        ) : (
          categories.map((cat: any) => (
            <div key={cat.id} className="ms-category">
              <h2 className="ms-category-title">{getCategoryLabel(cat)}</h2>
              {(cat.children || []).map((project: any) => (
                <MobileProjectCard key={project.id} project={project} />
              ))}
            </div>
          ))
        )}
      </section>

      {/* Contact */}
      <section className="ms-section" aria-label={t('contact')}>
        <p className="ms-prompt">C:\PORTFOLIO\{t('contact').toUpperCase()}&gt;</p>
        <div className="ms-contact-block">
          <ul className="ms-contacts">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="ms-contact-link">
                  <span className="ms-contact-label">{c.label}</span>
                  <span className="ms-contact-sep">›</span>
                  <span className="ms-contact-value">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="ms-available">
            <span className="ms-pulse" aria-hidden="true" />
            <ScrambleText text={t('contact_available')} />
          </p>
        </div>
      </section>

      <footer className="ms-footer">
        <ScrambleText
          text={`© ${new Date().getFullYear()} SANDRINE M'ZE — ${t('contact_rights')}`}
          tag="p"
          className="ms-copyright"
        />
      </footer>
    </div>
  );
};

export default MobileScreen;
