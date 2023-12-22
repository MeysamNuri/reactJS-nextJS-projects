import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Drawer,
  Button,
  ConfigProvider,
  List,
  Typography,
  Breadcrumb,
  Menu,
  Dropdown,
  Avatar,
  Modal,
} from "antd";
import {useSelector } from "react-redux";
import { DownOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Logout, TokenValue, Layout,ILayoutLink, } from "sanhab-components-library";
import HttpBaseConstant from "../../controler/services/HttpBaseConstant";
import Tiketing from "./Tiketing";
import UserMessagePage from "./handleUserMessage";
import Requests from "../DeskTop/adjustersDesktop/requests/Requests";
import BoardMember from "../DeskTop/adjustersDesktop/boardMembers/boardMember";
import MyMonthlyPerformance from "./adjustersDesktop/monthlyPerformance/MyMonthlyPerfomance";
import MyContractEvaluation from "./adjustersDesktop/contractEvaluation/MyContractEvaluation ";
import EvaluatorDesktopInformation from "../DeskTop/adjustersDesktop/EvalutorDesktopInformation";
import MyMessage from "../Message/MyMessage";
import MyEmployee from "../DeskTop/adjustersDesktop/employee/MyEmployee";
import AdjusterPortfoilo from "../DeskTop/adjustersDesktop/adjusterPortfoilo";
import Notifications from "./adjustersDesktop/notifications/deskTopNotifications";
import ApplicantWarnings from "../DeskTop/adjustersDesktop/applicantWarnings";
import IconLogo from "../../assets/images/login-logo.png";
import ChangePassword from "./PassWord";
import "./DeskTop.css";

const styles = {
  nav: {
    height: 50,
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    background: "#3499FF",
    justifyContent: "spaceBetween",
    // boxShadow: "0px 4px 4px rgba(118, 93, 160, 0.2)"
    // box
  },
  button: {
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 16,
  },
};

const DeskTop = () => {
  const { userLogin} = useSelector((state: any) => state.userLogin);
  const location = useLocation();
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
    document.body.classList.add("colapseDrawer");
  };
  const onClose = () => {
    setVisible(false);
    document.body.classList.remove("colapseDrawer");
  };

  const setNewRoute = () => {
    setVisible(false);
    document.body.classList.remove("colapseDrawer");
  };

  useEffect(() => {
    document.body.classList.remove("colapseDrawer");
  }, []);
  
