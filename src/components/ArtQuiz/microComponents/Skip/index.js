import React from 'react';
import { useContext } from "react";
import { QuizContext } from "../../../../reducers/artquiz";

import './index.scss';

const Skip = () => {

    const [quizState, dispatch] = useContext(QuizContext);
    return (
        <span className="skip" onClick={() => dispatch({type: 'NEXT_QUESTION'})}>Passer</span>
    )
}

export default Skip