import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
    increment,
    decrement,
    incrementByAmount,
    selectCount,
} from "./features/counter/counterSlice";
import "./App.css";

function App() {
    const [incrementAmount, setIncrementAmount] = useState(0);
    // const count = useSelector(selectCount); this is another way for selector
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    console.log(count);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <div>
                    <button
                        style={{ marginRight: "10px" }}
                        onClick={() => dispatch(increment(1))}
                    >
                        +
                    </button>
                    <button onClick={() => dispatch(increment(2))}>
                        count is {count}
                    </button>
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => dispatch(decrement(1))}
                    >
                        -
                    </button>
                </div>
                <div>
                    <button
                        style={{ marginRight: "10px", marginTop: "10px" }}
                        onClick={() =>
                            dispatch(incrementByAmount(Number(incrementAmount)))
                        }
                    >
                        Add Amount
                    </button>
                    <input
                        aria-level="Set increment Amount"
                        value={incrementAmount}
                        onChange={(e) => setIncrementAmount(e.target.value)}
                        style={{
                            height: "30px",
                            width: "30px",
                        }}
                    />
                </div>

                <button
                    style={{ marginTop: "10px" }}
                    // onClick={() => store.dispatch(incrementByAmount(1))}
                >
                    Add Async
                </button>
            </div>
        </div>
    );
}

export default App;
