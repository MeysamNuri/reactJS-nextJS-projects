import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import "../style.css";
import { setSelectedPoz, setSelectedPozName } from "../../Actions/FormAction";

function Poz({ FormReducer, setSelectedPoz, setSelectedPozName }) {
  const { Option } = Select;
  return (
    <Select
      placeholder="پوزهای موجود"
      showSearch
      className="select-area"
      style={{ width: 120 }}
      onChange={(value, lable) => {
        setSelectedPoz(value);
        setSelectedPozName(lable.props.label);
      }}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.indexOf(input) >= 0
      }
    >
      {FormReducer.pozList.map((item) => (
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
  setSelectedPoz: (sPoz) => dispatch(setSelectedPoz(sPoz)),
  setSelectedPozName: (sPozName) => dispatch(setSelectedPozName(sPozName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Poz);
