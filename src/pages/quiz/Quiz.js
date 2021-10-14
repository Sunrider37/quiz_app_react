import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import './Quiz.css'
import Question from '../../components/questions/Question'

const Quiz = ({name,score, questions, setQuestions, setScore }) => {

    const [options, setOptions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState(0)
 
    useEffect(() => {
        setOptions(
          questions &&
            handleShuffle([
              questions[currentQuestion]?.correct_answer,
              ...questions[currentQuestion]?.incorrect_answers,
            ])
        );
      }, [currentQuestion, questions]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
      };
   
    return (
        <div className="quiz" >
          <span className="subtitle" >
                Welcome, {name}
          </span>

          {questions? (
                <>
                <div className="quizInfo">
                    <span>{questions[currentQuestion]?.category}</span>
                    <span>Score : {score}</span>
                </div>

                <Question
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                questions={questions}
                options={options}
                correct={questions[currentQuestion]?.correct_answer}
                score={score}
                setScore={setScore}
                />
                 </>
          ) : (
              <CircularProgress style={{margin: 100}} size={150} color='inherit' thickness={1} />
          )}
        </div>
    )
}

export default Quiz
