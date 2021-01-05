import React, { useState, useEffect } from "react";
import "../style.css";
import {
  Form,
  Input,
  Button,
  Select,
  Radio,
  InputNumber,
  Modal,
  notification,
  Icon,
} from "antd";
import {
  setCategories,
  setPozes,
  setFixPoz,
  setPortablePoz,
  removePozDetail,
} from "../../Actions/FormAction";
import { removeInsuranceArr } from "../insuranceModal/action";
import { connect } from "react-redux";
import { DatePicker } from "react-advance-jalaali-datepicker";
import Loader from "react-loader-spinner";
import PozModal from "../modal/PozModal";
import PozInput from "../poz-input/PozInput";
import APIs from "./APIs";
import StoreDetail from "../store-detail/StoreDetail";
import SelectCity from "../select-city/SelectCity";
import Map from "../map";
import axios from "axios";
import { openSnackbar, setSnackbarMsg } from "../../Actions/snackbarAction";
import { useDispatch } from "react-redux";
import InsuranceModal from "../insuranceModal";

const initialState = {
  sugestionCategories: [],
  loading: false,
  address: "",
  storeType: "",
  discount: "",
  storeSituation: "",
  storeDocument: "",
  contractDate: "",
  insuranceNumber: "",
  displayPozDetail: "none",
  pakhorRadio: "",
  description: "",
  metr: "",
  mobile: "",
  tel: "",
  postalCode: "",
  selectePoz: "",
  addPozList: [],
  displayMetrtxt: "none",
  displayMobiletxt: "none",
  displayTeltxt: "none",
  displayPostaltxt: "none",
  displayLicenseNumtxt: "none",
  visibleModal: false,
  pos_name: "",
  modalTxt: "",
  // licenseNum: "",
  // neededPoint: "",
  fromDate: "",
  toDate: "",
  insuranceDate: "",
  insSituation: "",
};

