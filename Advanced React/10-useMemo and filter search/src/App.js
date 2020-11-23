import React, { useState } from 'react';

const App = () => {
  console.log("render App");
  const [filterText, setNewTask] = useState("")
  const [searchText, setSearchText] = useState("")

  const [tasks, setTasks] = useState([
    {
      "id": "1",
      "title": "go to gym",
      "done": false
    },
    {
      "id": "2",
      "title": "say hellow",
      "done": true
    },
    {
      "id": "3",
      "title": "go to work",
      "done": true
    },
  ])
  const [done, setDone] = useState(false)

const removeTask=React.useCallback((item)=>{

},[tasks])
  const myFilterFunc = () => {
      setSearchText(filterText)
  }
  const FilteredText=React.useMemo(()=>tasks.filter(task=>{
    console.log("filterr");
   return task.title.includes(searchText)
  }),[searchText]);
  return (
    <div>
      <div>
        <input type="text" placeholder="add new task here"  onChange={e => setNewTask(e.target.value)} />
        <button onClick={myFilterFunc}>فیلتر</button>
      </div>

      <ul>
        <TaskList tasks={FilteredText} removeTask={removeTask} />

      </ul>
    </div>
  );
};
const TaskList = React.memo(({ tasks, removeTask }) => {
  console.log("render TaskList");
  return tasks.map(item => <TaskItem task={item} removeTask={removeTask} />)

})

const TaskItem = React.memo(({ task, removeTask }) => {
  console.log("render TaskItem");
  return <li><input type="checkbox" checked={task.done} />{task.title}</li>
})
export default App;