useEffect(()=>{
if(userLogin?.Result?.StatusId==7|| !userLogin?.Result?.IsActive){
  history.push({pathname:"/adjuster-message"})
}
},[])
  let roadBreadCramp = null;
  let titleBreadCramp = null;
  switch (location.pathname) {
    case "/ticketing":
      roadBreadCramp = "ارزیابان / نظارت / تیک ";
      break;
    case "/requests":
    case "/":
      roadBreadCramp = "ارزیابان / نظارت / درخواست های ارزیابان";
      break;
    case "/informationBranches":
      roadBreadCramp = "ارزیابان / نظارت / اطلاعات اعضا و شعب";
      break;
    case "/myMonthlyPerformance":
      roadBreadCramp = "   ارزیابان / نظارت/ گزارش عملکرد ماهیانه ارزیاب";
      titleBreadCramp = "گزارش عملکرد ماهیانه ارزیاب";
      break;
    case "/myContractEvaluation":
      roadBreadCramp = "ارزیابان / نظارت / قراردادهای ارزیاب خسارت";
      titleBreadCramp = "قراردادهای ارزیاب خسارت";
      break;
    case "/myEmployee":
      roadBreadCramp = "ارزیابان/ نظارت/ اطلاعات هر کارمند";
      titleBreadCramp = "اطلاعات هر کارمند";
      break;
    case "/evaluatorDesktopInformation":
      roadBreadCramp = "ارزیابان/ نظارت/ اطلاعات هویتی ارزیاب خسارت";
      titleBreadCramp = "اطلاعات هویتی ارزیاب خسارت";
      break;
    case "/myMessage":
      roadBreadCramp = "ارزیابان/ نظارت/ پیام های دریافتی";
      titleBreadCramp = "پیام های دریافتی";
      break;
    case "/applicant-wraning":
      roadBreadCramp = "ارزیابان/ نظارت/ اخطارها";
      titleBreadCramp = "اخطارها";
      break;
    case "/mySms":
      roadBreadCramp = "ارزیابان/ نظارت/ پیامک های دریافتی";
      titleBreadCramp = "پیامک های دریافتی";
      break;
    case "/portfoilo":
      roadBreadCramp = "ارزیابان/ نظارت/ پرتفوی ارزیاب";
      titleBreadCramp = "پرتفوی ارزیاب";
      break;
    case "/notifications":
      roadBreadCramp = "ارزیابان/ نظارت/ اطلاعیه ها و بخشنامه ها";
      titleBreadCramp = "اطلاعیه ها و بخشنامه ها";
      break;
    default:
  }

  // let titleBreadCramp1 = null;
  // switch (location.pathname) {
  //   case "/ticketing":
  //     titleBreadCramp = "تیکت";
  //     break;
  //   case "/requests":
  //     titleBreadCramp = "درخواست ها";
  //     break;
  //   case "/informationBranches":
  //     titleBreadCramp = "اطلاعات اعضا و شعب";
  //     break;
  //   case "/registrationPerfomance":
  //     titleBreadCramp = "ثبت عملکرد";
  //     break;
  //   case "/registrationContract":
  //     titleBreadCramp = "ثبت قرارداد";
  //     break;
  //   default:
  //     break;
  // }
  const openPasswordModal = () => {
    setPassVisible(true);
  };

  const menu = (
    <Menu style={{ direction: "rtl", textAlign: "right" }}>
      <Menu.Item
        key="1"
        style={{ fontSize: "10px" }}
        onClick={openPasswordModal}
      >
        تغییر رمز عبور
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        onClick={() => {
          Logout();
          history.push("/login");
          window.location.reload();
        }}
        style={{ fontSize: "10px" }}
      >
        خروج
      </Menu.Item>
    </Menu>
  );
