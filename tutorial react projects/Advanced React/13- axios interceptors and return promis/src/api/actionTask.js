import {getAxios} from "./api";

// export const getTasks = (callback) => {
//   getAxios().get("/tasks").then(res => {
//     callback(true, res.data);
//   }).catch(err => {
//     callback(false, err);
//   })
// };

export const getTasks = () => {
  return new Promise((resolve,reject)=>{
    getAxios().get("/tasks").then(res => {
      resolve( res.data);
    }).catch(err => {
      reject( err);
    })
  })
  }
 

export const postTask = (task,callback) => {
  getAxios().post("/tasks",task).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const editTask = (id,task,callback) => {
  getAxios().put("/tasks/"+id,task).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const deleteTask = (id,callback) => {
  getAxios().delete("/tasks/"+id).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};