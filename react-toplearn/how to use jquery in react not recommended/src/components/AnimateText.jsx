import React, { useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import $ from "jquery";
const AnimateText = ({ children }) => {
    const text1 = useRef(null);

    useEffect(() => {
        $(findDOMNode(text1.current)).animate({ height: "200px" }, "slow");
    }, []);

    return <div ref={text1}>{children}</div>;
};

export default AnimateText;
