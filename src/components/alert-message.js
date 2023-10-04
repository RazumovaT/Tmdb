import React from "react";
import { Alert } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function AlertMessage({ BASIC_URL }) {
  const alertStyle = {
    display: "block",
    width: "700px",
    height: "300px",
    margin: "auto",
    marginTop: "200px",
    paddingTop: "75px",
    fontSize: "25px",
    color: "brown",
    textAlign: "center",
  };
  return (
    <Alert
      style={alertStyle}
      description={
        "OOPS! Something went wrong! Can`t connect to the Movie DB at " +
        BASIC_URL
      }
      type="error"
      showIcon
    ></Alert>
  );
}
