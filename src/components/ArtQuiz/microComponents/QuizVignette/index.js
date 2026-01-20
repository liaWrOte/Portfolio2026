import React from 'react';
import { useContext } from "react";
import { QuizContext } from "../../../../reducers/artquiz";

import './index.scss';

const QuizVignette = ({answers, themeText}) => {
    return (
        <div 
            className='block'>
                <img src={answers[0].image_link} alt="" />
                <span class="quiz-vignette-label">{themeText}</span>
        </div>
    )
}

export default QuizVignette;