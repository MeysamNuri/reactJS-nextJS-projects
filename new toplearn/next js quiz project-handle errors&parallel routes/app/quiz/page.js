"use client";
import { useState, useEffect, Suspense } from "react";
import { quiz } from "../data";
import Loading from "./loading";

export default function Page() {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { questions } = quiz;
    // const { answers, correctAnswer } = questions[activeQuestion];

    useEffect(() => {
        setAnswers(questions[activeQuestion].answers)
        setCorrectAnswer(questions[activeQuestion].correctAnswer)

    }, [result])

  
    const timeDalay = async () => {
        let dalay = 1 + Math.floor(Math.random() * 5)
        console.log(dalay,"dalay");
        await timeOut(dalay * 1000)
    }
    const timeOut = (dalay) => {
        return new Promise(time => setTimeout(time, dalay))
    }
    // Select And Check
    const onAnswerSelected = (answer, index) => {
        setChecked(true);
        setSelectedAnswerIndex(index);

        if (answer === correctAnswer) {
            setSelectedAnswer(true);
            console.log("True answer");
        } else {
            setSelectedAnswer(false);
            console.log("False answer");
        }
    };

    // Calculate score and increment to next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        );

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
            setAnswers([])
            setCorrectAnswer("")
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }

        setChecked(false);
    };
// throw new Error()
    return (
        <>
            <h1>صفحه آزمون</h1>
            <div>
                {!showResult ? (
                    <h2>
                        آزمون : {activeQuestion + 1} از{" "}
                        <span>{questions.length}</span>
                    </h2>
                ) : null}
            </div>
            <div>
                {!showResult ? (
                    <div className="quiz-container">
                        <h3>{questions[activeQuestion].question}</h3>
                        {

                            answers.map((answer, index) => (
                                <li
                                    key={index}
                                    onClick={() => onAnswerSelected(answer, index)}
                                    className={
                                        selectedAnswerIndex === index
                                            ? "li-selected"
                                            : "li-hover"
                                    }
                                >
                                    <Suspense fallback={<Loading count={1}/>}>

                                    <span>{timeDalay().then(()=>answer)}</span>
                                    </Suspense>
                                </li>
                            ))
                        }

                        {checked ? (
                            <button className="btn" onClick={nextQuestion}>
                                {activeQuestion === questions.length - 1
                                    ? "پایان"
                                    : "بعدی"}
                            </button>
                        ) : (
                            <button
                                className="btn-disabled"
                                onClick={nextQuestion}
                                disabled
                            >
                                {activeQuestion === questions.length - 1
                                    ? "پایان"
                                    : "بعدی"}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="quiz-container">
                        <h3>نتایج</h3>
                        <h3>
                            به طور کلی {(result.score / 25) * 100}% سوالات جواب
                            داده شده
                        </h3>
                        <p>کل سوالات : {questions.length}</p>
                        <p>کل امتیاز : {result.score}</p>
                        <p>سوالات درست : {result.correctAnswers}</p>
                        <p>سوالات غلط : {result.wrongAnswers}</p>

                        <button onClick={() => window.location.reload()}>
                            شروع مجدد آزمون
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
