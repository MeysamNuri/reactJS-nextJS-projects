import { useState } from "react";
// import PortalTest from "./components/PortalTest";
import MyForm from "./components/MyForm";

// import names from "./names";
// import { makeUpperCase } from "./helper";
import "./App.css";

function App() {
  const [names, setName] = useState(null);

  const onLoad = () => {
    import("./names").then((module) => {
      setName(module.default);

      import("./helper" /*webpackChunkName: "helpers"*/).then(
        ({ makeUpperCase }) => {
          setName((names) => makeUpperCase(names));
        }
      );
    });
  };

  return (
    <div className="App">
      <h3>ReactJs Course Season 12</h3>
      <hr color="tomato" />
      {/* <PortalTest /> */}
      <MyForm />
      <hr color="cyan" />
      <button onClick={onLoad}>Load</button>
      {JSON.stringify(names)}
    </div>
  );
}

export default App;
