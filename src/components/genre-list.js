import React, { useContext, useEffect, useState } from "react";
import MovieCard from "./movie-card";
import { Typography, Spin, Col, Row, Rate } from "antd";
import { DataContext } from "./api-service";
const { Text } = Typography;

const API_KEY = "api_key=af95f78c831f3180d61fc95fdebb33a0";

export const GenreList = ({ genres }) => {
  const genreStyle = {
    cursor: "pointer",
    margin: "7px 5px",
    fontSize: "16px",
    color: "cornflowerblue",
    justifyContent: "start",
    display: "grid",
    gridTemplateRows: "1fr",
  };
  const { getMoviesByGenres, results } = useContext(DataContext);
  return (
    <>
      <Row style={{ margin: "0 auto", maxWidth: "910px" }}>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("28")}
          >
            Action
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("12")}
          >
            Adventure
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("16")}
          >
            Animation
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("35")}
          >
            Comedy
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("80")}
          >
            Crime
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("99")}
          >
            Documentary
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("18")}
          >
            Drama
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("10751")}
          >
            Family
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("14")}
          >
            Fantasy
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("36")}
          >
            History
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("27")}
          >
            Horror
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("10402")}
          >
            Music
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("9648")}
          >
            Mystery
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("10749")}
          >
            Romance
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("878")}
          >
            Science Fiction
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("10770")}
          >
            TV Movie
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("53")}
          >
            Thriller
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("10752")}
          >
            War
          </Text>
        </Col>
        <Col>
          <Text
            keyboard
            style={genreStyle}
            onClick={() => getMoviesByGenres("37")}
          >
            Western
          </Text>
        </Col>
      </Row>
      <Row>{results ? <MovieCard movieArr={results} /> : null}</Row>
    </>
  );
};
