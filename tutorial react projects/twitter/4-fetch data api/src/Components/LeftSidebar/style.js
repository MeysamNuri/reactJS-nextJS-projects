import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme=>({
    root: {
        backgroundColor: "white",
        width: "25%",
        padding: "1.7rem 1.5rem"
    }
    ,
    profName: {
        direction: "ltr",
        fontSize: "1.5rem !important",
        flex:1
    }
    ,
    TweeterProftext:{
        width: "max-content",
        alignItems: "center",
        alignSelf: "center",
        marginRight: "20px"
    },
    userDetail: {
        width: "max-content",
        alignItems: "center",
        alignSelf: "center",
        marginLeft: "20px"
    },
    profId: {
flex:1,
color:"#a59d9d"
    },
    tweeter:{
        backgroundColor:"#f5f8fa",
        borderRadius:"2.5rem",
        padding:"24px 11px",
        marginTop:"3rem"

    },
    tweeterTitle:{
        marginBottom:"11px",
        fontWeight:"900 !important"

    },
    tweeterParent:{
        padding:"2px 0 !important",
        marginTop: "10px"
    }
}))
export default useStyle