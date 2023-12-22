import React, { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { ICurrentBoardMember } from "../../../../shared/ulitities/Model/boardMember";
import { updateBoardMemberEndDate } from "../../../../redux/actions";

interface IDateProps {
  closeModal: () => void;
  selectedBoardMember: ICurrentBoardMember;
}

const Date: FC<IDateProps> = ({ closeModal, selectedBoardMember }) => {
  const dispatch = useDispatch();
  const [valDate, setValDate] = useState(moment());
  const userIdLogin = useSelector(
    (state: any) => state.userLogin.userLogin?.Result
  );
  let cooperationEndDate = moment(valDate.toDate()).format("YYYY-MM-DD");

  let dateCooperationEndDate = {
    cooperationEndDate: cooperationEndDate,
  };

  const submitDateHandler = () => {
    dispatch(
      updateBoardMemberEndDate(
        3,
        selectedBoardMember.Id,
        dateCooperationEndDate
      )
    );
    closeModal();
  };
  return (
    <div>
      <div className="lableCalendar">
        <label> تاریخ پایان فعالیت :</label>
        <DatePicker2
          placeholder="انتخاب تاریخ"
          value={valDate}
          onChange={(value: any) => setValDate(value)}
        />
      </div>
      <div className="nextButton">
        <Button type="primary" onClick={submitDateHandler}>
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default Date;
