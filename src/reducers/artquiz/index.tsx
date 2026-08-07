import React, { createContext, useReducer, ReactNode } from 'react';
import { AnyAction } from 'redux';

const initialState = {
  theme: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  currentAnswer: '',
  showResults: false,
  correctAnswersCount: 0,
  timer: 4
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SELECT_THEME': {
      return {
        ...state,
        theme: action.payload
      };
    }

    case 'LOADED_QUESTIONS': {
      return {
        ...state,
        questions: action.payload
      };
    }

    case 'SELECT_ANSWER': {
      const correctAnswersCount =
        action.payload === state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      const timer = 0;
      const updatedQuestions = state.questions.map((q, i) =>
        i === state.currentQuestionIndex
          ? { ...q, rightAnswered: action.payload === q.correctAnswer ? 1 : 0 }
          : q
      );
      return {
        ...state,
        questions: updatedQuestions,
        currentAnswer: action.payload,
        correctAnswersCount,
        timer
      };
    }

    case 'NEXT_QUESTION': {
      const showResults = state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      return {
        ...state,
        showResults,
        currentQuestionIndex,
        currentAnswer: '',
        timer: 4
      };
    }

    case 'DECREASE_TIMER': {
      return {
        ...state,
        timer: action.payload >= 0 ? action.payload : 0
      };
    }

    case 'RESET_QUESTIONS': {
      const updatedQuestions = state.questions.map((q) => {
        const { rightAnswered, ...rest } = q;
        return rest;
      });
      return {
        ...state,
        questions: updatedQuestions,
        correctAnswersCount: 0,
        currentQuestionIndex: 0,
        currentAnswer: '',
        timer: 4,
        showResults: false
      };
    }

    case 'END_QUIZ': {
      return {
        ...state,
        showResults: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export const QuizContext = createContext<any>(undefined);

export const QuizProvider: React.FC<{ children?: ReactNode }> = ({ children = null }) => {
  const value = useReducer(reducer, initialState);
  if (!children) return null;
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
