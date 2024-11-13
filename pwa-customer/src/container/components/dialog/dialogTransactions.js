import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { setTransactionDialog, setTransactionDialogTick } from '../../pages/transactions/actions';
import  './dialogTransactions.less';


function DialogTransactions({ title, options, style }) {
    const open = useSelector(state => state.transactionReducer.transactiondialog);
    const tick = useSelector(state => state.transactionReducer.tick);
    const Dispatch = useDispatch();
    
    const handleClose = () => {
        Dispatch(setTransactionDialog(false));
        document.getElementsByClassName('container')[0].style.filter = "blur(0px)";
    };
    const handleCllick = (e, id) => {
        document.getElementsByClassName('container')[0].style.filter = "blur(0px)";
        Dispatch(setTransactionDialog(false));
        Dispatch(setTransactionDialogTick(id));
    }

    return (
        <div className="dialog_container">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="options" style={style}>
                    {
                        title ? (
                            <div className="header_title"><span>{title}</span></div>
                        ) : null
                    }
                    {
                        options.map((option, index) => (
                            <div className='option'
                                id={index}
                                onClick={(e) => handleCllick(e, index)}>
                                <div className="icon">
                                    <span className="bullet"></span>
                                    <span className="tick"
                                        style={{ display: index === tick ? 'block' : 'none' }}></span>
                                </div>
                                <div className="title">
                                    <span>{option}</span>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </Dialog>
        </div>
    )
}

export default React.memo(DialogTransactions);
