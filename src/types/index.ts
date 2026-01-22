// Interfaces principales pour l'application

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
