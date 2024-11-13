import React, { useState, useMemo, useEffect, FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Drawer,
    Button,
    Row,
    Col,
    Modal,
    ConfigProvider,
    Card,
    Spin
} from "antd";
import {
    fetchAllNotifications
} from "../../../../redux/actions";
import moment from "jalali-moment";
import form from '../../../../assets/images/form.svg'
import notification from '../../../../assets/images/notification.svg'
import CreatNotificationMoal from './createNotificationModal'
import './styles.css'
export interface NotificationsProps {

}



const Notifications: React.FC<NotificationsProps> = () => {
    const { notificationsList, notificationLoading } = useSelector((state: any) => state.notifications)

    const dispatch = useDispatch();
    const [selectedRecord, setSelectedRecord] = useState<any>({})
    const [visible, setVisible] = useState(false);
    const [showNoticDetails, setShowNoticDetails] = useState<boolean>(false)
    const [filterList, setFilterList] = useState<any>([])
    const [pageModel, setPageModel] = useState({
        pageSize: 100000,
        pageIndex: 1,
    });

    const { Meta } = Card;
    let modelRequest = useMemo(() => {
        return {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };
    }, [pageModel, filterList]);
    useEffect(() => {
        dispatch(fetchAllNotifications(modelRequest))
    }, [])

    const handleNotificationsModal = (item: any) => {
        setVisible(true)
        setSelectedRecord(item)
        setShowNoticDetails(true)
    }

    return (

        <ConfigProvider direction="rtl">
            {
                notificationLoading ? <Spin style={{ width: "100%", margin: "auto" }} /> :
                    <>
                        <Row>
                            <h3 style={{ fontWeight: "bolder" }}>اعلانات</h3>
                        </Row>
                        <Row>
                            {
                                notificationsList?.Result?.map((item: any) => (

                                    <Col xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                        <Card
                                            onClick={() => handleNotificationsModal(item)}
                                            hoverable
                                            style={{ width: 240, marginBottom: "20px" }}
                                            cover={<img style={{ height: "240px" }} src={"data:image/png;base64," + item?.Picture?.Content} alt="cover pic" />}
                                        >
                                            <div className="notic-date-holder">
                                            {moment(item?.CreatedDate?.split("T")[0]).format(
                                                    "jYYYY-jM-jD"
                                                )}
                                            </div>
                                            <div className="notfic-badge">
                                                <img src={item.Type == 0?notification :form} alt="notification" />
                                                 <span>{item.Type == 0 ? ("اطلاعیه") : ("بخشنامه")}</span>
                                            </div>
                                            <Meta title={item.Title} description={item.Description} />
                                        </Card>
                                    </Col>


                                ))
                            }
                        </Row>
                    </>
            }

            <Modal
                title={`ایجاد بخشنامه ها و اعلامیه ها`}
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}

                width={1000}
            >
                <CreatNotificationMoal disableDeletefiles={true} showNoticDetails={showNoticDetails} selectedRecord={selectedRecord} onCancel={() => setVisible(false)} modelRequest={modelRequest} />
            </Modal>
        </ConfigProvider>
    );
}

export default Notifications;