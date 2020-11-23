import React, { useState } from 'react';

import axios from 'axios';
import { queryCache, useMutation, useQuery } from 'react-query';
import { addTodoApi } from './usequercofig';
const App = () => {
  const [newTask,setNewTask]=useState("")
  const [done,setDone]=useState(false)
 // *******************get data*************
  const {data=[],err,isError,isLoading}=useQuery(`http://localhost:3000/tasks?done=${done}`,(key)=>axios(key).then(res=>res.data))
 
 
  // *******************posttt data*************
  const [addNewTasks]=useMutation(()=>addTodoApi(newTask),{
      onSuccess:(data)=>{
        console.log("on success post data", data);
        queryCache.invalidateQueries("http://localhost:3000/tasks")
      }
    })
    const addMyTask=()=>{
      if(!newTask)
      return null
      addNewTasks()
    
    }
 
 return (
<div>
    <div>
      <input type="text" placeholder="add new task here" value={newTask} onChange={e=>setNewTask(e.target.value)}/>
      <button onClick={addMyTask}>add tak</button>
    </div>
    {isError && <p>مشکلی پیش آمده</p>}
    {isLoading && <p>در حال بارگیری</p>}
    <input type="checkbox" value={done} onChange={e=>setDone(e.target.checked)} />
    <ul>
  {data.map(item=> <li><input type="checkbox" checked={item.done}/>{item.title}</li>)}
    
    </ul>
</div>
  );
};

export default App;