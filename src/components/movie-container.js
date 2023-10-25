import React from "react";
import MovieCard from "./movie-card";
import { useContext } from "react";
import { Row } from "antd";

import { DataContext } from "./api-service";

function MovieContainer({ substractScript, substractTitle, rateMovie }) {
  const { movieData } = useContext(DataContext);

  return (
    <Row className="movie-list" >
      <MovieCard
        movieArr={movieData}
        substractScript={substractScript}
        substractTitle={substractTitle}
        rateMovie={rateMovie}
      />
    </Row>
  );
}

export default MovieContainer;
