import React, { useState, useMemo, useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Table,
    Space,
    Input,
} from "antd";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { PlusOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import {
    fetchAdjusterPortfoilo,
} from "../../../redux/actions";
export interface AdjusterPortfoiloProps {
    
}
 
const AdjusterPortfoilo: React.FC<AdjusterPortfoiloProps> = () => {
    const dispatch = useDispatch();
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef<any>(null);
    const [pageModel, setPageModel] = useState({
        pageSize: 20,
        pageIndex: 1
    })
    const {adjusterPortfoilo,adjusterPortfoiloLoading}=useSelector((state:any)=>state.request)

    useEffect(()=>{
        dispatch(fetchAdjusterPortfoilo())
    },[])
    let dataSource = adjusterPortfoilo?.Result?.map((item: any) => {
        let obj = {
            Id: item.Id,
            key: item.Id,
            DocLostRegistrationDate:  moment(item.DocLostRegistrationDate?.split("T")[0]).format(
                "jYYYY/jMM/jDD"
            ),
            CompanyName: item.CompanyName,
            PrintCompanyDocNo: item.PrintCompanyDocNo,
            CompanyDocNo: item.CompanyDocNo,
         

        };

        return obj;
    });
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: any) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`جستجو ${
                dataIndex === "PrintCompanyDocNo"
                  ? "شماره بیمه نامه چاپی"
                  : dataIndex === "CompanyDocNo"?
                 "شماره پرونده خسارت"
                  : dataIndex === "CompanyName"?
                 "نام شرکت"
                  : null
              }`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Space>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                باز نشانی
              </Button>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                جستجو
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: any) => (
          <FilterFilled
            style={{
              color: filtered ? "#E64848" : undefined,
            }}
          />
        ),
        render: (text: any) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: "#ffc069",
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />
          ) : (
            text
          ),
      });

      const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
     
        
      };
    
      const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText("");
      };


    let columns: any = [
        {
            title: "تاریخ تشکیل پرونده خسارت",
            dataIndex: "DocLostRegistrationDate",
            key: "DocLostRegistrationDate",
            ellipsis: true,
            // ...getColumnSearchProps("EffectiveDate"),
        },
           
     
            {
                title: "نام شرکت",
                dataIndex: "CompanyName",
                key: "CompanyName",
                ellipsis: true,
                filterMode: 'tree',
                ...getColumnSearchProps("CompanyName"),
                filterSearch: true,
                onFilter: (value: string, record:any) => record.CompanyName?.startsWith(value),
            } ,
     

      
        {
            title: "شماره بیمه نامه چاپی",
            dataIndex: "PrintCompanyDocNo",
            key: "PrintCompanyDocNo",
            ellipsis: true,
            ...getColumnSearchProps("PrintCompanyDocNo"),
            filterSearch: true,
            onFilter: (value: string, record:any) => record.PrintCompanyDocNo?.startsWith(value),

        },
        {
            title: "شماره پرونده خسارت",
            dataIndex: "CompanyDocNo",
            key: "CompanyDocNo",
            ellipsis: true,
            ...getColumnSearchProps("CompanyDocNo"),
            filterSearch: true,
            onFilter: (value: string, record:any) => record.CompanyDocNo?.startsWith(value),
           
        },
    ]
    return ( 
        <div>
    
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={adjusterPortfoiloLoading}
            // onChange={handleTableChange}
            pagination={{
                pageSize: pageModel.pageSize,
                total: adjusterPortfoilo?.TotalCount,
                showSizeChanger: true,
                showTotal: (total) => `تعداد کل : ${total} `,
                current:pageModel.pageIndex,
                onChange: (current: number, pageSize: any) =>
                setPageModel({
                  ...pageModel,
                  pageIndex: current,
                  pageSize: pageSize,
                }),
                locale: { items_per_page: "/ صفحه" },
            }}
            locale={{
             
                filterReset: (
                    <span
                        onClick={() => {
                            document
                                .querySelector(".ant-dropdown")!
                                .classList.add("ant-dropdown-hidden");
                           
                        }}
                    >
                        باز نشانی
                    </span>
                ),
                filterConfirm: "جستجو",
                filterEmptyText: "یافت نشد",
                emptyText: "لیست خالی است",
            }}
        />

    </div>
     );
}
 
export default AdjusterPortfoilo;