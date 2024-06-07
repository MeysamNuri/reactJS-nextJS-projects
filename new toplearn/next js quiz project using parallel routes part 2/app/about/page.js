import Info from "./@info/page";

export default async function About() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <main>
            <div className="quiz-container" style={{ backgroundColor: "teal" }}>
                <h2>بخش اصلی</h2>
                <Info />
            </div>
        </main>
    );
}
