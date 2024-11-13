import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { setMainDialog, setMainTick } from "../../actions/MainActions";
import "./dialog.less";

function AlertDialog({ title, options, style }) {
  const open = useSelector(state => state.MainReducer.mainDialog);
  const tick = useSelector(state => state.MainReducer.mainTick);
  const Dispatch = useDispatch();

  const handleClose = () => {
    Dispatch(setMainDialog(false));
    document.getElementsByClassName("container")[0].style.filter = "blur(0px)";
  };
  const handleClick = (e, id) => {
    document.getElementsByClassName("container")[0].style.filter = "blur(0px)";
    Dispatch(setMainDialog(false));
    Dispatch(setMainTick(id));
  };
  
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="options" style={style}>
          {title ? (
            <div className="header_title">
              <span>{title}</span>
            </div>
          ) : null}
          {options.map((option, index) => (
            <div
              className="option"
              id={index}
              onClick={e => handleClick(e, index)}
            >
              <div className="icon">
                <span className="bullet"></span>
                <span
                  className="tick"
                  style={{ display: index === tick ? "block" : "none" }}
                ></span>
              </div>
              <div className="title">
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
  );
}

export default React.memo(AlertDialog);
