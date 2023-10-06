import React, { useContext } from "react";
import MovieCard from "./movie-card";
import { Row } from "antd";
import { DataContext } from "./api-service";

const TabRated = ({ substractScript, substractTitle }) => {
  const { genres, rated } = useContext(DataContext);
  return (
    <Row className="movie-list" justify="start">
      <MovieCard
        movieArr={rated}
        substractScript={substractScript}
        substractTitle={substractTitle}
        genres={genres}
      />
    </Row>
  );
};

export default TabRated;
