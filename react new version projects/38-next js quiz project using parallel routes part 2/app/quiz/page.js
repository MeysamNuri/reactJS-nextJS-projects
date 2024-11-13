"use client";
import { useState } from "react";

import { quiz } from "../data";
import { Answers, Buttons, Result } from "./components";

export default function Quiz() {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { questions } = quiz;
    const { answers, correctAnswer } = questions[activeQuestion];

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
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }

        setChecked(false);
    };

    // throw new Error();

    return (
        <div className="container">
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

                        <Answers
                            answers={answers}
                            onAnswerSelected={onAnswerSelected}
                            selectedAnswerIndex={selectedAnswerIndex}
                        />

                        <Buttons
                            checked={checked}
                            nextQuestion={nextQuestion}
                            activeQuestion={activeQuestion}
                            questions={questions}
                        />
                    </div>
                ) : (
                    <Result result={result} questions={questions} />
                )}
            </div>
        </div>
    );
}
