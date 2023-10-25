import React, { useContext } from "react";
import MovieCard from "./movie-card";
import { Row } from "antd";
import { DataContext } from "./api-service";

const TabRated = ({ substractScript, substractTitle, ratedMovies, addToRated }) => {
  const { genres } = useContext(DataContext);
  return (
    <Row className="movie-list" justify="start">
      <MovieCard
        movieArr={ratedMovies}
        substractScript={substractScript}
        substractTitle={substractTitle}
        genres={genres}
        addToRated={addToRated}
      />
    </Row>
  );
};

export default TabRated;
