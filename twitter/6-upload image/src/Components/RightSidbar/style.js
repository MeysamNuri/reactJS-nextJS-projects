import { makeStyles } from "@material-ui/styles";


const useStyle=makeStyles(theme=>({
  
    root:{
        backgroundColor:'white',
        width:'18%',
        padding:"1.5rem"
    },
    logoText:{
        fontSize:"1.25rem !important",
        fontWeight:"700  !important",
        marginRight:"1rem",
        color:theme.palette.primary.main
    },
    hashtagTitle:{
        fontSize:"1.25rem !important",
        fontWeight:"700  !important",
        marginTop:"1rem",
        marginBottom:"1rem"
       
      
    },
    hashtag:{
        marginRight:".8rem",
        fontSize:".8rem !important"
    },
    hashtagparent:{
        width:"100%",
        padding:"10px !important",
        marginBottom:".3rem !important"
        
    }

}))
export default useStyle