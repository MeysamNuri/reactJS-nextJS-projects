import React, { useState } from "react";
import BankList from "../bank-list/BankList";
import { connect } from "react-redux";
import { Input } from "antd";
import { setBankId, setSheba } from "../../Actions/FormAction";
import { axiosInstance as axioses } from "../../config/axios";

function AddBank({ setBankId, setSheba, FormReducer }) {
  const [shebaDisplay, setShebaDisplay] = useState("none");
  const [sheba2Display, setSheba2Display] = useState("none");
  const [shebaName, setShebaName] = useState('شماره شبا اشتباه است')
  const [displayTerminalTxt, setDisplayTerminalTxt] = useState("none");
  const [loading, setLoading] = useState('none')

  // const [ip, setIp] = useState("");
  // const [userAgent, setUserAgent] = useState("");

  // useEffect(() => {
  //   checkUserAgent();
  //   axios
  //     .get("https://api.ipify.org?format=jsonp&callback=?")
  //     .then(res => {
  //       const ipAdd = res.data;
  //       let sub = ipAdd.substr(9, 12);
  //       setIp(sub);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // function checkUserAgent() {
  //   if (/Chrome/.test(navigator.userAgent)) {
  //     setUserAgent("chrome");
  //     return;
  //   } else if (/Firefox/.test(navigator.userAgent)) {
  //     setUserAgent("firefox");
  //     return;
  //   } else if (/Safari/.test(navigator.userAgent)) {
  //     setUserAgent("safari");
  //     return;
  //   } else {
  //     setUserAgent("ie");
  //   }
  // }

  function checkSheba() {
    setLoading('flex')
    axioses
      .get(`check_shaba_id?iban=IR${FormReducer.sheba}`)
      .then(res => {
        setLoading('none')
        setSheba2Display('flex')
        setShebaName(res.data.data.owners_info[0].first_name + ' ' + res.data.data.owners_info[0].last_name)
      })
      .catch(err => {
        setSheba2Display('flex')
        setShebaName('شماره شبا اشتباه است')
      });
  }

  function handleValidateNumber(e) {
    const numberRegex = new RegExp("^[0-9]*$");
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");

    const name = e.target.name;
    if (name === "sheba") {
      if (
        FormReducer.sheba?.length === 24 &&
        (numberRegex.test(FormReducer.sheba) ||
          farsiNumber.test(FormReducer.sheba))
      ) {
        setShebaDisplay("none");
        
      } else {
        setShebaDisplay("flex");
      }
    } else if (name === "terminal") {
      if (
        FormReducer.bankId?.length !== "" &&
        (numberRegex.test(FormReducer.bankId) ||
          farsiNumber.test(FormReducer.bankId))
      ) {
        setDisplayTerminalTxt("none");
      } else {
        setDisplayTerminalTxt("block");
      }
    }
    // setPozArray();
  }

  return (
    <>
    <div className='terminal-loading' style={{display: loading}}>
          <p>لطفا منتظر بمانید ...</p>
        </div>
      <BankList />
      <Input
        placeholder="شماره حساب"
        name="terminal"
        maxLength="20"
        value={FormReducer.bankId}
        onChange={e => setBankId(e.target.value)}
        onBlur={e => handleValidateNumber(e)}
      />
      <p style={{ display: displayTerminalTxt }} className="error-txt">
        شماره حساب باید بدون حروف اضافه و عدد باشد
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          position: "relative"
        }}
      >
        <Input
          placeholder="شماره شبا"
          value={FormReducer.sheba}
          maxLength={24}
          name="sheba"
          style={{ textAlign: "left" }}
          onChange={e => setSheba(e.target.value)}
          onBlur={e => handleValidateNumber(e)}
        />
        <span className="ir">-IR</span>
        <button onClick={checkSheba}>چک کردن شبا</button>
        <p className="error-txt" style={{ display: sheba2Display, alignSelf: "center", marginTop:'10px' }}>{shebaName}</p>
        <p
          className="error-txt"
          style={{ display: shebaDisplay, alignSelf: "center" }}
        >
          شماره شبا باید بدون حروف اضافه و 24 رقم باشد
        </p>
      </div>
    </>
  );
}

const mapStateToProps = store => ({
  FormReducer: store.FormReducer
});
const mapDispatchToProps = dispatch => ({
  setBankId: bankId => dispatch(setBankId(bankId)),
  setSheba: sheba => dispatch(setSheba(sheba)),
  // setPozArray: () => dispatch(setPozArray())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
