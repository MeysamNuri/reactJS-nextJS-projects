import React, { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfigProvider,
  Input,
  Button,
  Radio,
  Collapse,
} from "antd";
import type { RadioChangeEvent } from "antd";
import {
  requestDetermiBossHandler,
  fetchListBossAwaitRequest,
} from "../../../../../redux/actions";
import { applicantRequestTypeStatuses } from "../../../../../shared/ulitities/Enums/applicantRequestTypeStatuses";

const { Panel } = Collapse;
const { TextArea } = Input;

interface ITerminateActionProps {
  selectedRequest: any;
  modelExpertGrid: any;
  closeModal?: any;
}

const TerminateActionBoss: FC<ITerminateActionProps> = ({
  selectedRequest,
  modelExpertGrid,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const { loadingBossDetermin } = useSelector((state: any) => state.request);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const handleChangeResaon = (e: any) => {
    setDescription(e.target.value);
  };

  const submiteTerminateHandler = () => {
    const determinate = {
      id: selectedRequest.Id,
      status: value,
      response: description,
    };
    dispatch(
      requestDetermiBossHandler(
        determinate,
        () => {
          dispatch(fetchListBossAwaitRequest(modelExpertGrid));
        },
        () => closeModal()
      )
    );
  };

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="عملیات تایید / رد" key="1">
          <ConfigProvider direction="rtl">
            <div>
              <Radio.Group
                onChange={(e) => onChange(e)}
                value={value}
                // style={{ width: "19%" }}
              >
                <Radio
                  value={applicantRequestTypeStatuses.AcceptByGeneralManager}
                >
                  تایید
                </Radio>
                <Radio
                  value={applicantRequestTypeStatuses.RejectByGeneralManager}
                >
                  رد
                </Radio>
              </Radio.Group>
              <div style={{ margin: "20px" }}>
                <TextArea
                  autoSize
                  allowClear
                  onChange={(e) => handleChangeResaon(e)}
                />
              </div>
              <div className="submit">
                <Button
                  onClick={submiteTerminateHandler}
                  type="primary"
                  loading={loadingBossDetermin}
                >
                  ثبت
                </Button>
              </div>
            </div>
          </ConfigProvider>
        </Panel>
      </Collapse>
    </div>
  );
};

export default TerminateActionBoss;
