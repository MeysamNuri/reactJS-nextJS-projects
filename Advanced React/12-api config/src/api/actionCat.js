import {getAxios} from "./api";

export const getCats = (callback) => {
  getAxios().get("/categories").then(res => {
    callback(true, res.data);
  }).catch(err => {
    callback(false, err);
  })
};
export const postCat = (cat,callback) => {
  getAxios().post("/categories",cat).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const editCat = (id,cat,callback) => {
  getAxios().put("/categories/"+id,cat).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};
export const deleteCat = (id,callback) => {
  getAxios().delete("/categories/"+id).then(res => {
    callback(true);
  }).catch(err => {
    callback(false, err);
  })
};