import React from 'react';
import axios from 'axios';

export const addTodoApi=(title)=>{
   return axios.post("http://localhost:3000/tasks",{id:Math.floor(Math.random()*1000),title:title,done:false})
  }