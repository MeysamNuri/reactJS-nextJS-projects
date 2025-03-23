import { makeStyles, ThemeProvider } from "@material-ui/styles";

const useStyle=makeStyles(them=>({

    root:{
        backgroundColor:'#eee',
      
    },
    divider:{
        backgroundColor:"#7ebaff",
        filter:"opacity(.8px)"
    },
    header:{
        backgroundColor:'white',
        display:"flex",
        padding:18,
    },
    headerTitle:{
       
     
        marginRight:"10px",
        fontWeight:"600",
        fontSize:"20px !important" 

    },
    NewTwett:{
        padding:18,
        display:"flex",
        flexDirection:"column",
        backgroundColor:'white',
    },
    TweetItem:{
        padding:18,
        display:"flex",
        flexDirection:"column",
        backgroundColor:'white',
        marginTop:".5rem",

    },
    TweetItemName:{
        fontSize:"20px",
fontWeight:600,
marginRight:"10px"
    },
    favImg:{
border:"1px solid",
marginBottom: "15px",
marginRight: "10px",
padding: "7px"
    },
    Numbertweet:{
color:them.palette.text.hint,
fontSize:".4rem"
    },
    TweetItemId:{
        fontSize:".9rem",
        color:them.palette.text.hint,
        marginRight:"15px"

    },
    input:{
        border:"none",
        flex:1,
        marginRight:"1rem",
        "&:focus":{outline:"none"}
    },
    ButtonStyle:{
        color:"white",
        borderRadius:"20px",
        padding:"20px !important",
        height:"30px",
        lineHeight:"1rem",
        fontSize:"20px",
        fontFamily:"Shabnam"
    },
    ButtonImg:{
        marginTop: "-14px"
    },
    Tweetpic:{
       
        width:"300px",
        height:"200px",
        backgroundRepeat: "no-repeat",
        backgroundSize:"contain"
    },
    menu:{
        padding:"0px !important" ,
        marginLeft:".5rem"
    }


}))
export default useStyle