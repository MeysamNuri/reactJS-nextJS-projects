import { useState } from "react";
import BlogList from "./components/blogsList";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
        <BlogList />
        </div>
    );
}

export default App;
