import React from "react";
import MovieCard from "./movie-card";
import { useContext } from "react";
import { Row } from "antd";

import { DataContext } from "./api-service";

function MovieContainer({ substractScript, substractTitle, addToRated }) {
  const { movieData } = useContext(DataContext);

  return (
    <Row className="movie-list" justify="start">
      <MovieCard
        movieArr={movieData}
        substractScript={substractScript}
        substractTitle={substractTitle}
        addToRated={addToRated}
      />
    </Row>
  );
}

export default MovieContainer;
