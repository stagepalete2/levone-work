import { useEffect, useState } from "react";

import { checkResult } from "../api/apiMethods";

const Question = ({props}) => {
    const { errors, setErrors, setStartTest, test, telegramUserId, results, setResults } = props;
     
    const [userAnswers, setUserAnswers] = useState({
        telegram_user_id: telegramUserId,
        test_id: test?.id,
        answers: [] 
    })

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors('');
                setStartTest(false)
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleAnswer = async (questionId, optionId) => {
        const newAnswers = [
            ...userAnswers.answers,
            { question_id: questionId, option_id: optionId }
        ];

        setUserAnswers((prev) => ({
            ...prev,
            answers: newAnswers
        }));

        const isLastQuestion = test?.questions?.length - 1 === currentQuestionIndex;
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);

        if (isLastQuestion) {
            try {
                const response = await checkResult({
                    ...userAnswers,
                    answers: newAnswers
                });
                if (response) {
                    setResults(response);
                } else {
                    setErrors("Произошла ошибка при получении результата");
                }
            } catch (error) {
                setErrors(error.response?.data?.error || "Ошибка соединения");
            }
        }
    };



    return (
        <div className="d-flex flex-row justify-content-center" style={{ width: '100%', minHeight: '100vh', padding: '1rem' }}>
            {errors ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '700px' }}>
                    <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
                    <div className="card" id="test-card">
                        <div className="error-text animate__animated animate__shakeX mt-3 text-danger">
                            {errors}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '700px' }}>
                    <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
                    <div className="card" id="test-card">
                        <h2 id="test-title">Тест</h2>
                        <div className="question" id="question-text">{test.questions[currentQuestionIndex]?.question}</div>
                        <div className="button-group d-flex flex-column" id="answer-buttons">
                            {test.questions[currentQuestionIndex]?.options.map(option => (
                                <button key={option.id} className="ans-button m-2" onClick={() => handleAnswer(test.questions[currentQuestionIndex].id ,option.id)}>
                                    {option.option}
                                </button>
                            ))}
                        </div>
                        <div id="result"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;
