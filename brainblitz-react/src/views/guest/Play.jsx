import React, { useEffect, useState } from 'react';
import AxiosClient from '../../AxiosClient';
import Confetti from 'react-confetti'

export default function Play() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [nextButton, setNextButton] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [checkScore, setCheckScore] = useState(false);
    const [clickCheckBtn, setClickCheckBtn] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);


    useEffect(() => {
        const getQuizzes = () => {
            setLoading(true);
            AxiosClient.get('/play')
                .then(({ data }) => {
                    setLoading(false);
                    setQuizzes(data.quizzes);
                })
                .catch(err => {
                    setLoading(false);
                    if (err.response.status === 404) {
                        console.log('404 error');
                    }
                    if (err.response.status === 402) {
                        console.log('402 error');
                    }
                });
        };
        getQuizzes();
    }, []);

    useEffect(() => {
        // Reset timer when the current quiz changes
        setTimer(10);
        if (currentQuizIndex < quizzes.length) {
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 1) {
                        clearInterval(interval);
                        nextQuiz(); 
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentQuizIndex, quizzes.length]);

    const nextQuiz = () => {
        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);   
        }
        if (currentQuizIndex == quizzes.length -1) {
            setNextButton(false); 
            setCheckScore(true); 
        } 
        setNextButton(false);
        setCorrectAnswer(false);
    };

    const checkBtn = () => {
        setClickCheckBtn(true);
        setShowConfetti(true);
    }

    const clickOption = (quiz, option) => {
        
        if (quiz.answer === option) {
            setNextButton(true);
            setCorrectAnswer(true);
            setScore(prevScore => prevScore + 1);
        } else {
            setNextButton(true);
            setCorrectAnswer(true);
            setWrongAnswer(option);
        }

        if (currentQuizIndex == quizzes.length -1) {
            setNextButton(false); 
            setCheckScore(true); 
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quizzes.length) {
        return <div>No quizzes available</div>;
    }

    const currentQuiz = quizzes[currentQuizIndex];

    const playAgain = (e) => {
        window.location.reload();
    }

    return (

        <div className='container d-flex justify-content-center mt-5'>
            
                    {showConfetti && clickCheckBtn  ?
                    <>
                    <Confetti height={900} numberOfPieces={300} width={1840}/> 
                    <div style={{ height: '700px' }} className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-10 score-box">
                            <div className="card p-4 bg-danger">
                        {score && 
                        <>
                            <div className='text-center fw-bold mb-3'>
                               Your Score is  {score} / 10 !
                            </div>
                            <button onClick={playAgain} className='btn-gradient'>Play Again</button>
                            </>
                        }
                        </div>
                        </div>
                    </div>
                    </>
                    : 

            <div className="row d-flex justify-content-center">
                <div className="col-lg-10 p-3 quiz-box">
                    <div className=''>
                        <div className='welcome d-flex mb-5'>
                            <div className='mr-auto'>
                           Quiz {currentQuizIndex + 1} / 10
                           </div>
                           <div>
                           <i className="fa-solid fa-stopwatch"></i>  {timer}s
                           </div>
                        </div>
                        
                        <div className='text-center welcome mb-4'>
                            {currentQuiz.title}
                        </div>
                        {correctAnswer ?
                            <div className="d-flex flex-column">
                                <button disabled className={currentQuiz.answer === currentQuiz.option1 ? 'btn-correct' : wrongAnswer === currentQuiz.option1 ? 'btn-wrong' : 'btn-option'}>{currentQuiz.option1}</button>
                                <button disabled className={currentQuiz.answer === currentQuiz.option2 ? 'btn-correct' : wrongAnswer === currentQuiz.option2 ? 'btn-wrong' : 'btn-option'}>{currentQuiz.option2}</button>
                                <button disabled className={currentQuiz.answer === currentQuiz.option3 ? 'btn-correct' : wrongAnswer === currentQuiz.option3 ? 'btn-wrong' : 'btn-option'}>{currentQuiz.option3}</button>
                                <button disabled className={currentQuiz.answer === currentQuiz.option4 ? 'btn-correct' : wrongAnswer === currentQuiz.option4 ? 'btn-wrong' : 'btn-option'}>{currentQuiz.option4}</button>
                            </div> : 
                            <div className="d-flex flex-column">
                            <button onClick={() => clickOption(currentQuiz, currentQuiz.option1)} className='btn-option'>{currentQuiz.option1}</button>
                            <button onClick={() => clickOption(currentQuiz, currentQuiz.option2)} className='btn-option'>{currentQuiz.option2}</button>
                            <button onClick={() => clickOption(currentQuiz, currentQuiz.option3)} className='btn-option'>{currentQuiz.option3}</button>
                            <button onClick={() => clickOption(currentQuiz, currentQuiz.option4)} className='btn-option'>{currentQuiz.option4}</button>
                        </div>
                        }
                        {nextButton &&
                            <div className='d-flex justify-content-between mt-3'>
                                <div></div>
                                <button onClick={nextQuiz} className='btn-gradient'>Next Quiz -- </button>
                            </div>
                        }
                        {
                            checkScore && 
                            <div className='d-flex justify-content-between mt-3'>
                                <div></div>
                                <button onClick={checkBtn} className='btn-gradient'> Check Score </button>
                            </div>
                        }
                    </div>
                </div>
            </div> }
        </div>
    );
}

