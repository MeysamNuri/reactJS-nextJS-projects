import { Suspense } from "react";
import Loading from "../loading";

export default function Answers({
    answers,
    onAnswerSelected,
    selectedAnswerIndex,
}) {
    return answers.map((answer, index) => (
        <li
            key={index}
            onClick={() => onAnswerSelected(answer, index)}
            className={
                selectedAnswerIndex === index ? "li-selected" : "li-hover"
            }
        >
            <Suspense fallback={<Loading count={1} />}>
                <span>{answer}</span>
            </Suspense>
        </li>
    ));
}
