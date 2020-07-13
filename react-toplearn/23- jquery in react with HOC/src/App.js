import React, { useRef } from "react";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import logo from "./logo.svg";
import "./App.css";
import AnimateText from "./components/AnimateText";

function App() {
    const toggleLogo = useRef(null);
    const hideLogo = () => {
        console.log(toggleLogo);
        $(findDOMNode(toggleLogo.current)).slideToggle();
    };

    return (
        <div className="App">
            <header className="App-header">
                <img
                    ref={toggleLogo}
                    src={logo}
                    className="App-logo"
                    alt="logo"
                />
                <br />
                <AnimateText>Toplearn is the best place to learn</AnimateText>
                <button onClick={hideLogo}>Hide Logo</button>
            </header>
        </div>
    );
}

export default App;
