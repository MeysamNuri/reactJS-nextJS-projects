import axios from "axios";

const SERVER_URL="http://localhost:9000"

export const getALllUsers=()=>{
    let url=`${SERVER_URL}/users`
    return axios.get(url)
}
export const getALllBlogs=()=>{
    let url=`${SERVER_URL}/blogs`
    return axios.get(url)
}
export const createBlog=(blogBody)=>{
    let url=`${SERVER_URL}/blogs`
    return axios.post(url,blogBody)
}
export const deleteBlog=(blogId)=>{
    let url=`${SERVER_URL}/blogs/${blogId}`
    return axios.delete(url)
}
export const deleteUser=(userId)=>{
    let url=`${SERVER_URL}/users/${userId}`
    return axios.delete(url)
}
export const createUser=(userBody)=>{
    let url=`${SERVER_URL}/users`
    return axios.post(url,userBody)
}
export const updateBlog=(blogBody,blogId)=>{
    let url=`${SERVER_URL}/blogs/${blogId}`
    return axios.put(url,blogBody)
}