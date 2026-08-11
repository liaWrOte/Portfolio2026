import React, { createContext, useContext, useState, ReactNode } from 'react';
import store from '../store';
import { setLanguage as setLanguageAction } from '../actions/main';
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
    developer: 'DÉVELOPPEUSE WEB & CREATIVE',
    projects: 'Projets',
    resume: 'cv.pdf',
    contact: 'contact.me',
    artquiz: 'Artquiz',
    stolify: 'Stolify',
    // Folder names for breadcrumb
    folder_projets: 'Projets',
    folder_websites: 'Sites web',
    folder_apps: 'Applications',
    folder_games: 'Jeux',
    folder_other: 'Autres',
    folder_développement: 'Développement',
    folder_brand_design: 'Brand Design',
    under_construction: 'En construction',
    contact_available: 'À LA RECHERCHE DE NOUVEAUX DÉFIS',
    contact_rights: 'TOUS DROITS RÉSERVÉS',
    mobile_notice: "L'expérience complète est conçue pour ordinateur.",
    // ArtQuiz
    quiz_result_good: 'Bravo !',
    quiz_result_try: 'Presque ! Réessaie',
    quiz_play_again: 'Rejouer !',
    quiz_ready: 'Prêt à jouer ?',
    quiz_choose_theme: 'Choisissez votre thème',
    quiz_skip: 'Passer',
    quiz_next: 'Question suivante',
    quiz_end: 'Terminer le quiz',
    theme_impressionists: 'Impressionnistes',
    theme_graffiti: 'Graffiti',
    theme_subversive_art: 'Art subversif',
    theme_masterpieces: "Chefs-d'œuvre",
    quiz_hi: '👋 Salut ArtLover',
    quiz_level: 'Niveau 1',
    quiz_timer_correct: 'Bien joué !',
    quiz_timer_timeout: 'Zut, ça sera pour la prochaine !',
  },
  en: {
    see_project: 'See project',
    date: 'Date:',
    role: 'Role:',
    technologies: 'Technologies:',
    developer: 'WEB & CREATIVE DEVELOPER',
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
    folder_other: 'Other',
    folder_développement: 'Development',
    folder_brand_design: 'Brand Design',
    under_construction: 'Under construction',
    contact_available: 'OPEN TO NEW OPPORTUNITIES',
    contact_rights: 'ALL RIGHTS RESERVED',
    mobile_notice: 'The full experience is designed for desktop.',
    // ArtQuiz
    quiz_result_good: 'Good job!',
    quiz_result_try: 'Almost! Try again',
    quiz_play_again: 'Play again!',
    quiz_ready: 'Ready to play?',
    quiz_choose_theme: 'Choose your theme',
    quiz_skip: 'Skip',
    quiz_next: 'Next question',
    quiz_end: 'End quiz',
    theme_impressionists: 'Impressionists',
    theme_graffiti: 'Graffiti',
    theme_subversive_art: 'Subversive Art',
    theme_masterpieces: 'Masterpieces',
    quiz_hi: '👋 Hi ArtLover',
    quiz_level: 'Level 1',
    quiz_timer_correct: 'Well done!',
    quiz_timer_timeout: 'Better luck next time!',
  }
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLang] = useState<Language>('fr');

  const setLanguage = (lang: Language) => {
    setLang(lang);
    store.dispatch(setLanguageAction(lang));
  };
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };
  const getLocalizedContent = (content: any, field: string): string => {
    if (!content) return '';
    // For objects with Strapi localizations
    if (typeof content === 'object' && content !== null) {
      if (content.localizations && content.localizations.data) {
        const currentLocale = language;
        // If in English and there are localizations
        if (currentLocale === 'en' && content.localizations.data.length > 0) {
          const englishVersion = content.localizations.data.find(
            (loc: any) => loc.attributes.locale === 'en'
          );
          if (englishVersion && englishVersion.attributes[field]) {
            console.log(`✅ Translated ${field}:`, englishVersion.attributes[field]);
            return englishVersion.attributes[field];
          }
          // If the field is 'name' and it doesn't exist, try 'title'
          if (field === 'name' && englishVersion && englishVersion.attributes.title) {
            console.log(`✅ Translated name (using title):`, englishVersion.attributes.title);
            return englishVersion.attributes.title;
          }
        }
      }
      // Return the default French version
      return content[field] || '';
    }
    // For simple strings
    if (typeof content === 'string') {
      return content;
    }
    return '';
  };
  // Function to get localized paragraph content from the parent project
  const getLocalizedParagraph = (paragraph: any, field: string, projectContext: any): string => {
    if (!paragraph || !projectContext) return paragraph[field] || '';
    const currentLocale = language;
    if (currentLocale !== 'en') return paragraph[field] || '';
    // Search in the parent project's localizations
    if (projectContext.localizations && projectContext.localizations.data) {
      const englishVersion = projectContext.localizations.data.find(
        (loc: any) => loc.attributes.locale === 'en'
      );
      if (englishVersion && englishVersion.attributes.paragraph) {
        // Find the matching paragraph by ID
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
