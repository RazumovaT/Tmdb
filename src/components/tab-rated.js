import React from "react";
import { useContext } from "react";
import MovieCard from "./movie-card";
import { Pagination } from "antd";
import { Row, Col, Typography, Rate } from "antd";
import { DataContext } from "./api-service";

const TabRated = ({
  rateMovie,
  substractScript,
  movieData,
  substractTitle,
  setRated,
  addToRated,
  setPagesSearch,
  pagesSearch,
  totalPagesSearch,
  // genres,
}) => {
  const { genres, ratedMovies, rated } = useContext(DataContext);
  return (
    <>
      <Row className="movie-list" justify="space-evenly">
        <MovieCard
          movieArr={ratedMovies}
          substractScript={substractScript}
          substractTitle={substractTitle}
          rateMovie={rateMovie}
          addToRated={addToRated}
          genres={genres}
          // ratedMovies={ratedMovies}
        />
      </Row>
      <Pagination
        style={{ textAlign: "center", marginTop: "20px" }}
        current={pagesSearch}
        total={totalPagesSearch}
        onChange={(page) => setPagesSearch(page)}
        defaultCurrent={1}
      />
      {/* <PagePagination
        // style={{ textAlign: "center", marginTop: "20px" }}
        // current={pages}
        // total={totalPages}
        // onChange={(page) => setPages(page)}
        // defaultCurrent={1}
        current={pagesSearch}
        setPages={setPagesSearch}
        total={totalPagesSearch}
      /> */}
    </>
  );
};

export default TabRated;

//  {
//    rated.map((movie) => (
//      <Col
//        //   style={gridStyle}
//        className="movie-container"
//        span={11}
//        key={movie.id}
//      >
//        {movie.poster_path ? (
//          <img
//            className="movie-poster"
//            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
//            alt={movie.title}
//          />
//        ) : (
//          <img src="https://www.lyricsmotion.com/Content/images/gopal-krishna-1979-200x275.jpg" />
//        )}
//        <ul className="movie-description">
//          <div className="title-container">
//            {/* <Text className="movie-name">{substractTitle(movie.title)}</Text> */}
//            <div className="movie-vote">{movie.vote_average.toFixed(1)}</div>
//          </div>
//          <Text type="secondary" className="movie-data">
//            {/* {format(new Date(movie.release_date), "MMMM dd, yyyy")} */}
//          </Text>
//          <Text keyboard className="movie-genre">
//            Action
//          </Text>
//          <Paragraph className="movie-script">
//            {/* {substractScript(movie.overview)} */}
//          </Paragraph>
//          <Rate
//            count={10}
//            style={{ fontSize: "16px", position: "absolute", bottom: "15px" }}
//            //   onChange={() => setRated(movie)}
//          />
//        </ul>
//      </Col>
//    ));
//  }

// const searchMovies = async (guestSession) => {
//   try {
//     //   setLoading(true);
//     const url = `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies&page=1`;
//     const data = await fetch(url);
//     const response = await data.json();

//     //   setRated(response.results);
//     //   console.log(response);

//     // setTotalPages(response.total_pages);
//     // setMovieAlert(false);

//     // if (!query.length) {
//     //   setMovieData(trendMovies);
//     // }
//     // if (response.total_results === 0 && query) {
//     //   setMovieAlert(true);
//     // }
//   } catch (e) {
//     console.log("error");
//     //   setShowAlert(true);
//   }
// };
// searchMovies();
