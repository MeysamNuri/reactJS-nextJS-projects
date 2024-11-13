const Result = ({result,questions}) => {
    return ( 
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
     );
}
 
export default Result;