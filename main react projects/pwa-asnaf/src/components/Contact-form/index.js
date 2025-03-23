import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "store-js";
import Snackbar from "@material-ui/core/Snackbar";
import "./Contact.less";
import { SupportForm } from './userServices'
import { setSnackbarMsg } from "../../mainAction/snackbarAction";

const ContactForm = () => {

  const profileData = store.get("appInit");
  const [state,setState]=useState("")
  const [name,setName]=useState(profileData.f_name + " " + profileData.l_name)
  const [cellphone,setCellphone]=useState(profileData.cellphone)
  const [email,setEmail]=useState("")
  const [msg,setMsg]=useState("")
  const [snackMsg, setSnackMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const dispatch=useDispatch()
  useEffect(() => {
    console.log(profileData);
    if (profileData !== undefined) {
      if (profileData.f_name !== "" && profileData.f_name !== null) {
        setState((prevState) => ({
          ...prevState,
          name: profileData.f_name + " " + profileData.l_name,
        }));
      }
      if (profileData.cellphone !== "" && profileData.cellphone !== null) {
        setState((prevState) => ({
          ...prevState,
          cellphone: profileData.cellphone,
        }));
      }
    }
  }, []);


//  const resetField=()=>{
//   setMsg("")
//   setName("")
//   setCellphone("")
//  }

  const handleSendForm=async (e)=>{
      e.preventDefault()
      const users={
        title: name,
        cellphone: cellphone,
        description: msg,
        email: "",
    }
       console.log(users);
       try{
        const {status, data}= await SupportForm(users)
        if(status===200){ 
          console.log(data);
          setOpenSnack(true);
          setSnackMsg('  نظر شما با موفقیت ثبت شد ')
          // resetField()
        }
       }
       catch(ex){
         console.log(ex);
         setOpenSnack(true);
         setSnackMsg('  فیلد پیام خالی است ')
        //  resetField()
       }
  }


  const handleCloseErrMessage = () => {
    setOpenSnack(false);
  };
  return (
    <div style={{ height: "72vh", overflow: "hidden" }}>
         <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={snackMsg}
        style={{ width: "200px", left: "50%", bottom: "5%", right: "24%" }}
      />
      <form action="" className="contact-form">
        <div>
          <p>نام</p>
          <input
          style={{direction:"rtl"}}
            type="text"
            name="name"
            id="name"
            value={name}
              onChange={(e) => setName(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div>
          <p>شماره تلفن</p>
          <input
            style={{ textAlign: "left" }}
            type="number"
            name="cellphone"
            id="phone"
            value={cellphone}
            // onChange={(e) => setCellphone(e.target.value)}
          />
        </div>
        <div>
          <p>پیام</p>
          <textarea
            type="text"
            name="msg"
            id="msg"
            value={msg}
              onChange={(e) => setMsg(e.target.value)}
              
          />
        </div>
        <div>
          <button
              onClick={(e) => handleSendForm(e)}
            style={{ marginLeft: "12px" ,cursor:"pointer"}}
           
          >
            ارسال
          </button>
          <a href="tel:+982188893217">تماس تلفنی</a>
        </div>
      </form>
    </div>
  );
};
export default ContactForm;
