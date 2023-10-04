import React from "react";
import MovieCard from "./movie-card";
import { useState, useContext } from "react";
import { Typography, Spin, Col, Row, Rate } from "antd";
import { format } from "date-fns";
import SizeContext from "antd/es/config-provider/SizeContext";
import { DataContext } from "./api-service";

const { Title, Paragraph, Text } = Typography;

function MovieContainer({
  substractScript,
  // movieData,
  substractTitle,
  rated,
  setRated,
  rateMovie,
  addToRated,
  genres,
}) {
  // const gridStyle = {
  //   width: "450px",
  //   textAlign: "start",
  //   padding: 0,
  //   margin: "10px",
  //   span: "12",
  // };
  const { movieData } = useContext(DataContext);

  return (
    <Row className="movie-list" justify="space-evenly">
      {/* {movieData.map((movie) => (
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
              <Text className="movie-name">{substractTitle(movie.title)}</Text>
              <div className="movie-vote">{movie.vote_average.toFixed(1)}</div>
            </div>
            <Text type="secondary" className="movie-data">
              {format(new Date(movie.release_date), "MMMM dd, yyyy")}
            </Text>
            <Text keyboard className="movie-genre">
              Action
            </Text>
            <Paragraph className="movie-script">
              {substractScript(movie.overview)}
            </Paragraph>
            <Rate
              defaultValue={0}
              count={10}
              style={{ fontSize: "16px", position: "absolute", bottom: "15px" }}
              onClick={() => addToRated(movie)}
              onChange={(value) => rateMovie(movie.id, value)}
            />
          </ul>
        </Col>
      ))} */}
      <MovieCard
        movieArr={movieData}
        substractScript={substractScript}
        substractTitle={substractTitle}
        rateMovie={rateMovie}
        addToRated={addToRated}
        // genres={genres}
      />
    </Row>
  );
}

export default MovieContainer;

// {
//   movieData.map((movie) => (
//     <React.Fragment>
//       {movie.poster_path ? (
//         <img
//           className="movie-poster"
//           src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
//           alt={movie.title}
//         />
//       ) : (
//         <img src="https://www.lyricsmotion.com/Content/images/gopal-krishna-1979-200x275.jpg" />
//       )}
//       <ul className="movie-description">
//         <Text className="movie-name">{movie.title}</Text>
//         <Text type="secondary" className="movie-data">
//           {format(new Date(movie.release_date), "MMMM dd, yyyy")}
//         </Text>
//         <Text keyboard className="movie-genre">
//           Action
//         </Text>
//         <Paragraph className="movie-script">
//           {substractScript(movie.overview)}
//         </Paragraph>
//       </ul>
//     </React.Fragment>
//   ));
// }

// {
//   loading ? (
//     <Spin size="large"></Spin>
//   ) : (
//     <React.Fragment>
//       {poster_path ? (
//         <img
//           className="movie-poster"
//           src={"https://image.tmdb.org/t/p/w500" + poster_path}
//           alt={title}
//         />
//       ) : (
//         <img src="https://www.lyricsmotion.com/Content/images/gopal-krishna-1979-200x275.jpg" />
//       )}

//       <ul className="movie-description">
//         <Text className="movie-name">{title}</Text>
//         <Text type="secondary" className="movie-data">
//           {format(new Date(release_date), "MMMM dd, yyyy")}
//         </Text>
//         <Text keyboard className="movie-genre">
//           Action
//         </Text>
//         <Paragraph className="movie-script">
//           {substractScript(overview)}
//         </Paragraph>
//       </ul>
//     </React.Fragment>
//   );
// }
