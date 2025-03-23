import React, { useEffect } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import "../style.css";
import {
  setBankList,
  setSelectedBank,
  setSelectedBankName,
} from "../../Actions/FormAction";
import API from "./API";

function BankList({
  setBankList,
  FormReducer,
  setSelectedBank,
  setSelectedBankName,
}) {
  const { Option } = Select;

  async function fetchBankList() {
    try {
      const { data } = await API.bankList();
      setBankList(data.banks);
    } catch (response) {
      console.log(response);
    } finally {
    }
  }

  useEffect(() => {
    fetchBankList();
  }, []);

  return (
    <Select
      showSearch
      placeholder="لیست بانک ها"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.indexOf(input) >= 0
      }
      className="select-area"
      style={{ width: 120 }}
      onChange={(value, label) => {
        setSelectedBank(value);
        setSelectedBankName(label.props.label);
      }}
    >
      {FormReducer.bankList &&
        FormReducer.bankList.map((item) => (
          <Option label={item.name} value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
    </Select>
  );
}

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
});
const mapDispatchToProps = (dispatch) => ({
  setBankList: (bank) => dispatch(setBankList(bank)),
  setSelectedBank: (selectedBank) => dispatch(setSelectedBank(selectedBank)),
  setSelectedBankName: (selectedBankName) =>
    dispatch(setSelectedBankName(selectedBankName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BankList);
