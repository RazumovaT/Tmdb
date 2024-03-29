import React from "react";
import { useContext } from "react";
import { Typography, Spin, Col, Rate } from "antd";
import { format } from "date-fns";

import { DataContext } from "./api-service";

const { Paragraph, Text } = Typography;

const MovieCard = ({ movieArr, substractScript, substractTitle, addToRated }) => {
  const gridStyle = {
    width: "450px",
    textAlign: "start",
    padding: 0,
    margin: "10px",
    span: "12",
  };
  const { genres, loading } = useContext(DataContext);

  return (
    <>
      {movieArr
        ? movieArr.map((movie) => (
            <Col
              style={gridStyle}
              className="movie-container"
              span={11}
              key={movie.id}
              lg={11}
              md={10}
              sm={8}
            >
              {movie.poster_path ? (
                loading ? (
                  <Spin size="large"></Spin>
                ) : (
                  <img
                    className="movie-poster"
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                  />
                )
              ) : (
                <img src="https://www.lyricsmotion.com/Content/images/gopal-krishna-1979-200x275.jpg" alt={movie.title} className="no-poster-image"/>
              )}
              <ul className="movie-description">
                <div className="title-container">
                 {movie.title ?
                  <Text className="movie-name">
                    {substractTitle(movie.title)}
                  </Text> 
                  : ""}
                 {movie.vote_average ? 
                 <div className={
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
                  : ""}
                </div>
              {movie.release_date ?  
               <Text type="secondary" className="movie-data">
                  {format(new Date(movie.release_date), "MMMM dd, yyyy")}
                </Text> 
                : ""}
                <div className="genre-list">
                  {movie.genre_ids ? 
                  movie.genre_ids.map((id) => (
                    <Text keyboard className="movie-genre" key={Math.random()}>
                      {genres.find((genre) => genre.id === id).name}
                    </Text>
                  )) 
                  : ""}
                </div>
                {
                  movie.overview ?
                <Paragraph className="movie-script">
                  {substractScript(movie.overview)}
                </Paragraph>
               : "" }
                <Rate
                className="star-rate"
                  value={localStorage.getItem(movie.id)}
                  count={10}
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
