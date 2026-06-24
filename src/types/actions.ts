import { Project, WindowState } from './index';

// Types pour les actions Redux
export type MainActionType =
  | { type: 'SET_LABEL'; payload: string }
  | { type: 'TOGGLE_WINDOW' }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'TOGGLE_WINDOW_ITEM' }
  | { type: 'SET_WINDOW_ITEM_ID'; payload: string }
  | { type: 'TOGGLE_IMAGE_ITEM' }
  | { type: 'TOGGLE_SPECS_ITEM' }
  | { type: 'TOGGLE_ALL_ITEMS' }
  | { type: 'TOGGLE_RESUME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_WINDOW'; payload: WindowState }
  | { type: 'CLOSE_WINDOW'; payload: string }
  | { type: 'MINIFY_WINDOW'; payload: string }
  | { type: 'UNMINIFY_WINDOW'; payload: string }
  | { type: 'TOGGLE_EXPANDED_WINDOW'; payload: string }
  | { type: 'SET_VALUE'; value: any };

export interface QuizActionType {
  type: 'SET_CURRENT_QUESTION' | 'SET_SCORE' | 'SET_ANSWERS' | 'SET_COMPLETED' | 'RESET_QUIZ';
  payload?: any;
}
