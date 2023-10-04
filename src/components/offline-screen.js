import React from "react";
import { Divider } from "antd";
import { FrownTwoTone, ReloadOutlined } from "@ant-design/icons";

export default function OfflineScreen() {
  const containerStyle = {
    width: "100%",
    maxWidth: " 1000px",
    height: "130px",
    backgroundColor: "whitesmoke",
    borderRadius: "15px",
    margin: "auto",
    marginTop: "200px",
    padding: "30px",
    textAlign: "start",
  };
  const textStyle = {
    fontSize: "18px",
    margin: "5px 0 5px 30px",
    color: "#827e7e",
  };
  return (
    <div className="offline-container" style={containerStyle}>
      <div style={{ display: "flex" }}>
        <FrownTwoTone
          style={{ fontSize: "55px" }}
          twoToneColor="cornflowerblue"
        />
        <div>
          <p style={textStyle}>You`re offline</p>
          <p style={textStyle}>Please, check your Internet connection</p>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <ReloadOutlined
          style={{ color: "#827e7e", fontSize: "22px", margin: "0 12px" }}
        />
        <p style={{ color: "#827e7e", fontSize: "16px", margin: "0 40px" }}>
          Try again
        </p>
      </div>
    </div>
  );
}
