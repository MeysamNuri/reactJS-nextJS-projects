import React from "react";
import { Alert } from "react-bootstrap";
import Counter from "./components/Counter";

function App() {
    return (
        <div className="container rtl">
            <Alert variant="info" className="w-50 mx-auto text-center mt-5">
                ریداکس آسونتر از چیزی هست که فکر میکنید{" "}
                <span role="img" aria-label="😁">
                    😁
                </span>
            </Alert>
            <Counter />
        </div>
    );
}

export default App;
