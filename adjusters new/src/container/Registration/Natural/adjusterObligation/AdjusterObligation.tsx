import React, { useState, FC, useEffect } from "react";
import { Typography, Space, Button, Checkbox, ConfigProvider } from "antd";
import styles from "./AdjusterObligation.module.css";
import { useSelector, useDispatch } from "react-redux";

//redux actions
import {
  getPersonalInfoNaturalDraft,
  getPersonalInfoNaturalEdit,
} from "../../../../redux/actions";

const { Title, Text, Link } = Typography;

interface IAdjusterObligationProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const AdjusterObligation: FC<IAdjusterObligationProps> = ({
  onSubmit,
  onPrev,
}) => {
  const dispatch = useDispatch();
  const [consent, setConsent] = useState(false);

  const isUserEdit = localStorage.getItem("userEdit");

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");
  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const personalInfo = useSelector(
    (state: any) => state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  );
  const inquiry = useSelector((state: any) => state.NewDraftId.newId?.Result);

  const consentHandler = (e: any) => {
    setConsent(e.target.checked);
  };
  const nextButtonHandler = () => {
    onSubmit();
  };
  const prevButtonHandler = () => {
    onPrev();
  };
  useEffect(() => {
    if (isUserEdit) {
      dispatch(getPersonalInfoNaturalEdit(gotIdForMainEdit));
    } else if (!isUserEdit) {
      dispatch(getPersonalInfoNaturalDraft(draftId));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <div className={styles.texts}>
          <Title className={styles.header} level={3}>
            تعهدنامه ارزیابان خسارت بیمه ای حقیقی و حقوقی
          </Title>
          <p className="linHeight">
            بدينوسيله اينجانب &nbsp;
            <span>
              <b>
                {isUserEdit
                  ? personalInfo?.Result?.FirstName
                  : inquiry?.FirstName}
              </b>
            </span>
            &nbsp;
            <span>
              <b>
                {isUserEdit
                  ? personalInfo?.Result?.FamilyName
                  : inquiry?.FamilyName}
              </b>
            </span>
            &nbsp;متقاضي دريافت پروانه ارزياب خسارت بيمه اي خود را متعهد به
            رعايت قوانين و مقررات موضوعه و نيز اصول معمول و متداول ارزيابي خسارت
            بيمه اي و موازين امانت داري مي دانم و تعهد مي نمايم از انجام هر فعلي
            كه موجب غبن و اضرار طرفين قرارداد بيمه و يا به طور كلي صنعت بيمه
            گردد خودداري نمايم و همواره شرايط مقرر در آئين نامه شماره 85 مصوب
            شورايعالي بيمه و تغييرات و اصلاحيه هاي بعدي آن را رعايت نموده و خويش
            را با شرايط مذكور منطبق نمايم و نيز طبق ماده 8 آيين نامه ارزيابي
            خسارت بيمه اي ، تضمين مورد نظر بيمه مركزي ج.ا.ايران را نزد اين
            سازمان توديع نموده تا بيمه مركزي ج.ا.ايران بتواند به تشخيص خود براي
            جبران هر گونه ضرر و زيان كه از عمليات ارزيابي خسارت بيمه اي توسط
            اينجانب ناشي گردد استفاده كند. حق تشخيص ورود ضرر و زيان و نيز تعيين
            ميزان و نحوه جبران آن به طور قطعي و غيرقابل اعتراض با بيمه مركزي
            ج.ا.ايران خواهد بود
          </p>
          <p className="linHeight">
            براساس ماده 7 آیین نامه شماره 85 شورایعالی بیمه، اعضاء هیئت مدیره،
            مدیرعامل یا کارمند شاغل( اعم از رسمی،پیمانی، قراردادی و ساعتی)
            موسسات بیمه، بیمه مرکزی، نمایندگان حقوقی بیمه، دلالان رسمی حقوقی
            بیمه، دفاتر ارتباطی و یا سایر ارزیابان خسارت بیمه ای حقوقی و همچنین
            نمایندگان بیمه حقیقی و دلالان رسمی بیمه حقیقی نمی توانند ارزیاب
            خسارت بیمه ای حقیقی یا مؤسس و عضو مؤسسه غیرتجاری ارزیابی خسارت بیمه
            ای یا مدیرعامل، عضو هیأت مدیره، مسئول شعبه و کارمند ارزیابان خسارت
            بیمه ای حقوقی باشند
          </p>
          <p className="linHeight">
            تبصره1. ارزیاب خسارت بیمه ای حقیقی یا مؤسس و عضو مؤسسه غیرتجاری
            ارزیابی خسارت بیمه ای یا مدیرعامل، عضو هیأت مدیره، مسئول شعبه و
            کارمند ارزیابان خسارت بیمه ای حقوقی نمی توانند سهامدار عمده (بیش از
            5درصد) مؤسسات بیمه، نمایندگی بیمه حقوقی، دلال رسمی بیمه حقوقی و نیز
            سایر ارزیابان خسارت بیمه حقوقی باشند.
          </p>
          <p className="linHeight">
            تبصره2. ارزیابان خسارت بیمه ای حقیقی، اعضا مؤسسه غیرتجاری ارزیابی
            خسارت بیمه ای و مدیر عامل و اعضای هیأت مدیره شرکت های سهامی خاص و
            تعاونی متعارف ارزیابی خسارت بیمه ای و همچنین اقارب نسبی و سببی درجه
            1 از طبقه اول آنان نباید هیچ گونه نفع مستقیم یا غیر مستقیم در پرونده
            خسارت تحت ارزیابی خود داشته باشند.
          </p>

          <p className="linHeight">
            موسسین و اعضای موسسه غیر تجاری ارزیابی خسارت بیمه و یا مدیرعامل و
            اعضای هیئت مدیره شرکت سهامی خاص و تعاونی متعارف نمی توانند به عنوان
            ارزیاب خسارت بیمه ای حقیقی و به صورت مستقل فعالیت نمایند
          </p>
          <p className="linHeight">
            عدم رعایت مفاد اين تعهدنامه به تشخيص بيمه مركزي ج.ا.ايران، اين
            سازمان را مجاز به لغو پروانه ارزيابي خسارت بيمه اي اينجانب مي نمايد
          </p>
        </div>

        <div className={styles.checkBox}>
          <Checkbox onChange={consentHandler}>قبول دارم</Checkbox>
        </div>
        <div className={styles.buttons}>
          <Button onClick={nextButtonHandler} disabled={!consent}>
            مرحله بعدی
          </Button>
          <Button onClick={prevButtonHandler}>مرحله قبلی</Button>
        </div>
      </Space>
    </div>
  );
};

export default AdjusterObligation;
