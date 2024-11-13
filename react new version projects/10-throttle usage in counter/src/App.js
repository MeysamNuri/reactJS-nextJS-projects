import { useState, useCallback } from "react";

import throttle from "lodash.throttle";

import Counter from "./components/Counter";

import styles from "./App.module.css";

const App = () => {
  const [count, setCount] = useState(0);

  const logCount = (count) => {
    console.log(`INCREMENT 🐔: ${count} `);
  };

  const throttledLog = useCallback(throttle(logCount, 1000), []);

  const increaseCount = () => {
    setCount(count + 1);
    // logCount(count);
    throttledLog(count);
  };

  const decreaseCount = () => {
    if (count === 0) {
      return alert("دیگه منفی نباشیم بهتره");
    }

    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const myStyle = { color: "aqua", border: "1px solid red" };
  //Inline Styling : background-color -> backgroundColor

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1 style={myStyle}>شمارنده من</h1>
      </header>
      <Counter
        inc={increaseCount}
        dec={decreaseCount}
        rest={resetCount}
        count={count}
      />
    </div>
  );
};

export default App;
