import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import { FindAccess } from "sanhab-components-library";
import { api } from "../../../httpServices/service";
import {
  Col,
  Row,
  Button,
  Modal,
  Pagination,
  ConfigProvider,
  Popconfirm,
  Tooltip,
  Alert,
  Spin
} from "antd";
import moment from "jalali-moment";
import { PlusOutlined } from "@ant-design/icons";
import CreateCourse from "./CreateCourse";
import { IItemCourse } from "./interface-course";
import { useDeletCourse } from "../AdjustersHook";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import { ReactComponent as Calendar } from "../../../assets/images/calendar.svg";
import "./Courses.css";

const Courses = () => {
  const [pageModel, setPageModel] = useState({
    pageSize: 9,
    pageIndex: 1,
  });
  const [visible, setVisible] = useState(false);
  const [itemCourse, setItemCourse] = useState(null);
  const [addForm, setAddForm] = useState(false);

  //remove Course
  const [remove] = useDeletCourse();

  //api Request Course Pagination
  const fetchCourses = (key: number, page = 1) =>
    api.get(
      `Course/all/paged?pageSize=${pageModel.pageSize}&pageNo=${pageModel.pageIndex}`
    );

  const { resolvedData, latestData, isLoading } = usePaginatedQuery(
    ["projectsCourse", pageModel],
    fetchCourses,
    {
      staleTime: 1000 * 2 * 60,
    }
  );

  //create NewCourse
  const showCreateCoursesHandler = () => {
    setAddForm(true);
    setVisible(true);
  };

  //change Page
  const changePageHandler = (current: number, pageSize: any) => {
    setPageModel({
      ...pageModel,
      pageIndex: current,
      pageSize: pageSize,
    });
  };

  //edit Course
  const editCourseHandler = (id: any) => {
    api.get(`/course/${id}`).then((res) => {
      setItemCourse(res.data.Result);
    });
    setVisible(true);
    setAddForm(false);
  };

  //get Selected Course
  // useEffect(() => {
  //   if (selectedCourse && selectedCourse.Id !== "") {
  //     api.get(`/course/${selectedCourse}`).then((res) => {
  //       setItemCourse(res.data.Result);
  //     });
  //   }
  // }, [selectedCourse]);

  //remove Course
  const removeCourseHandler = (id: any) => {
    remove(id);
  };

  return (
    <div className="coursesContainer">
      {FindAccess(userAccessList.Adjusters_CreateCourse) && (
        <Button
          type="primary"
          onClick={showCreateCoursesHandler}
          icon={<PlusOutlined />}
        >
          ایجاد دوره
        </Button>
      )}
      {FindAccess(userAccessList.Adjusters_ViewCourses) ? (
        <>
          {isLoading ? (
            <Spin tip="Loading...">
              <Alert
                message="لیست دوره ها"
                description="در حال بروزرسانی لیست دوره ها"
                type="info"
              />
            </Spin>
          ) : (
            <Row gutter={16} className="gridCourses">
              {resolvedData?.data?.Result?.map((course: IItemCourse) => {
                let classes = [""];
                switch (course?.CourseType?.Id) {
                  case 1:
                    classes.push("natural");
                    break;
                  case 2:
                    classes.push("iconlegal");
                    break;
                  case 3:
                    classes.push("judical");
                    break;
                  default:
                    break;
                }

                return (
                  <React.Fragment key={course.CourseId}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                      <div className="card">
                        <Row>
                          <Col span={20} order={1}>
                            <div className="title">
                              <span className={classes.join(" ")}></span>
                              <span>{`${course?.Title} `}</span>
                            </div>
                          </Col>
                          <Col span={4} order={2}>
                            <div className="editable">
                              {FindAccess(
                                userAccessList.Adjusters_DeleteCourse
                              ) && (
                                <Popconfirm
                                  title="از حذف دوره مورد نظر مطمئن هستید؟"
                                  onConfirm={() =>
                                    removeCourseHandler(course?.CourseId)
                                  }
                                  okText="بله"
                                  cancelText="خیر"
                                >
                                  <Tooltip
                                    placement="topLeft"
                                    title="حذف"
                                    overlayClassName="popAction"
                                  >
                                    <a className="action">
                                      <Trash />
                                    </a>
                                  </Tooltip>
                                </Popconfirm>
                              )}
                              {FindAccess(
                                userAccessList.Adjusters_EditCourse
                              ) && (
                                <Tooltip title="ویرایش">
                                  <a
                                    onClick={() =>
                                      editCourseHandler(course.CourseId)
                                    }
                                    className="action"
                                  >
                                    <Edit />
                                  </a>
                                </Tooltip>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row className="DateCourse">
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="registerDate">
                              <Calendar />
                              <span className="time"> شروع ثبت نام :</span>
                              <span className="statTime">
                                {moment(course.RegisterOpenDate).format(
                                  "jYYYY/jM/jD"
                                )}
                              </span>
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="registerDate">
                              <Calendar />
                              <span className="time"> پایان ثبت نام :</span>
                              <span className="statTime">
                                {moment(course.RegisterCloseDate).format(
                                  "jYYYY/jM/jD"
                                )}
                              </span>
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            style={{ paddingTop: "5px" }}
                          >
                            <div className="registerDate">
                              <Calendar />
                              <span className="time">
                                مهلت ویرایش پرونده های مرجوعی :
                              </span>
                              <span className="statTime">
                                {course?.EditDeadline == null
                                  ? "--"
                                  : moment(course?.EditDeadline).format(
                                      "jYYYY/jM/jD"
                                    )}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </React.Fragment>
                );
              })}
            </Row>
          )}
        </>
      ) : (
        <Alert
          type="warning"
          description="شما به مشاهده دوره ها دسترسی ندارید"
          message=""
        />
      )}
      <ConfigProvider direction="ltr">
        <Pagination
          total={resolvedData?.data?.TotalCount}
          pageSize={pageModel?.pageSize}
          showTotal={(total, range) =>
            `تعداد کل دوره ها:   ${latestData?.data?.TotalCount} `
          }
          current={pageModel.pageIndex}
          showSizeChanger={true}
          onChange={changePageHandler}
          locale={{ items_per_page: "/ صفحه" }}
        />
      </ConfigProvider>
      <Modal
        title={addForm ? "ایجاد دوره" : "ویرایش دوره"}
        visible={visible}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={900}
      >
        <CreateCourse
          itemCourse={itemCourse}
          addForm={addForm}
          closeModal={() => setVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default Courses;
