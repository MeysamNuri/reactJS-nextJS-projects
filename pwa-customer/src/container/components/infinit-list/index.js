import React, { useEffect, useState } from "react";
import useDataApi from "../fetchData/useDataApi";
import { useDispatch } from 'react-redux'
import store from "store-js";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../header/Header";
import base_url from "../../../constants/base_url";
import axios from 'axios'
import "./notification.less";
import { getNotiNumber } from "../../actions/MainActions";

function InfinitList(props) {
  const token = store.get("token");
  const history = useHistory();
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1);
  const [params, setParams] = useState(true);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(`notification/all?page=${pageNumber}`);
  const [method, setMethod] = useState("get");
  const [loadMore, setLoadMore] = useState(false);
  const [lastPage, setLastPage] = useState();
  const [{ data, isLoading, isError }] = useDataApi(url, params, method, token);

  const getNotificationUnread = () => {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    axios
      .get(`${base_url}notification/unread/count`, { headers: headers })
      .then((res) => {
        dispatch(getNotiNumber(res.data.data.notification_num));
      })
      .catch((err) => {
        console.log('notification read error',err);
      });
  };

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setLastPage(data.data.last_page);
      props.setState(props.state.concat(data.data.data))
      setPageNumber(pageNumber + 1);
    } else if (isError) {
      setFlag(flag => !flag);
      setError(error => !error);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById("list");

    if (props.scrollable) {
      list.addEventListener("scroll", e => {
        const el = e.target;
        
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      window.addEventListener("scroll", () => {
        if (
          window.scrollY + window.innerHeight ===
          list.clientHeight + list.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  const getData = load => {
    if (load) {
      if (pageNumber <= lastPage) {
        setUrl(`notification/all?page=${pageNumber}`);
      }
    } else return;
  };

  function handleNotifClicked(item) {
    const states = {
      id:item.id
    };
    getNotificationUnread()
    history.push({ pathname: "/notif-content", state: states });
  }

  return (
    <>
      <Header
        title="اعلان ها"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
      />

      <div className="notif-container" id="list">
          <ul className="notification-list">
            {props.state.map(item => (
              <li
                className="notification-box"
                onClick={() => handleNotifClicked(item)}
                key={item.id}
                style={{ opacity: item.seen === 1 ? '0.5' : ''}}
              >
              <h4>{item.title.length > 29 ? item.title.substr(0,29) + '...' : item.title}</h4>
                <p>
                  {item.content.length > 100
                    ? item.content.substr(0, 100) + " ..."
                    : item.content}
                </p>
                <div
                  className="notification-list-circle"
                  style={{ display: item.seen === 0 ? "block" : "none" }}
                ></div>
              </li>
            ))}
            {isLoading && (
            <div className='loading'>
              <CircularProgress className="circular_loading" />
            </div>
          )}
          </ul>
          
      </div>
    </>
  );
}

export default InfinitList;
