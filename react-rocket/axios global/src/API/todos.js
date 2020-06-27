import axios from 'axios'

const instance=axios.create({
    baseURL:"https://react-course2.firebaseio.com",
    timeout:"5000"
})

export default instance