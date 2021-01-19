import { makeStyles } from "@material-ui/styles";


const useStyle=makeStyles({
    root:{
        display:"flex",
        height:"100vh",
        width:"100%"
    },
   
    divider:{
        width:1,
        height:"100%",
        backgroundColor:"black",
        filter:"opacity (.5px)"

    }
})
export default useStyle