import { toast } from "react-toastify";

const fileExtentionValidator = (
  e: any,
  volume: number,
  formats: any,
  successFunction: () => void
) => {
  let fileName = [];
  fileName.push(e.target.files[0]);
  let file = fileName[0];
  if (file?.size > volume) {
    toast.error("حجم تصویر ارسالی بیش از حد مجاز  (500 کیلوبایت) است ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (formats.includes(file?.type)) {
    successFunction();
  } else {
    toast.error("قابل پذیرش است jpg یا png ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default fileExtentionValidator;
