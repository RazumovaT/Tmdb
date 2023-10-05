import React from "react";
import { useState, useContext } from "react";
import { Typography, Spin, Col, Row, Rate } from "antd";
import { format } from "date-fns";

import SizeContext from "antd/es/config-provider/SizeContext";
import { DataContext } from "./api-service";

const { Title, Paragraph, Text } = Typography;

const MovieCard = ({
  movieArr,
  substractScript,
  substractTitle,
  addToRated,
}) => {
  const gridStyle = {
    width: "450px",
    textAlign: "start",
    padding: 0,
    margin: "10px",
    span: "12",
  };
  const { genres } = useContext(DataContext);

  return (
    <>
      {movieArr
        ? movieArr.map((movie) => (
            <Col
              style={gridStyle}
              className="movie-container"
              span={11}
              key={movie.id}
            
            >
              {movie.poster_path ? (
                <img
                  className="movie-poster"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title}
                />
              ) : (
                <img src="https://www.lyricsmotion.com/Content/images/gopal-krishna-1979-200x275.jpg" />
              )}
              <ul className="movie-description">
                <div className="title-container">
                  <Text className="movie-name">
                    {substractTitle(movie.title)}
                  </Text>
                  <div
                    className={
                      movie.vote_average < 3
                        ? "movie-bad"
                        : movie.vote_average < 5
                        ? "movie-average"
                        : movie.vote_average < 7
                        ? "movie-good"
                        : "movie-excellent"
                    }
                  >
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>

                <Text type="secondary" className="movie-data">
                  {format(new Date(movie.release_date), "MMMM dd, yyyy")}
                </Text>
                <div className="genre-list">
                  {movie.genre_ids.map((id) => (
                    <Text keyboard className="movie-genre" key={Math.random()}>
                      {genres.find((genre) => genre.id === id).name}
                    </Text>
                  ))}
                </div>
                <Paragraph className="movie-script">
                  {substractScript(movie.overview)}
                </Paragraph>
                <Rate
                  value={localStorage.getItem(movie.id)}
                  count={10}
                  style={{
                    fontSize: "16px",
                    position: "absolute",
                    bottom: "15px",
                  }}
                  onChange={(value) => addToRated(movie, value)}
                />
              </ul>
            </Col>
          ))
        : null}
    </>
  );
};

export default MovieCard;

//   <MovieCard
//     movieArr={movieData}
//     substractScript={substractScript}
//     substractTitle={substractTitle}
//   />;
