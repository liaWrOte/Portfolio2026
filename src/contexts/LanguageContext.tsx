import React, { createContext, useContext, useState, ReactNode } from 'react';
export type Language = 'fr' | 'en';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalizedContent: (content: any, field: string) => string;
  getLocalizedParagraph: (paragraph: any, field: string, projectContext: any) => string;
}
const translations = {
  fr: {
    see_project: 'Voir le projet',
    date: 'Date :',
    role: 'Role:',
    technologies: 'Technologies:',
    developer: 'Développeuse front-end WordPress | React créative',
    projects: 'Projets',
    resume: 'resume.pdf',
    contact: 'contact.me',
    artquiz: 'Artquiz',
    stolify: 'Stolify',
    // Noms de dossiers pour breadcrumb
    folder_projets: 'Projets',
    folder_websites: 'Sites web',
    folder_apps: 'Applications',
    folder_games: 'Jeux',
    folder_other: 'Autres'
  },
  en: {
    see_project: 'See project',
    date: 'Date:',
    role: 'Role:',
    technologies: 'Technologies:',
    developer: 'Front-end WordPress | React creative developer',
    projects: 'Projects',
    resume: 'resume.pdf',
    contact: 'contact.me',
    artquiz: 'Artquiz',
    stolify: 'Stolify',
    // Folder names for breadcrumb
    folder_projets: 'Projects',
    folder_websites: 'Websites',
    folder_apps: 'Applications',
    folder_games: 'Games',
    folder_other: 'Other'
  }
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };
  const getLocalizedContent = (content: any, field: string): string => {
    if (!content) return '';
    // Pour les objets avec localizations Strapi
    if (typeof content === 'object' && content !== null) {
      if (content.localizations && content.localizations.data) {
        const currentLocale = language;
        // Si on est en anglais et qu'il y a des localizations
        if (currentLocale === 'en' && content.localizations.data.length > 0) {
          const englishVersion = content.localizations.data.find(
            (loc: any) => loc.attributes.locale === 'en'
          );
          if (englishVersion && englishVersion.attributes[field]) {
            console.log(`✅ Translated ${field}:`, englishVersion.attributes[field]);
            return englishVersion.attributes[field];
          }
          // Si c'est le champ 'name' et qu'il n'existe pas, essayer 'title'
          if (field === 'name' && englishVersion && englishVersion.attributes.title) {
            console.log(`✅ Translated name (using title):`, englishVersion.attributes.title);
            return englishVersion.attributes.title;
          }
        }
      }
      // Retourner la version française par défaut
      return content[field] || '';
    }
    // Pour les chaînes de caractères simples
    if (typeof content === 'string') {
      return content;
    }
    return '';
  };
  // Fonction pour obtenir le contenu localisé des paragraphes depuis le projet parent
  const getLocalizedParagraph = (paragraph: any, field: string, projectContext: any): string => {
    if (!paragraph || !projectContext) return paragraph[field] || '';
    const currentLocale = language;
    if (currentLocale !== 'en') return paragraph[field] || '';
    // Chercher dans les localizations du projet parent
    if (projectContext.localizations && projectContext.localizations.data) {
      const englishVersion = projectContext.localizations.data.find(
        (loc: any) => loc.attributes.locale === 'en'
      );
      if (englishVersion && englishVersion.attributes.paragraph) {
        // Chercher le paragraphe correspondant par ID
        const englishParagraph = englishVersion.attributes.paragraph.find(
          (p: any) => p.id === paragraph.id
        );
        if (englishParagraph && englishParagraph[field]) {
          console.log(`✅ Translated paragraph ${field}:`, englishParagraph[field]);
          return englishParagraph[field];
        }
      }
    }
    return paragraph[field] || '';
  };
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, getLocalizedContent, getLocalizedParagraph }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
