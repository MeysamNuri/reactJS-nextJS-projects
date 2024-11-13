/**
 *
 * TripRequestHistory
 *
 */

import React, { useState, useEffect } from "react";
import APIs from "./APIs";
import fetchCatch from "../../utils/fetchCatch";
import "./trip-request-history.less";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TripRequestHistory() {
  const [history, setHistory] = useState([]);

  async function getTourAllowanceHistory() {
    try {
      const data = await APIs.getTourAllowanceHistory();
      setHistory(data.data);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  useEffect(() => {
    getTourAllowanceHistory();
  }, []);

  return (
    <div>
      <table className="history-table">
        <tr className="trip-header">
          <th style={{ borderRadius: "0 8px 0 0" }}>تاریخ</th>
          <th>مبلغ</th>
          <th>نوع سفر</th>
          <th style={{ borderRadius: "8px 0 0 0" }}>وضعیت</th>
        </tr>
        {history.map((item) => (
          <tr>
            <td>{item.date}</td>
            <td>{item.requested_credit}</td>
            <td>{item.internal_external === "external" ? "خارجی" : "داخلی"}</td>
            <td
              style={{
                color: "#22D65E",
                display: "flex",
                alignItems: "center",
                flexDirection: "row-reverse",
                justifyContent: "space-evenly",
              }}
            >
              <span>{item.status === "active" ? "فعال" : "غیرفعال"}</span>
              <img src='assets/images/tick.svg' alt='tick.svg' />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

TripRequestHistory.propTypes = {};

export default TripRequestHistory;
