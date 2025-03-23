import { useState, useEffect, useRef } from "react";

import "../App.css";

const MyForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const inputsRef = useRef([]);
  // console.log(nameRef);

  const addRef = (element) => {
    if (element && !inputsRef.current.includes(element)) {
      inputsRef.current.push(element);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Name: ${inputsRef.current[0].value}, Email: ${inputsRef.current[1].value}`
    );
  };

  useEffect(() => {
    console.log(inputsRef);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      setData({
        name: e.target.value,
        email: data.email,
      });
    } else if (e.target.name === "email") {
      setData({
        name: data.name,
        email: e.target.value,
      });
    }
  };

  return (
    <>
      <div className="App">
        <h4>Controlled Component</h4>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <br />
          <button>Submit</button>
        </form>
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      </div>
      <hr color="aqua" />

      <div className="App">
        <h4>Uncontrolled Component</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" ref={addRef} />
          <br />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={addRef} />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default MyForm;