const links: ILayoutLink[] = [
  {
    path: "/evaluatorDesktopInformation",
    title: "اطلاعات هویتی ارزیاب خسارت",
    accessId: true,
    component: EvaluatorDesktopInformation,
    subLink: [],
  },
  {
    path: "/myMonthlyPerformance",
    title: "گزارش عملکرد ماهانه",
    accessId: true,
    component: MyMonthlyPerformance,
    subLink: [],
  },
  {
    path: "/myContractEvaluation",
    title: " قراردادهای ارزیاب خسارت",
    accessId: true,
    component: MyContractEvaluation,
    subLink: [],
  },
  {
    path: "/myEmployee",
    title: "  اطلاعات کارکنان",
    accessId: true,
    component: MyEmployee,
    subLink: [],
  },
  {
    path: "/myMessage",
    title: " پیام های دریافتی",
    accessId: true,
    component: MyMessage,
    subLink: [],
  },
  {
    path: "/applicant-wraning",
    title: " اخطارها",
    accessId: true,
    component: ApplicantWarnings,
    subLink: [],
  },
  {
    path: "/portfoilo",
    title: "پرتفوی ارزیاب",
    accessId: true,
    component: AdjusterPortfoilo,
    subLink: [],
  },
  {
    path: "/notifications",
    title: "اطلاعیه ها و بخش نامه ها",
    accessId: true,
    component: Notifications,
    subLink: [],
  },
]
  return (
    <div className="desktop">
      <ConfigProvider direction="rtl">
        <nav style={styles.nav}>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            overlayStyle={{ zIndex: 9999 }}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()} 
              style={{ marginLeft: "20px" }}
            >
           
              <span style={{ color: "#ffffff" }}> 
                {TokenValue()?.given_name}
              </span>
              <DownOutlined style={{ color: "#ffffff",marginRight:"5px" }} />
            </a>
          </Dropdown>
          {/* <UserOutlined style={{ color: "#ffffff" }} />  */}
          {/* <span style={{ margin: "0 8px 0 5px", cursor: "pointer" }}>
            <Avatar
              shape="square"
              size="default"
              icon={<UserOutlined />}
              style={{ color: "#000" }}
            />
          </span>   */}
          <div>
            {/* <p>{titleBreadCramp}</p> */}
            <div style={{ display: "flex" }}>
              <Breadcrumb className="breadCrumb">
                <Breadcrumb.Item>{roadBreadCramp}</Breadcrumb.Item>
              </Breadcrumb>
              <MenuOutlined
                style={{
                  color: "#ffffff",
                  marginRight: "20px",
                }}
                onClick={showDrawer}
                className="menuButton"
              />
            </div>
          </div>
        </nav>
        {/* <Menu
          // onClick={handleClick}
          style={{ width: 256 }}
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu key="sub1" title={localStorage.getItem("userName")}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </SubMenu>
        </Menu> */}
        <Drawer
          title={<img src={IconLogo} alt="logo" className="adjuster-logo" />}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          className="drawerContent"
        >
          <NavLink
            to="/evaluatorDesktopInformation"
            className="navlink"
            onClick={setNewRoute}
          >
            اطلاعات هویتی ارزیاب خسارت
          </NavLink>
          <NavLink to="/requests" className="navlink" onClick={setNewRoute}>
            درخواست های ارزیابان
          </NavLink>
          <NavLink
            to="/myMonthlyPerformance"
            className="navlink" 
            onClick={setNewRoute}
          >
            گزارش عملکرد ماهانه
          </NavLink>
          <NavLink
            to="/myContractEvaluation"
            className="navlink"
            onClick={setNewRoute}
          >
            قراردادهای ارزیاب خسارت
          </NavLink>
          <NavLink to="/myEmployee" className="navlink" onClick={setNewRoute}>
            اطلاعات کارکنان
          </NavLink>
          {/* <NavLink
            to="/informationBranches"
            className="navlink"
            onClick={setNewRoute}
          >
            اطلاعات اعضا و شعب
          </NavLink> */}
          {/* <NavLink to="/ticketing" className="navlink" onClick={setNewRoute}>
            تیکتینگ
          </NavLink> */}
          {/* <NavLink to="/inquiry" className="navlink" onClick={setNewRoute}>
            استعلام
          </NavLink> */}
          {/* <NavLink
            to="/letterLicenseViewer"
            className="navlink"
            onClick={setNewRoute}
          >
            مشاهده نامه و پروانه
          </NavLink> */}
          <NavLink to="/myMessage" className="navlink" onClick={setNewRoute}>
            پیام های دریافتی
          </NavLink>
          <NavLink to="/applicant-wraning" className="navlink" onClick={setNewRoute}>
           اخطارها
          </NavLink>
          <NavLink to="/portfoilo" className="navlink" onClick={setNewRoute}>
          پرتفوی ارزیاب
          </NavLink>
          <NavLink to="/notifications" className="navlink" onClick={setNewRoute}>
         اطلاعیه ها و بخشنامه ها
          </NavLink>
          {/* <NavLink
            to="/informationStackeholder"
            className="navlink"
            onClick={setNewRoute}
          >
            اطلاعات سهامداران
          </NavLink> */}
        </Drawer>
        <div className="contentDesktop">
          {/* <Switch>
            <Route path="/ticketing" component={Tiketing} exact />
            <Route path="/adjuster-message" component={UserMessagePage} exact />
            <Route path="/requests" component={Requests} exact />
            <Route path="/" component={Requests} exact />
            <Route path="/informationBranches" component={BoardMember} exact />
            <Route path="/myEmployee" component={MyEmployee} exact />
            <Route path="/myMessage" component={MyMessage} exact /> 
            <Route path="/portfoilo" component={AdjusterPortfoilo} exact />
            <Route path="/notifications" component={Notifications} exact />
            <Route path="/applicant-wraning" render={()=><ApplicantWarnings isFromDeskTop={true}/>} exact />
            <Route
              path="/myMonthlyPerformance"
              component={MyMonthlyPerformance}
              exact
            />
            <Route
              path="/myContractEvaluation"
              render={() => {
                return <MyContractEvaluation />;
              }}
              exact
            />
            <Route
              path="/evaluatorDesktopInformation"
              component={EvaluatorDesktopInformation}
              exact
            />
          </Switch> */}
      
        </div>
        <Modal
          title="تاریخ پایان فعالیت"
          visible={passVisible}
          footer={null}
          onOk={() => setPassVisible(false)}
          onCancel={() => setPassVisible(false)}
          width={500}
        >
          <ChangePassword />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DeskTop;
