//libraries
import React, { useState, FC, useEffect } from "react";
import { Steps, ConfigProvider, message, Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RemoveCookie } from "sanhab-components-library";

//redux actions
import { registrationComponentUnmount } from "../../../redux/actions";

//import { History, LocationState } from "history";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import WorkLocation from "./WorkLocation/WorkLocation";
import BoardMember from "./BoardMember/BoardMember";
import AdjusterObligation from "./adjusterObligation/AdjusterObligation";
import MoneyLaunderingObligation from "./moneyLaunderingObligation/MoneyLaunderingObligation";
import WorkExperience from "./WorkExperience/WorkExperience";
import Stockholder from "./Stockholder/Stockholder";
import Document from "./Document/Document";
import Employee from "./Employee/Employee";
import FinalApproval from "./FinalApproval/FinalApproval";
import { ReactComponent as Help } from "../../../assets/images/help.svg";

//styles
import classes from "../Natural/Natural.module.css";

const { Step } = Steps;

interface MyState {
  current: number;
}

const Legal: FC<MyState> = () => {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(0);
  const isUserEdit = useSelector((state: any) => state?.userEdit?.userEdit);

  const nextHandler = () => {
    setCurrent(current + 1);
  };

  const prevHandler = () => {
    setCurrent(current - 1);
  };

  const stepsDraft = [
    {
      title: "مرحله اول",
      description: "مشخصات شرکت",
      content: <CompanyInfo onSubmit={nextHandler} />,
    },
    {
      title: "مرحله دوم",
      description: "محل فعالیت",
      content: <WorkLocation onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله سوم",
      description: "اعضای هیات مدیره",
      content: <BoardMember onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله چهارم",
      description: "تعهد ارزیابان",
      content: (
        <AdjusterObligation onSubmit={nextHandler} onPrev={prevHandler} />
      ),
    },
    {
      title: "مرحله پنجم",
      description: "تعهد پولشویی",
      content: (
        <MoneyLaunderingObligation
          onSubmit={nextHandler}
          onPrev={prevHandler}
        />
      ),
    },
    {
      title: "مرحله ششم",
      description: "سوابق مدیر عامل",
      content: <WorkExperience onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله هفتم",
      description: "سهامداران",
      content: <Stockholder onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله هشتم",
      description: "کارکنان",
      content: <Employee onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله نهم",
      description: "مدارک",
      content: <Document onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله دهم",
      description: "ثبت نهایی",
      content: <FinalApproval onPrev={prevHandler} />,
    },
  ];

  const stepsEdit = [
    {
      title: "مرحله اول",
      description: "مشخصات شرکت",
      content: <CompanyInfo onSubmit={nextHandler} />,
    },
    {
      title: "مرحله دوم",
      description: "محل فعالیت",
      content: <WorkLocation onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله سوم",
      description: "اعضای هیات مدیره",
      content: <BoardMember onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله چهارم",
      description: "تعهد ارزیابان",
      content: (
        <AdjusterObligation onSubmit={nextHandler} onPrev={prevHandler} />
      ),
    },
    {
      title: "مرحله پنجم",
      description: "تعهد پولشویی",
      content: (
        <MoneyLaunderingObligation
          onSubmit={nextHandler}
          onPrev={prevHandler}
        />
      ),
    },

    {
      title: "مرحله ششم",
      description: "سوابق مدیر عامل",
      content: <WorkExperience onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله هفتم",
      description: "سهامداران",
      content: <Stockholder onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله هشتم",
      description: "کارکنان",
      content: <Employee onSubmit={nextHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله نهم",
      description: " مدارک و مستندات و تایید نهایی ویرایش و ارسال",
      content: <Document onSubmit={nextHandler} onPrev={prevHandler} />,
    },
  ];

  // const windowWidth = window.innerWidth;
  // const winWidthSmall = windowWidth < 900 ? "vertical" : "horizontal";

  //lifecyclehooks here
  useEffect(() => {
    return () => {
      dispatch(registrationComponentUnmount);
    };
  }, []);

  useEffect(() => {
    RemoveCookie("sanhab-auth");
    RemoveCookie("sanhab-access");
  }, []);

  return (
    <div className={classes.root}>
      <div className="help marginBottom">
        <Tooltip placement="rightBottom" title="مشاهده فایل راهنما">
          <a
            download
            href={
              process.env.PUBLIC_URL +
              "/راهنمای کاربری ثبت نام ارزیاب - حقوقی.pdf"
            }
            className="downloadFile"
          >
            <span>مشاهده فایل راهنما</span>
            <Help />
          </a>
        </Tooltip>
      </div>
      <React.Fragment>
        <ConfigProvider direction="rtl">
          <Steps
            current={current}
            className={classes.steps}
            //direction={winWidthSmall}
          >
            {isUserEdit
              ? stepsEdit?.map((item: any) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={item.description}
                  />
                ))
              : stepsDraft?.map((item: any) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={item.description}
                  />
                ))}
          </Steps>
        </ConfigProvider>
        <div className={classes.StepsContent}>
          {isUserEdit
            ? stepsEdit[current].content
            : stepsDraft[current].content}
        </div>
      </React.Fragment>
    </div>
  );
};

export default Legal;
