import React, { useState } from 'react';

const App = () => {
  console.log("render App");
  const [newTask,setNewTask]=useState("")
  const [tasks,setTasks]=useState([
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
  ])
  const [done,setDone]=useState(false)

 
    const addMyTask=()=>{
    setTasks([...tasks,{id:3,title:newTask,done:false}])
    }
 const removeTask=React.useCallback((item)=>{

 },[tasks])
 return (
<div>
    <div>
      <input type="text" placeholder="add new task here" value={newTask} onChange={e=>setNewTask(e.target.value)}/>
      <button onClick={addMyTask}>add tak</button>
    </div>
  
    <ul>
      <TaskList tasks={tasks} removeTask={removeTask}/>
    
    </ul>
</div>
  );
};
const TaskList=React.memo(({tasks,removeTask})=>{
  console.log("render TaskList");
  return tasks.map(item=> <TaskItem task={item} removeTask={removeTask}/>)

})

const TaskItem=React.memo(({task,removeTask})=>{
  console.log("render TaskItem");
  return <li><input type="checkbox" checked={task.done}/>{task.title}</li>
},(prevProps,nextProps)=>{
  if(prevProps.task.id===nextProps.task.id)
    return true;
  return false;
})
export default App;