function AddStoreForm({
  FormReducer,
  insuranceReducer,
  setCategories,
  setPozes,
  setFixPoz,
  setPortablePoz,
  removePozDetail,
  removeInsuranceArr,
}) {
  const [marketerList, setMarketerList] = useState([]);
  const [
    {
      sugestionCategories,
      loading,
      address,
      storeType,
      discount,
      storeSituation,
      storeDocument,
      contractDate,
      insuranceNumber,
      displayPozDetail,
      pakhorRadio,
      description,
      metr,
      mobile,
      tel,
      postalCode,
      selectePoz,
      addPozList,
      displayMetrtxt,
      displayMobiletxt,
      displayTeltxt,
      displayPostaltxt,
      displayLicenseNumtxt,
      visibleModal,
      pos_name,
      modalTxt,
      // licenseNum,
      // neededPoint,
      fromDate,
      toDate,
      insuranceDate,
      insSituation,
    },
    setState,
  ] = useState(initialState);
  const [contractNum, setContractNum] = useState("");
  const [showContractTxt, setShowContractTxt] = useState(false);

  const DatePickerContractInput = (props) => {
    return <input className="popo" {...props} value={contractDate} />;
  };

  const changeContractDate = (unix, formatted) => {
    setState((prevState) => ({ ...prevState, contractDate: formatted }));
  };

  const { Option } = Select;
  const { TextArea } = Input;
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("uname");
  const headers = {
    Authorization: token,
  };
  const dispatch = useDispatch();

  async function fetchBusinessSubcategories() {
    if (FormReducer.categories.length !== 0) return;
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data } = await APIs.businessSubcategories();
      setCategories(data.subcategories);
    } catch (response) {
      console.log(response);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  async function fetchPozList() {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      const { data } = await APIs.pozList();
      setPozes(data.pozes);
    } catch (response) {
      console.log(response);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  async function fetchMarketerNames() {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      const { data } = await APIs.fetchMarketerNames();
      setMarketerList(data);
    } catch (response) {
      console.log(response);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  useEffect(() => {
    fetchBusinessSubcategories();
    fetchPozList();
    fetchMarketerNames();
  }, []);

  const handleValidateInput = (e) => {
    const name = e.target.name;
    const numberRegex = new RegExp("^[0-9]*$");
    const mobileRegex = new RegExp(/^(\+98|0)?9\d{9}$/);
    const telRegex = new RegExp(/^0\d{10}$/);
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");

    switch (name) {
      case "metr":
        if (parseInt(metr) < 1) {
          setState((prevState) => ({
            ...prevState,
            displayMetrtxt: "block",
          }));
        } else if (numberRegex.test(metr) || farsiNumber.test(metr)) {
          setState((prevState) => ({ ...prevState, displayMetrtxt: "none" }));
        }

        break;
      case "mobile":
        if (
          (mobile !== "" && mobileRegex.test(mobile)) ||
          farsiNumber.test(mobile)
        ) {
          setState((prevState) => ({
            ...prevState,
            displayMobiletxt: "none",
          }));
        } else if (mobile.length < 11) {
          setState((prevState) => ({
            ...prevState,
            displayMobiletxt: "block",
          }));
        }
        break;
      case "tel":
        if ((tel !== "" && telRegex.test(tel)) || farsiNumber.test(tel)) {
          setState((prevState) => ({ ...prevState, displayTeltxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayTeltxt: "block" }));
        }
        break;
      case "postalCode":
        if (
          postalCode.length === 10 &&
          (numberRegex.test(postalCode) || farsiNumber.test(postalCode))
        ) {
          setState((prevState) => ({
            ...prevState,
            displayPostaltxt: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayPostaltxt: "block",
          }));
        }
        break;
      // case "licencNum":
      //   if (licenseNum.length !== 0) {
      //     setState((prevState) => ({
      //       ...prevState,
      //       displayLicenseNumtxt: "none",
      //     }));
      //   } else {
      //     setState((prevState) => ({
      //       ...prevState,
      //       displayLicenseNumtxt: "block",
      //     }));
      //   }
      //   break;
      default:
        break;
    }
  };

  const handleSelectOption = (name, value) => {
    switch (name) {
      case "storeType":
        setState((prevState) => ({ ...prevState, storeType: value }));
        break;

      case "storeSituation":
        setState((prevState) => ({ ...prevState, storeSituation: value }));
        break;

      case "discount":
        setState((prevState) => ({ ...prevState, discount: value }));
        break;

      case "storeDocument":
        setState((prevState) => ({ ...prevState, storeDocument: value }));
        break;

      case "insuranceNum":
        setState((prevState) => ({ ...prevState, insuranceNumber: value }));
        break;

      default:
        break;
    }
  };

  const handleAddPoz = () => {
    if (
      (FormReducer.fixPoz !== "" || FormReducer.portablePoz !== "") &&
      selectePoz !== ""
    ) {
      setState((prevState) => ({ ...prevState, displayPozDetail: "block" }));
      const pozInfo = {
        pos_name: pos_name,
        pos_id: selectePoz,
        pos_static: FormReducer.fixPoz,
        pos_dynamic: FormReducer.portablePoz,
      };
      addPozList.push(pozInfo);
      setState((prevState) => ({ ...prevState, selectePoz: "", pos_name: "" }));
      setFixPoz(0);
      setPortablePoz(0);
    }
  };

  const clearPozRequestArray = () => {
    setState((prevState) => ({ ...prevState, addPozList: [] }));
    setState((prevState) => ({ ...prevState, displayPozDetail: "none" }));
    setState((prevState) => ({ ...prevState, selectePoz: "", pos_name: "" }));
    setFixPoz(0);
    setPortablePoz(0);
  };

  const clearPozArray = () => {
    removePozDetail();
  };
  const clearInsuranceArray = () => {
    removeInsuranceArr();
  };

  const handleOkModal = () => {
    setState((prevState) => ({ ...prevState, visibleModal: false }));
  };

  async function handleSendData() {
    let lat = localStorage.getItem("lat");
    let lng = localStorage.getItem("lng");
    if (lat === null) {
      dispatch(setSnackbarMsg("لطفا موقعیت صنف را روی نقشه مشخص کنید"));
      dispatch(openSnackbar());
    } else {
      if (addPozList.length === 0 && FormReducer.pozDetail.length === 0) {
        dispatch(
          setSnackbarMsg(
            "باید حداقل یک پوز اضافه کرده باشید و یا درخواست پوز داده باشید"
          )
        );
        dispatch(openSnackbar());
      } else {
        // api for test -------> https://backend-dev.daapapp.com/api/v1/marketer/register/business
          axios.post(
            "https://api.daapapp.com/api/v1/marketer/register/business",
            {
              marketer_id: FormReducer.marketerName,
              shop_name: FormReducer.storeName,
              f_name: FormReducer.receiverFName,
              l_name: FormReducer.receiverLName,
              national_id: FormReducer.nationalId,
              birth_certified_number: FormReducer.identificationNumber,
              from: FormReducer.idFrom,
              father_name: FormReducer.fatherName,
              cellphone: mobile,
              tel: tel,
              birth_date: FormReducer.birthdate,
              meters: metr,
              sub_category_id: parseInt(storeType),
              address: address,
              place_status: storeSituation,
              business_license: parseInt(storeDocument),
              pos: JSON.stringify(FormReducer.pozDetail),
              partners: JSON.stringify(FormReducer.partnerDetail),
              pos_requests: JSON.stringify(addPozList),
              insurance:
                isNaN(parseInt(insuranceNumber)) ||
                parseInt(insuranceNumber) === ""
                  ? 0
                  : parseInt(insuranceNumber),
              longitude: parseFloat(lng),
              latitude: parseFloat(lat),
              discount: parseInt(discount),
              region_id: parseInt(FormReducer.regionId),
              footy: pakhorRadio,
              description: description,
              postal_code: postalCode,
              start_contract_date: contractDate,
              // license_num: licenseNum,
              uname: userName,
              dependants: JSON.stringify(insuranceReducer.insuranceArr),
              status: insSituation,
              // date_from: fromDate,
              date_to: toDate,
              decided_date: insuranceDate,
              // needed_rep_num: neededPoint
            },
            { headers: headers }
          )
          .then((res) => {
            const key = `open${Date.now()}`;
            notification.open({
              message: "ثبت فروشگاه",
              description: res.data.message,
              key,
            });
            setState((prevState) => ({ ...prevState, visibleModal: true }));
            setState((prevState) => ({
              ...prevState,
              modalTxt: res.data.message,
            }));
            setContractNum(res.data.data.contract_num);
            localStorage.removeItem("lat");
            localStorage.removeItem("lng");
            if (res.data.data.contract_num_exist) {
              setShowContractTxt(true);
            }
          })
          .catch((error) => {
            dispatch(setSnackbarMsg(error.response.data.message));
            dispatch(openSnackbar());
          })
          .finally(() => {
            setState((prevState) => ({ ...prevState, loading: false }));
          });
      }
    }
  }

  const DatePickerInput1 = (props) => {
    return <input className="popo" id='datepicker2' {...props} />;
  };
  const DatePickerInput2 = (props) => {
    return <input className="popo" id='datepicker3' {...props} />;
  };
  const DatePickerInput3 = (props) => {
    return <input className="popo" id='datepicker4' {...props} />;
  };
  const change1 = (unix, formatted) => {
    setState((prevState) => ({ ...prevState, fromDate: formatted }));
  };
  const change2 = (unix, formatted) => {
    setState((prevState) => ({ ...prevState, toDate: formatted }));
  };
  const change3 = (unix, formatted) => {
    setState((prevState) => ({ ...prevState, insuranceDate: formatted }));
  };
  return (
    <div className="containers">
      <Modal
        title="پیام سیستم"
        visible={visibleModal}
        onOk={handleOkModal}
        onCancel={handleOkModal}
        centered={true}
      >
        <p>{modalTxt}</p>
        <span>{`شماره قرارداد: ${contractNum}`}</span>
        {showContractTxt && (
          <span style={{ color: "#0cbf0c" }}>
            برای ویرایش شماره قرارداد به مسئول پنل اطلاع داده شود
          </span>
        )}
      </Modal>
      <div className="daap-img">
        <img src="/assets/images/logo.png" alt="" />
        <h1>داپ اَپ</h1>
      </div>
      <div className="form-content">
        <Loader
          className="spiner"
          type="Triangle"
          color="#365280"
          height={100}
          width={100}
          visible={loading}
        />
        <h1 style={{ margin: "25px 0" }}>فرم ثبت فروشگاه</h1>
        <Form action="" className="form" onSubmit={(e) => e.preventDefault()}>
          {/*<div className="input-divider">
            <Input
              placeholder="شماره قرارداد"
              name="licenseNum"
              value={licenseNum}
              onChange={(e) => {
                e.persist();
                setState((prevState) => ({
                  ...prevState,
                  licenseNum: e.target.value,
                }));
              }}
              style={{ width: "60%" }}
              onBlur={(e) => handleValidateInput(e)}
              maxLength={20}
            />
            <p className="error-txt" style={{ display: displayLicenseNumtxt }}>
              * لطفا شماره قرارداد را بدون حروف اضافه وارد نمایید
            </p>
            </div>*/}

          <StoreDetail marketerList={marketerList} />

          <div className="input-divider">
            <div>
              <Input
                placeholder="شماره همراه"
                name="mobile"
                value={mobile}
                maxLength={11}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    mobile: e.target.value,
                  }));
                }}
                onBlur={(e) => handleValidateInput(e)}
              />
              <p className="error-txt" style={{ display: displayMobiletxt }}>
                * لطفا شماره موبایل را بدون حروف اضافه وارد نمایید
              </p>

              <Input
                placeholder="تلفن فروشگاه"
                name="tel"
                value={tel}
                maxLength={11}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    tel: e.target.value,
                  }));
                }}
                onBlur={(e) => handleValidateInput(e)}
              />
              <p className="error-txt" style={{ display: displayTeltxt }}>
                * لطفا شماره تلفن را بدون حروف اضافه وارد نمایید
              </p>

              <Input
                placeholder="متراژ فروشگاه"
                name="metr"
                value={metr}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    metr: e.target.value,
                  }));
                }}
                onBlur={(e) => handleValidateInput(e)}
              />
              <p className="error-txt" style={{ display: displayMetrtxt }}>
                * لطفا متراژ را به عدد و بدون حروف اضافه وارد نمایید
              </p>
              <div>
                <SelectCity />
              </div>

              <TextArea
                value={address}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }));
                }}
                placeholder="آدرس دقیق"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />

              <Select
                showSearch
                placeholder="نوع صنف"
                className="select-area"
                style={{ width: 120 }}
                onChange={(value) => handleSelectOption("storeType", value)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.indexOf(input) >= 0
                }
              >
                {FormReducer.categories
                  ? FormReducer.categories.map((item) => (
                      <Option
                        value={item.id}
                        onClick={() =>
                          setState((prevState) => ({
                            ...prevState,
                            sugestionCategories: item.suggested_discounts,
                          }))
                        }
                        key={item.id}
                      >
                        {item.name}
                      </Option>
                    ))
                  : ""}
              </Select>

              <Select
                placeholder="درصد تخفیف"
                className="select-area"
                style={{ width: 120 }}
                onChange={(value) => handleSelectOption("discount", value)}
              >
                {sugestionCategories !== "" &&
                  sugestionCategories.map((item, index) => (
                    <Option key={index} value={item.percent}>
                      {item.percent}
                    </Option>
                  ))}
              </Select>

              <Select
                placeholder="وضعیت ملکی"
                className="select-area"
                style={{ width: 120 }}
                onChange={(value) =>
                  handleSelectOption("storeSituation", value)
                }
              >
                <Option value="0">مالک</Option>
                <Option value="1">اجاره</Option>
              </Select>

              <Select
                placeholder="جواز کسب"
                className="select-area"
                style={{ width: 120 }}
                onChange={(value) => handleSelectOption("storeDocument", value)}
              >
                <Option value="1">دارد</Option>
                <Option value="0">ندارد</Option>
              </Select>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  alignSelf: "flex-start",
                }}
              >
                <PozModal />
                {FormReducer.pozDetail.length > 0 && (
                  <div className="pos-detail-list">
                    <p>لیست پوزهای اضافه شده:</p>
                    {FormReducer.pozDetail.map((item) => (
                      <div>
                        <p>نام پوز: {item.pos_name}</p>
                        <p>شماره ترمینال: {item.terminal_number}</p>
                        <p>
                          نوع پوز:
                          {item.pos_type === "static" ? "ثابت" : "متغیر"}
                        </p>
                        <p>نام بانک: {item.bank_name}</p>
                        <p>شماره حساب: {item.account_number}</p>
                        <p>شماره شبا: {item.sheba}</p>
                      </div>
                    ))}
                  </div>
                )}
                {FormReducer.pozDetail.length !== 0 && (
                  <Button
                    type="primary"
                    onClick={clearPozArray}
                    style={{ marginTop: "10px" }}
                  >
                    پاک کردن لیست
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="input-divider">
            <h3>مکان فروشگاه</h3>
            <Map />
          </div>
          <div className="input-divider">
            <div>
              <Input
                placeholder="کد پستی"
                name="postalCode"
                value={postalCode}
                maxLength={10}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    postalCode: e.target.value,
                  }));
                }}
                onBlur={(e) => handleValidateInput(e)}
              />
              <p className="error-txt" style={{ display: displayPostaltxt }}>
                * لطفا کد پستی را به انگلیسی وبدون حروف اضافه وارد نمایید
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              borderBottom: "2px dashed lightgrey",
              paddingBottom: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <p>درخواست پوز : </p>
              <Select
                placeholder="لیست پوزها"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.indexOf(input) >= 0
                }
                onChange={(value, name) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectePoz: value,
                    pos_name: name.props.name,
                  }))
                }
                className="select-area"
                style={{ width: 120 }}
              >
                {FormReducer.pozList ? (
                  FormReducer.pozList.map((item) => (
                    <Option value={item.id} key={item.id} name={item.name}>
                      {item.name}
                    </Option>
                  ))
                ) : (
                  <Option value="...">...</Option>
                )}
              </Select>
              <PozInput />
              <Button
                style={{ margin: "10px 0" }}
                type="primary"
                onClick={handleAddPoz}
              >
                ثبت درخواست
              </Button>
            </div>
            <div style={{ width: "70%", margin: "10px 0" }}>
              <p style={{ display: displayPozDetail, color: "#009286" }}>
                {addPozList.map((item) => (
                  <li
                    key={item.pos_id}
                  >{`پوز انتخابی : ${item.pos_name} ----- نوع پوز====>  پوز ثابت : ${item.pos_static} پوز سیار: ${item.pos_dynamic}`}</li>
                ))}
              </p>
            </div>
            {addPozList.length !== 0 && (
              <Button type="primary" onClick={clearPozRequestArray}>
                پاک کردن لیست
              </Button>
            )}
          </div>
          <div className="input-divider">
            <p>بیمه</p>
            {/*<div>
              <Input
                placeholder="امتیاز مورد نیاز"
                name="neededPoint"
                value={neededPoint}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    neededPoint: e.target.value,
                  }));
                }}
                // onBlur={(e) => handleValidateInput(e)}
              />
              </div>
            <div style={{ margin: "0" }}>
              <div className="date-picker-div">
                <p>بیمه از تاریخ : </p>
                <DatePicker
                  inputComponent={DatePickerInput1}
                  placeholder="انتخاب تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={change1}
                  id="datePicker2"
                  cancelOnBackgroundClick={true}
                />
                <Icon type="calendar" className="date-icon" />
              </div>
            </div>*/}
            <div style={{ margin: "0" }}>
              <div className="date-picker-div" >
                <p>بیمه تا تاریخ : </p>
                 <DatePicker
                      inputComponent={DatePickerInput2}
                      placeholder="انتخاب تاریخ"
                      format="jYYYY/jMM/jDD"
                      onChange={change2}
                      id="datePicker3"
                      cancelOnBackgroundClick={true}
                      // controllValue={toDate}
                      // onClearValue={()=>{
                      //   setState((prevState) => ({ ...prevState, toDate: '' }));
                      // }}
                  />
                <Icon type="calendar" className="date-icon" />
              </div>
            </div>
            <div style={{ margin: "0" }}>
              <div className="date-picker-div">
                <p>تاریخ تخصیص : </p>
                <DatePicker
                  inputComponent={DatePickerInput3}
                  placeholder="انتخاب تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={change3}
                  id="datePicker4"
                  cancelOnBackgroundClick={true}
                />
                <Icon type="calendar" className="date-icon" />
              </div>
            </div>
            <div style={{ margin: "0" }}>
              <Select
                placeholder="وضعیت"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.indexOf(input) >= 0
                }
                onChange={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    insSituation: value,
                  }))
                }
                className="select-area"
                style={{ width: 120 }}
              >
                <Option value="pending">بررسی نشده</Option>
                <Option value="approved">پذیرفته شده</Option>
                <Option value="rejected">رد شده</Option>
              </Select>
            </div>
            <div>
              <InsuranceModal />
              {insuranceReducer.insuranceArr.length > 0 && (
                <div className="pos-detail-list">
                  <p>لیست افراد تحت تکفل:</p>
                  {insuranceReducer.insuranceArr.map((item) => (
                    <div>
                      <p>نام و نام خانوادگی: {item.full_name}</p>
                      <p>کدملی: {item.national_id}</p>
                      <p>
                        نام پدر:
                        {item.father_name}
                      </p>
                      <p>نسبت: {item.relationship}</p>
                      <p>تاریخ تولد: {item.birth_date}</p>
                      <p>شماره شناسنامه: {item.birth_certificate_number}</p>
                      <p>شماره بیمه: {item.birth_certificate_number}</p>
                    </div>
                  ))}
                </div>
              )}
              {insuranceReducer.insuranceArr.length !== 0 && (
                <Button
                  type="primary"
                  onClick={clearInsuranceArray}
                  style={{ marginTop: "10px" }}
                >
                  پاک کردن لیست
                </Button>
              )}
            </div>
          </div>
          <div className="input-divider">
            <div className="date-div">
              <p>تاریخ شروع قرارداد : </p>
              <DatePicker
                inputComponent={DatePickerContractInput}
                placeholder="انتخاب تاریخ"
                format="jYYYY/jMM/jDD"
                onChange={changeContractDate}
                id="datePicker2"
                preSelected="1398/11/15"
                cancelOnBackgroundClick={true}
              />
              {/*<div className="input-number">
                <p style={{ marginLeft: "10px" }}>
                  تعداد افراد مورد درخواست بیمه تکمیلی :{" "}
                </p>
                <InputNumber
                  className="range"
                  min={0}
                  max={7}
                  defaultValue={0}
                  onChange={(value)=> handleSelectOption('insuranceNum', value)}
                />
              </div>*/}
            </div>
            <div className="footy">
              <p style={{ marginBottom: "8px" }}>پاخور مشتری : </p>
              <Radio.Group
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    pakhorRadio: e.target.value,
                  }))
                }
                value={pakhorRadio}
                className="poz-radio"
              >
                <Radio value={"good"}>خوب</Radio>
                <Radio value={"normal"}>متوسط</Radio>
                <Radio value={"bad"}>ضعیف</Radio>
              </Radio.Group>
            </div>
            <div>
              <TextArea
                value={description}
                onChange={(e) => {
                  e.persist();
                  setState((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
                placeholder="توضیحات بازاریاب"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </div>
          </div>
          <Button
            style={{ margin: "35px 0", width: "30%" }}
            type="primary"
            onClick={handleSendData}
          >
            ثبت فروشگاه
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
  insuranceReducer: store.insuranceReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCategories: (cat) => dispatch(setCategories(cat)),
  setPozes: (pozes) => dispatch(setPozes(pozes)),
  setFixPoz: (fix) => dispatch(setFixPoz(fix)),
  setPortablePoz: (portable) => dispatch(setPortablePoz(portable)),
  removePozDetail: () => dispatch(removePozDetail()),
  removeInsuranceArr: () => dispatch(removeInsuranceArr()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStoreForm);
