import {getAxios} from "./api";

export const getUsers = (callback) => {
  getAxios().get("/users").then(res => {
    callback(true, res.data);
  }).catch(err => {
    callback(false, err);
  })
};
export const postUser = (user,callback) => {
  getAxios().post("/users",user).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const editUser = (id,user,callback) => {
  getAxios().put("/users/"+id,user).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const deleteUser = (id,callback) => {
  getAxios().delete("/users/"+id).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};