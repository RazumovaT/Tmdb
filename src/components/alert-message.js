import React, { useContext } from "react";
import { DataContext } from "./api-service";
import { Alert } from "antd";

export default function AlertMessage() {
  const { BASIC_URL } = useContext(DataContext);
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
