export default function QuizButtons({
    checked,
    nextQuestion,
    activeQuestion,
    questions,
}) {
    return checked ? (
        <button
            type="button"
            className="mx-2 my-5 px-6 py-2 text-sm rounded shadow bg-gray-600 hover:bg-gray-400 text-gray-200 w-full cursor-pointer"
            onClick={nextQuestion}
        >
            {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
        </button>
    ) : (
        <button
            type="button"
            className="disabled:bg-gray-400 mx-2 my-5 px-6 py-2 text-sm rounded shadow bg-gray-500 hover:bg-gray-400 text-gray-200 w-full cursor-pointer"
            onClick={nextQuestion}
            disabled
        >
            {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
        </button>
    );
}
