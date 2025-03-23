import React, { useState } from 'react';
import Person from './components/Person'
import './App.css';

function App() {
  const [persons, setPersons] = useState(
    {
      articles:
        [
          { firstname: "Younes", lastname: "Ghorbany", age: 27 },
          { firstname: "Iman", lastname: "Madaeny", age: 30 },
          { firstname: "Sajad", lastname: "Bagherzade", age: 35 }
        ]
    }
  )

  const handlePersonChange = () => {
    setPersons(
      {
        articles: [
          { firstname: "Reza", lastname: "Ghorbany", age: 27 },
          { firstname: "Mohammad", lastname: "Madaeny", age: 30 },
          { firstname: "Amir", lastname: "Bagherzade", age: 35 }
        ]
      }
    );
  };
  return (
    <div className="app">
      <h1>Hello World!</h1>
      <hr />
      {persons.articles.map(person => (
        <Person
          firstname={person.firstname}
          lastname={person.lastname}
          age={person.age}
        >
          Toplearn
        </Person>
      ))}
      <hr />
      <button onClick={handlePersonChange}>تغییر بده</button>
    </div>

  );
}

export default App;
