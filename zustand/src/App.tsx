import './App.css'
import CourseForm from './components/courseForm'
import CourseList from './components/courseList'

function App() {

  return (
    <div className="App">
    <div className='main-container'>
      <h1 style={{
        fontSize: "2rem",
        marginBottom: "2rem"
      }}>لیست دوره های من</h1> 
      <CourseForm />
      <CourseList />
    </div> 
  </div>
  )
}

export default App
