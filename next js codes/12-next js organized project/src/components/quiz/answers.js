import { Suspense } from "react";
import Loading from "@/src/app/quiz/loading";

export default function Answers({
    answers,
    onAnswerSelected,
    selectedAnswerIndex,
}) {
    return answers.map((answer, index) => (
        <li
            key={index}
            onClick={() => onAnswerSelected(answer, index)}
            className="hover:bg-gray-600 cursor-pointer bg-gray-100 dark:bg-gray-900 mx-6 h-16 rounded flex items-center mb-2"
            style={
                selectedAnswerIndex === index
                    ? { backgroundColor: "black" }
                    : {}
            }
        >
            <Suspense fallback={<Loading count={1} />}>
                <span className=" text-grey-700 dark:text-gray-400 text-lg mr-4">
                    {answer}
                </span>
            </Suspense>
        </li>
    ));
}
