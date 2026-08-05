// Main application interfaces

export interface Localizations {
  [key: string]: {
    id: string;
    attributes: ProjectAttributes;
  };
}

export interface ProjectAttributes {
  title: string;
  type: string;
  techno: string;
  role: string;
  pitch: string;
  link: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo?: { data?: { attributes?: { url: string; alternativeText?: string } } };
  localizations?: {
    data: Array<{
      id: string;
      attributes: ProjectAttributes;
    }>;
  };
  paragraph?: Array<{
    Title?: string;
    Description?: string;
    Image?: any[];
    locale?: string;
    localizations?: {
      data: Array<{
        id: string;
        attributes: {
          Title?: string;
          Description?: string;
          locale: string;
        };
      }>;
    };
  }>;
}

export interface Project {
  id: string;
  attributes: ProjectAttributes;
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'project';
  children?: FileSystemNode[];
  path?: string;
  content?: any;
  category?: string;
  techno?: string;
  role?: string;
  pitch?: string;
  link?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  logo?: { data?: { attributes?: { url: string; alternativeText?: string } } };
  paragraph?: Array<{
    Title?: string;
    Description?: string;
    Image?: any[];
    locale?: string;
    localizations?: {
      data: Array<{
        id: string;
        attributes: {
          Title?: string;
          Description?: string;
          locale: string;
        };
      }>;
    };
  }>;
  // Strapi i18n fields
  locale?: string;
  localizations?: {
    data: Array<{
      id: string;
      attributes: {
        title?: string;
        pitch?: string;
        role?: string;
        techno?: string;
        locale: string;
        paragraph?: Array<{
          Title?: string;
          Description?: string;
          Image?: any[];
        }>;
      };
    }>;
  };
}

export interface WindowState {
  id: string;
  label: string;
  isMinimized: boolean;
  isExpanded: boolean;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface MainState {
  label: string;
  displayWindow: boolean;
  allProjects: Project[];
  displayWindowItem: boolean;
  windowItemId: string;
  displayImageItem: boolean;
  displaySpecsItem: boolean;
  displayAllItems: boolean;
  displayResume: boolean;
  minimizedWindows: string[];
  openWindows: WindowState[];
  loading: boolean;
  fileSystem?: FileSystemNode;
  fileSystemEn?: FileSystemNode;
  language?: 'fr' | 'en';
  currentPath?: string[];
  navigation?: {
    currentPath: string[];
    history: string[];
    historyIndex: number;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  image?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  isCompleted: boolean;
  questions: QuizQuestion[];
}
