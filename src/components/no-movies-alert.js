import React from "react";
import { Result } from "antd";

export default function NoMoviesAlert({ movieAlert }) {
  return (
    <Result status="warning" title="Sorry, no films have been found"></Result>
  );
}
