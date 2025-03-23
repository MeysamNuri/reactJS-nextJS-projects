export default function QuizResult({ result, questions }) {
    return (
        <div className="container p-5">
            <div className="text-gray-400">
                <h3 className="mt-2">نتایج</h3>
                <h3 className="mt-2">
                    به طور کلی {(result.score / 25) * 100}% سوالات جواب داده شده
                </h3>
                <p className="mt-2">کل سوالات : {questions.length}</p>
                <p className="mt-2">کل امتیاز : {result.score}</p>
                <p className="mt-2">سوالات درست : {result.correctAnswers}</p>
                <p className="mt-2">سوالات غلط : {result.wrongAnswers}</p>

                <button
                    type="button"
                    className="my-5 px-6 py-2 text-sm rounded shadow bg-gray-600 hover:bg-gray-400 text-gray-200 w-full cursor-pointer"
                    onClick={() => window.location.reload()}
                >
                    شروع مجدد آزمون
                </button>
            </div>
        </div>
    );
}
