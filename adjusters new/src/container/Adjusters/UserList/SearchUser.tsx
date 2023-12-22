import React, { useState,FC } from "react";
import {Button, Input} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import {searchUser} from '../../../redux/actions'
import UserListSearch from './UserListSearch'


interface ISearchUserProps {
  renderComponent: any;
  closeModal:any
 
}

const SearchUser:FC<ISearchUserProps> = ({renderComponent,closeModal}) => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const { loadingSearch } = useSelector(
    (state: any) => state.staffType
  );

  const searchHandler = () => {
    dispatch(searchUser(searchName))
  };

  return (
    <>
      <div  className="wraperInput">
        <label> نام و نام خانوادگی :</label>
        <Input onChange={(e=>setSearchName(e.target.value))}/>
      </div>
      <div className="submit  marginTopBottom">
        <Button type="primary" onClick={searchHandler} icon={<SearchOutlined/>} loading={loadingSearch}   >
          جستجو
        </Button>
      </div>
      <UserListSearch renderComponent={renderComponent}  closeModal={closeModal}  />
    </>
  );
};

export default SearchUser;
