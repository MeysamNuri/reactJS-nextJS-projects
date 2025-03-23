import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: 400,
    height: 400,
    borderRadius: "1rem",
    padding: "1rem",
  },
}));
