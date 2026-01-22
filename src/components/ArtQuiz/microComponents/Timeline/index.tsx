import React, { useContext } from "react";
import { QuizContext } from "../../../../reducers/artquiz";

import './index.scss';

const Timeline = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    
    if ( quizState.questions.length > 0) {
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        const timelineClass = quizState.currentQuestionIndex;

        return (
            <>
                <div className="timeline">
                { quizState.questions.map(( answer, index ) => (
                    <span 
                        index={index}
                        className={index <= quizState.currentQuestionIndex ? 'active' : ''}
                        >
                    </span>
                ))}
                </div>
                <span className="timeline-text">{ quizState.currentQuestionIndex + 1 }/{ quizState.questions.length }</span>
            </>
        )
    }
}
export default Timeline;