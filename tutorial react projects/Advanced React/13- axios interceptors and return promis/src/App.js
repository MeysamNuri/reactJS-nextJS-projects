import React, {useEffect} from 'react';
import { getTasks } from './api/actionTask';
import {getUsers} from "./api/actionUser";

const App = (props) => {
  useEffect(() => {
    getUsers((isok,users) => {
      console.log("users",users);
    });
  }, [])


  //=========== promis version of Api====================

  // useEffect(()=>{
  //   getTasks().then(tasks=>{
  //     console.log("tasks",tasks);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // })

 
    const fetchTasks= getTasks().then(tasks=>{
      console.log("tasks",tasks);
    }).catch(err=>{
      console.log(err);
    })
 
  useEffect(()=>{
    Promise.all([fetchTasks,fetchTasks])
  })

  return <div>
    app
  </div>
};


export default App;