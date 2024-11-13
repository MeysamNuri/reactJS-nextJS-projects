export default async function Info() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div className="quiz-container" style={{ backgroundColor: "red" }}>
            اطلاعات من
        </div>
    );
}
