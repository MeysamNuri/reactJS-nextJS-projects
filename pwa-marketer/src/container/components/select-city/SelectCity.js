import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { setSelectedRegion, setRegionId } from "../../Actions/FormAction";
import { connect } from "react-redux";
import "../style.css";
import APIs from "./APIs";

const initialState = {
  cities: [],
  area: "",
  selectedCity: "",
  regions: [],
  selectedArea: [],
};

function SelectCity({ setSelectedRegion, FormReducer, setRegionId }) {
  const [
    { cities, area, selectedCity, regions, selectedArea },
    setState,
  ] = useState(initialState);

  const { Option } = Select;

  async function fetchCities() {
    try {
      const { data } = await APIs.cities();
      setState((prevState) => ({ ...prevState, cities: data.cities }));
    } catch (response) {
      console.log(response);
    }
  }
  async function fetchSelectedCities() {
    if (selectedCity) {
      try {
        const { data } = await APIs.selectedCities(selectedCity);
        setState((prevState) => ({ ...prevState, regions: data.regions }));
      } catch (response) {
        console.log(response);
      }
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchSelectedCities();
  }, [selectedCity]);

  useEffect(() => {
    regions.filter((item) => {
      if (item.id === parseInt(FormReducer.selectedRegion)) {
        setState((prevState) => ({ ...prevState, selectedArea: item.areas }));
      }
    });
  }, [FormReducer.selectedRegion]);

  function handleChangeArea(value) {
    setState((prevState) => ({ ...prevState, area: value }));
    setRegionId(value)
    
  }

  return (
    <div>
      <Select
        placeholder="انتخاب شهر"
        style={{ width: 120 }}
        className="select-area"
      >
        {cities
          ? cities.map((item) => (
              <Option
                value={item.id}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedCity: item.id,
                  }))
                }
                key={item.id}
              >
                {item.name}
              </Option>
            ))
          : ""}
      </Select>

      <Select
        showSearch
        style={{ width: 70 }}
        className="select-area"
        placeholder="انتخاب منطقه"
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
      >
        {regions
          ? regions.map((item) => (
              <Option
                value={item.id}
                onClick={() => setSelectedRegion(item.id)}
                key={item.id}
              >
                {item.name}
              </Option>
            ))
          : ""}
      </Select>

      <Select
        showSearch
        placeholder="انتخاب محله"
        style={{ width: 120 }}
        className="select-area"
        onChange={handleChangeArea}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
      >
        {selectedArea
          ? selectedArea.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))
          : ""}
      </Select>
    </div>
  );
}

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
});
const mapDispatchToProps = (dispatch) => ({
  setSelectedRegion: (region) => dispatch(setSelectedRegion(region)),
  setRegionId: (id) => dispatch(setRegionId(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectCity);
