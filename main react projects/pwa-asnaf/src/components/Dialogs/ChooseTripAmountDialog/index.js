/**
 *
 * ChooseTripAmountDialog
 *
 */

import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowTripAmountDialog,
  setSelectedAmount,
  setSelectedPoint,
} from "../../../containers/trip/action";
import { makeStyles } from "@material-ui/core/styles";
import APIs from "./APIs";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../../utils/fetchCatch";

const useStyles = makeStyles({
  paper: {
    width: "70%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    textAlign: "center",
    margin: "0 !important",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "180px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});

function ChooseTripAmountDialog({ selectedTripType }) {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.tripReducer.tripAmountDialog);
  const [tourCredit, setTourCredit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstStep, setFirstStep] = useState(false);

  async function getTourCredits() {
    setIsLoading(true);
    try {
      const data = await APIs.getTourCredits();
      setTourCredit(data.data);
      setIsLoading(false);
    } catch ({ response }) {
      if (response) {
        if (response.data.data === null) {
          setFirstStep(true);
        }
        fetchCatch(response);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTourCredits();
  }, []);

  const handleClose = () => {
    Dispatch(setShowTripAmountDialog(false));
    document.getElementsByClassName("App")[0].style.filter = "blur(0px)";
  };

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        paper: classes.paper,
        paperWidthSm: classes.paperWidthSm,
        container: classes.container,
      }}
    >
      {isLoading ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        tourCredit.length !== 0 && (
          <div>
            {selectedTripType === "external" ? (
              <ul>
                {tourCredit.external.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      Dispatch(setSelectedAmount(item[1]));
                      Dispatch(
                        setSelectedPoint(
                          item[1] === 5000000 ? "25000" : "50000"
                        )
                      );
                      handleClose();
                    }}
                  >{`تا سقف ${item[1]} تومان`}</li>
                ))}
              </ul>
            ) : (
              <ul>
                {tourCredit.internal.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      Dispatch(setSelectedAmount(item[1]));
                      Dispatch(
                        setSelectedPoint(item[1] === 1500000 ? "7500" : "12500")
                      );
                      handleClose();
                    }}
                  >{`تا سقف ${item[1]} تومان`}</li>
                ))}
              </ul>
            )}
          </div>
        )
      )}
    </Dialog>
  );
}

export default ChooseTripAmountDialog;
