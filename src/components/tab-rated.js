import React from "react";
import MovieCard from "./movie-card";
import { Row } from "antd";

const TabRated = ({
  rateMovie,
  substractScript,
  substractTitle,
  addToRated,
  ratedMovies,
  genres,
}) => {
  return (
    <>
      <Row className="movie-list" justify="start">
        <MovieCard
          movieArr={ratedMovies}
          substractScript={substractScript}
          substractTitle={substractTitle}
          rateMovie={rateMovie}
          addToRated={addToRated}
          genres={genres}
        />
      </Row>
    </>
  );
};

export default TabRated;
