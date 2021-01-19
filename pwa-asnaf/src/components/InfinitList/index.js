import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
// import store from "store-js";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/Header";
import "./notification.less";
import { getNotiNumber } from "../../containers/AllNotification/action";
import APIs from './APIs'
import fetchCatch from '../../utils/fetchCatch'

function InfinitList(props) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1);
  const url = `notification/all?page=${pageNumber}`
  const [loadMore, setLoadMore] = useState(false);
  const [lastPage, setLastPage] = useState();
  const [isLoading, setIsLoading] = useState(false)

  async function getNotificationUnread() {
    // setIsLoading(true)
    try {
      const data = await APIs.getNotificationUnread();
      dispatch(getNotiNumber(data.data.notification_num))
      // setIsLoading(false)
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false)
    }
  }
  async function getAllNotification(url) {
    setIsLoading(true)
    try {
      const data = await APIs.getAllNotification(url);
      setLastPage(data.data.last_page);
      props.setState(props.state.concat(data.data.data))
      setPageNumber(pageNumber + 1);
      setIsLoading(false)
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllNotification(url)
  }, [])

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
        getAllNotification(`notification/all?page=${pageNumber}`);
      }
    } else return;
  };

  function handleNotifClicked(item) {
    const states = {
      id: item.id,
    };
    getNotificationUnread()
    history.push({ pathname: "/notif-content", state: states });
  }

  return (
    <>
      <Header
        title="اعلان ها"
        leftIcon='assets/images/arrow-w-rotate.svg'
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