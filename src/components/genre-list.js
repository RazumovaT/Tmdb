import React, { useContext } from "react";
import MovieCard from "./movie-card";
import { Typography, Col, Row } from "antd";
import { DataContext } from "./api-service";
const { Text } = Typography;

export const GenreList = () => {
  const genreStyle = {
    cursor: "pointer",
    margin: "7px 5px",
    fontSize: "16px",
    color: "cornflowerblue",
    justifyContent: "start",
    display: "grid",
    gridTemplateRows: "1fr",
  };
  const { setGenre } = useContext(DataContext);

  return (
    <>
      <Row style={{ margin: "0 auto", maxWidth: "910px" }}>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("28")}>
            Action
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("12")}>
            Adventure
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("16")}>
            Animation
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("35")}>
            Comedy
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("80")}>
            Crime
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("99")}>
            Documentary
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("18")}>
            Drama
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("10751")}>
            Family
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("14")}>
            Fantasy
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("36")}>
            History
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("27")}>
            Horror
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("10402")}>
            Music
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("9648")}>
            Mystery
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("10749")}>
            Romance
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("878")}>
            Science Fiction
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("10770")}>
            TV Movie
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("53")}>
            Thriller
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("10752")}>
            War
          </Text>
        </Col>
        <Col>
          <Text keyboard style={genreStyle} onClick={() => setGenre("37")}>
            Western
          </Text>
        </Col>
      </Row>
    </>
  );
};
