import { makeStyles, ThemeProvider } from "@material-ui/styles";

const useStyle=makeStyles(them=>({

    container:{
        width: "30rem",
        margin: "5em auto",
        background: "white",
        display: "flex",
        flexDirection: "column",
        
      
    },
    headerText:{
margin:"1rem",
alignSelf:"center",
fontSize: "22px !important"
    },
    tab:{
        flex:1,
        fontFamily:"shabnam !important"
    },
    loginInput:{
        padding:"1rem 2rem",
        display:"flex",
        flexDirection:"column"
    },
    inputStyle:{
        marginBottom:"1rem"
    }
 

}))
export default useStyle