import React from "react";
import { render } from "react-dom";
import App from "./container/App";
import "./index.css";
import GlobalState from './container/GlobalState'  
render(<GlobalState> <App /></GlobalState> , document.getElementById("root"));
