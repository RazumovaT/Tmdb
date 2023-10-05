import React from "react";
import { Input, Row, Col } from "antd";
import { useState, useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { DataContext } from "./api-service";

export default function SearchInput({ searchMovies }) {
  const { query, setQuery } = useContext(DataContext);
  const inputStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    height: "40px",
    width: "100%",
    maxWidth: "940px",
    border: " 1px solid rgba(217, 217, 217, 1)",
    paddingLeft: "15px",
  };

  return (
    <Row style={{ justify: "space-between" }}>
      <Col style={{ margin: "0 auto", width: "100%" }}>
        <form onSubmit={(e) => e.preventDefault()} id="1">
          <label id="1">
            <DebounceInput
              minLength={2}
              debounceTimeout={500}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={inputStyle}
              placeholder="Type to search..."
              className="input-tab"
            />
          </label>
        </form>
      </Col>
    </Row>
  );
}
