import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./style.less";
import useDataApi from "../fetchData/useDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "8px 0"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function SimpleExpansionPanel() {
  const classes = useStyles();
  const [faqList, setFaqList] = useState([]);
  const [params, setParams] = useState(true);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("faq/list");
  const [method, setMethod] = useState("get");

  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setFaqList(data.data);
    } else if (isError) {
      setFlag(flag => !flag);
      setError(error => !error);
    }
  }, [data, isLoading, isError]);

  return (
    <div className={classes.root}>
    {isLoading && (
      <div className="loading">
        <CircularProgress className="circular_loading" />
      </div>
    )}
      {faqList.map(item => (
        <ExpansionPanel key={item.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{item.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{item.content}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

function index() {
  return <SimpleExpansionPanel />;
}

export default index;
