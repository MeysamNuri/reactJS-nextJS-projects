import React, { FC ,useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Collapse } from "antd";
import { dlFileHandler } from "../../redux/actions";
import { ReactComponent as Download } from "../../assets/images/download.svg";

const { Panel } = Collapse;

const DownloadFiles = () => {
  const dispatch = useDispatch();
  const { loadingDownload } = useSelector((state: any) => state.uploadFile);
  const [data,setData]=useState<any>(null)
  const { resultId, loadingResultId } = useSelector(
    (state: any) => state.request
  );

  const fileDownloader = (record: any) => {
    dispatch(dlFileHandler(record.Id));
  };

useEffect(()=>{
  if(resultId?.Result?.ApplicantRequestFileCollections?.length>0){
    setData(
      resultId?.Result?.ApplicantRequestFileCollections.map((item:any)=>{
        let files={
          Id:item?.Files?.map((f:any)=>f.Id),
          DocumentTitle:item.ApplicantRequestTypeDocument?.DocumentTitle,
          FileName:item?.Files?.map((f:any)=>f.FileName)
        }
      return files
      })
    )
  }
 else if(resultId?.Result?.Files?.length>0){
    setData(
      resultId?.Result?.Files.map((item:any)=>{
        let files={
          Id:item.Id,
          DocumentTitle:"-",
          FileName:item?.FileName 
        }
      return files
      })
    )
  }
  

},[resultId])


  //coloumns Table
  let columns: any = [
    {
      title: "نوع مستند",
      dataIndex: "DocumentTitle",
      // width: "7%",
    }, 
    {
      title: "نام فایل",
      dataIndex: "FileName",
      // width: "7%",
    },

    {
      title: "عملیات",
      render: (text: any, record: any) => (
     
        
        <>
        
            <Button
              onClick={() => fileDownloader(record)}
              icon={<Download style={{ marginTop: "5px" }} />}
              loading={loadingDownload === record.Id}
            />
         
        </>
      ),
    },
  ];

  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="مشاهده فایل ها" key="1">
          <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            loading={loadingResultId}
            locale={{
              emptyText: "فایلی بارگذاری نشده است.",
            }}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default DownloadFiles;
