//libraries
import React, { useState, useEffect } from "react";
import { Steps, ConfigProvider, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RemoveCookie } from "sanhab-components-library";
//components
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import AdjusterObligation from "./adjusterObligation/AdjusterObligation";
import MoneyLaunderingObligation from "./moneyLaunderingObligation/MoneyLaunderingObligation";
import FieldInfo from "./FieldInfo/FieldInfo";
import WorkPlace from "./WorkPlace/WorkPlace";
import Resume from "./Resume/Resume";
import Document from "./Document/Document";
import FinalApproval from "./FinalApproval/FinalApproval";
import {
  registrationComponentUnmount,
  getBaseInfo,
} from "../../../redux/actions";
import { ReactComponent as Help } from "../../../assets/images/help.svg";
import classes from "../Natural/Natural.module.css";

const { Step } = Steps;

const Judical = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const isUserEdit = useSelector((state: any) => state?.userEdit?.userEdit);

  const submitHandler = () => {
    setCurrent(current + 1);
  };

  const prevHandler = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    RemoveCookie("sanhab-auth");
    RemoveCookie("sanhab-access");
  }, []);

  const steps = [
    {
      title: "مرحله اول",
      description: "اطلاعات شخصی",
      content: <PersonalInfo onSubmit={submitHandler} />,
    },
    {
      title: "مرحله دوم",
      description: "تعهد ارزیابان",
      content: (
        <AdjusterObligation onSubmit={submitHandler} onPrev={prevHandler} />
      ),
    },
    {
      title: "مرحله سوم",
      description: "تعهد پولشویی",
      content: (
        <MoneyLaunderingObligation
          onSubmit={submitHandler}
          onPrev={prevHandler}
        />
      ),
    },
    {
      title: "مرحله چهارم",
      description: "اطلاعات رشته",
      content: <FieldInfo onSubmit={submitHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله پنجم",
      description: "محل فعالیت",
      content: <WorkPlace onSubmit={submitHandler} onPrev={prevHandler} />,
    },
    // {
    //   title: "مرحله ششم",
    //   description: "سوابق کاری",
    //   content: <Resume onSubmit={submitHandler} onPrev={prevHandler} />,
    // },
    {
      title: "مرحله ششم",
      description: "مدارک و مستندات",
      content: <Document onSubmit={submitHandler} onPrev={prevHandler} />,
    },
    {
      title: "مرحله هفتم",
      description: "تایید نهایی",
      content: <FinalApproval onPrev={prevHandler} />,
    },
  ];

  if (isUserEdit) {
    steps.pop();
    steps[6] = {
      title: "مرحله هفتم",
      description: " مدارک و مستندات و تایید نهایی ویرایش و ارسال",
      content: <Document onSubmit={submitHandler} onPrev={prevHandler} />,
    };
  }

  //lifecyclehooks here
  useEffect(() => {
    dispatch(getBaseInfo());
    return () => {
      dispatch(registrationComponentUnmount());
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className="help marginBottom">
        <Tooltip placement="rightBottom" title="مشاهده فایل راهنما">
          <a
            download
            href={
              process.env.PUBLIC_URL +
              "/راهنمای کاربری ثبت نام ارزیاب - دادگستری.pdf"
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
          <Steps current={current}>
            {steps?.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </Steps>
        </ConfigProvider>
        <div className={classes.StepsContent}>{steps[current].content}</div>
      </React.Fragment>
    </div>
  );
};

export default Judical;
