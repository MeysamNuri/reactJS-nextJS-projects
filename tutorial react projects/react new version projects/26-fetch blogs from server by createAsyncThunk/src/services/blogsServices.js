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