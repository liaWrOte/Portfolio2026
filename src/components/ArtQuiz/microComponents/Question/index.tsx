import React from 'react';
import { useContext } from "react";
import { QuizContext } from "../../../../reducers/artquiz";

import './index.scss';

const Question = () => {
    const [quizState] = useContext(QuizContext);
    if (quizState.questions.length > 0) {
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        const imageSrc = currentQuestion.image_link;
        if (quizState.questions.length > 0) {
            return (
                <>
                    <img className="question-image" src={imageSrc} alt=""/>
                    <p>{ currentQuestion.question }</p>
                </>
    
            )
        }
    }
}

export default Question;