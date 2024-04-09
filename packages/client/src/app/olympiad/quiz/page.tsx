'use client'
import { useState } from 'react';

const QuizComponent = () => {
    const questionsArray = [
        {
            "question": "What type of framework is Next.js?",
            "answerOptions": [
                { "answer": "Frontend" },
                { "answer": "Backend" },
                { "answer": "FullStack", "isCorrect": true },
                { "answer": "None of the above" }
            ]
        },
        {
            "question": "When was Next.js released?",
            "answerOptions": [
                { "answer": "20 September 2019" },
                { "answer": "14 January 2017" },
                { "answer": "25 October 2016", "isCorrect": true },
                { "answer": "28 March 2018" }
            ]
        },
        {
            "question": "Which CSS Framework are we using?",
            "answerOptions": [
                { "answer": "Bootstrap" },
                { "answer": "TailwindCSS", "isCorrect": true },
                { "answer": "Chakra UI" },
                { "answer": "Bulma CSS" }
            ]
        },
        {
            "question": "Which class in Tailwind is used to set flex direction of column?",
            "answerOptions": [
                { "answer": "col" },
                { "answer": "col-flex" },
                { "answer": "flex-col", "isCorrect": true },
                { "answer": "None of the above" }
            ]
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(Array(questionsArray.length).fill(null));

    const handleAnswerOption = (selectedAnswer) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[currentQuestion] = selectedAnswer;
        setSelectedOptions(updatedSelectedOptions);
    };

    const handleNext = () => {
        if (selectedOptions[currentQuestion] !== null) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert("Please select an option before proceeding.");
        }
    };

    const handlePrevious = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleSubmitButton = () => {
        // Implement your logic to handle submission
        console.log('Quiz submitted!');
    };

    return (
        <div className='border-2 border-red-500 p-2 m-2 mt-20'>
            <div className="flex flex-col justify-center m-auto items-start max-w-[900px] pt-10">
            <div className="quiz-box min-w-full p-2" id="quiz-box">
                <div className="flex align-items-center justify-content-between mb-3 mb-lg-4">
                    <h4 className="mt-10 text-xl text-gray-800 dark:text-white">
                        Question {currentQuestion + 1} of {questionsArray.length}
                    </h4>
                    <p className="label-color-2 fw-600 fs-16 m-0 text-end quiz-timer">
                        <i className="fas fa-alarm-clock label-color-3 me-1"></i>
                        Time left: <span className="d-inline-block" id="timer">28:12</span>
                    </p>
                </div>

                <div className="mt-4 text-2xl text-gray-800 dark:text-white">
                    {questionsArray[currentQuestion].question}
                </div>

                <div className="flex flex-col min-w-full">
                    {questionsArray[currentQuestion].answerOptions.map((answer, index) => (
                        <label key={index} className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-gray-400 hover:border-indigo-600 rounded-xl ${selectedOptions[currentQuestion] === answer.answer && "bg-indigo-400 border-indigo-400"}`}>
                            <input
                                type="radio"
                                name={`question-${currentQuestion}`}
                                value={answer.answer}
                                checked={selectedOptions[currentQuestion] === answer.answer}
                                onChange={() => handleAnswerOption(answer.answer)}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-gray-800 dark:text-white">{answer.answer}</span>
                        </label>
                    ))}
                </div>


                <div className="flex justify-end w-full mt-4 text-white">
                    <button
                        onClick={
                            currentQuestion + 1 === questionsArray.length
                                ? handleSubmitButton
                                : handleNext
                        }
                        className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg ${selectedOptions[currentQuestion] === null && "opacity-50 cursor-not-allowed"}`}
                        disabled={selectedOptions[currentQuestion] === null}
                    >
                        {currentQuestion + 1 === questionsArray.length ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default QuizComponent;
