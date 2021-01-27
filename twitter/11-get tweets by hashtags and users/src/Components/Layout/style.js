import { makeStyles } from "@material-ui/styles";


const useStyle = makeStyles({
    root: {
        display: "flex",
        height: "100vh",
        width: "100%"
    },

    divider: {
        width: 1,
        height: "100%",
        backgroundColor: "black",
        filter: "opacity (.5px)"

    },
    contet: {
        flex:1,
        overflowY:"auto"
    },
    waitPro:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        position:"absolute",
        top:0,
        left:0,
        justifyContent:"center",
        flexDirection:"column",
    height:"100vh" ,
   }

})
export default useStyle