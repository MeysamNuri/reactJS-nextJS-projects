import React, { FC, useState,useEffect } from "react";
import { Checkbox, Button } from "antd";
import classes from "./Registration.module.css";

interface IInitialObligation {
  handleOtpFromInitialObligaiton: any;
}

const InitialObligation: FC<IInitialObligation> = ({
  handleOtpFromInitialObligaiton,
}) => {
  const [consent, setConsent] = useState(false);
  const onConsensusChange = (e: any) => {
    setConsent(e.target.checked);
  };

  return (
    <div className={classes.initialObligation}>
      <p>
        "الزامات و شرایط جهت اخذ پروانه ارزیابی خسارت بیمه در سامانه الکترونیکی
        بیمه مرکزی ج.ا.ایران  در اجرای ماده 3 آیین نامه تنظیم امور ارزیابی خسارت
        بیمه ای " - داشتن حداقل 25 سال سن  - داشتن حداقل مدرک تحصیلی کارشناسی 
        - انجام خدمت وظیفه عمومی و یا ارائه کارت معافیت دائم برای آقایان - داشتن
        گواهی سه سال سابقه کار مفید در ارزیابی و کارشناسی خسارت در زمینه تخصصی
        مورد تقاضا - موفقیت در آزمون کتبی / گذراندن دوره آموزشی تخصصی و توجیهی –
        مراجعه به سایت پژوهشکده بیمه – تلفن تماس: 22071891  کارشناسان رسمی
        دادگستری و کارشناسان رسمی قوه قضائیه (مشمولین آیین نامه شماره 85.1) با
        ارائه پروانه کارشناسی معتبر  می توانند تقاضای دریافت پروانه ارزیابی
        خسارت بیمه ای در یک زمینه تخصصی بیمه ای متناسب با پروانه کارشناسی خود در
        سامانه الکترونیکی بیمه مرکزی ج.ا.ایران نمایند. این اشخاص از آزمون کتبی و
        مصاحبه تخصصی بیمه مرکزی معاف و موظف به گذراندن دوره آموزشی مرتبط می
        باشند. افرادی که حداقل 5 سال سابقه ارزیابی و کارشناسی خسارت در زمینه
        تخصصی مورد تقاضا در صنعت بیمه را داشته باشند از آزمون کتبی معاف
        هستند. گواهی سابقه فعالیت رسمی از سوی ستاد شرکت های بیمه در تهران به
        اداره کل پذیرش مؤسسات و دفاتر بیمه‌ای بیمه مرکزی از طریق سیستم اتوماسیون
        اداری فیمابین (سیماب) صورت پذیرد و تصویر آن نیز در سامانه ثبت
        نام بارگذاری گردد. داشتن حداقل مدرک تحصیلی برای افرادی که 15 سال در
        ارزیابی و کارشناسی خسارت در زمینه تخصصی مورد تقاضا سابقه فعالیت داشته
        باشند دیپلم / فوق دیپلم می باشد. مراجع صلاحیت دار برای صدور گواهی مذکور
        شامل:  شورای فنی، مدیریت های تخصصی شرکتهای بیمه، وزارت خانه ها و نهادها
        و سازمانهای دولتی و عمومی غیردولتی، مراجع قضایی، مراکز کانونهای کارشناسی
        رسمی دادگستری و نظام مهندسی (ماده 27) و سایر مراجع صلاحیتدار مورد تایید
        بیمه مرکزی. همچنین سوابق فعالیت متقاضیان از شرکتها و موسسات ارزیابی
        خسارت بیمه در صورت ثبت فعالیت نامبردگان در سامانه سنهاب قابل پذیرش می
        باشد. (سوابق باید مرتبط با فعالیت شرکت باشد) 
      </p>
      <p>
        تذكر مهم :  1.عدم بارگذاري هر يك از مستندات مذكور، يا بارگذاري مستندات
        نامعتبر يا ناخوانا توسط متقاضي، به منزله نداشتن شرايط بوده و مورد پذيرش
        بيمه مركزي قرار نخواهد گرفت.(تصاویر  به صورت رنگی از اصل مدرک بارگذاری
        شود و فرمت pdf نباشد) 
      </p>
      <p>
        2. چنانچه در هر يك از مراحل؛ مصاحبه تخصصي، حضور در دوره آموزشي تخصصي و
        صدور پروانه مشخص گردد اطلاعات، مدارك و مستندات ارسالي متقاضي، منطبق با
        شرايط و ضوابط آیین نامه شماره های  85 و 85.1 مصوب شورای عالی بیمه نبوده
        است، فرآيند ثبت نام در دوره كان لم يكن تلقي گرديده و مسئوليت آن صرفاً بر
        عهده متقاضي مي باشد.
      </p>
      <p>
        3. پس از بررسی و تأیید مدارک، تاریخ های مصاحبه حضوری به صورت پیام به
        متقاضیان واجد شرایط اعلام خواهد شد. از تماس های غیرضروری خودداری گردد.
         جهت ثبت نام  مصاحبه ارزیابی خسارت بیمه و یا تشکیل پرونده برای اخذ
        پروانه ارزیابی به سامانه الکترونیکی بیمه مرکزی – بخش ثبت اطلاعات
        متقاضیان شبکه فروش (نماینده، کارگزار، ارزیاب خسارت، کارگزار بیمه
        اتکایی).... مراجعه فرمایید.  
      </p>
                   آدرس سایت{" "}
      <a href="https://sanhabadjstrs.centinsur.ir" className={classes.atag}>
        https://sanhabadjstrs.centinsur.ir{" "}
      </a>
       
      <p>
          زمان ثبت نام: ثبت نام برای مصاحبه حضوری در ابتدای هر فصل
        (فروردین/تیر/مهر/دی) به مدت یکماه از طریق سیستم سنهاب بیمه مرکزی امکان
        پذیر می باشد.  ثبت نام کارشناسان رسمی دادگستری/قوه قضائیه دارای بازه
        زمانی نبوده و در تمامی فصول سال امکان پذیر می باشد. ملاحظات: به عناوین
        ثبت نام در سایت دقت فرمایید تا مسیر ثبت نام صحیح انتخاب شود - مشمولین
        آیین نامه شماره 85 جهت ثبت نام در مصاحبه براساس بازه زمانی اعلام شده
        اقدام نمایند - مشمولین آیین نامه شماره 85.1 جهت ثبت نام در بخش کارشناسان
        رسمی دادگستری/قوه قضائیه اقدام نمایند مدارک فقط از طریق سامانه سنهاب
        قابل بررسی می باشد، لذا از مراجعه حضوری خودداری نمایید و در صورت بروز
        مشکل در سیستم الکترونیکی سامانه به مدیریت فاوا تماس حاصل فرمایید.
      </p>
      <Checkbox onChange={onConsensusChange}>
        قوانین فوق را مطالعه نموده ام و قبول دارم
      </Checkbox>
      <br />
      <br />
      <div className="buttonRight">
        <Button
          type="primary"
          onClick={() => handleOtpFromInitialObligaiton()}
          disabled={!consent}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default InitialObligation;
