import React, { useContext } from "react";
import MovieContainer from "./movie-container";
import SearchInput from "./search-input";
import NoMoviesAlert from "./no-movies-alert";
import { GenreList } from "./genre-list";
import { Pagination } from "antd";
import PagePagination from "./pagination";
import { DataContext } from "./api-service";

const TabSearch = ({
  // query,
  // searchMovies,
  // setQuery,
  // // movieData,
  // setMovieData,
  substractScript,
  substractTitle,
  // loading,
  // movieAlert,
  // rated,
  // setRated,
  // rateMovie,
  addToRated,
  // pages,
  // setPages,
  // totalPages,
  // genres,
}) => {
  const { movieAlert } = useContext(DataContext);
  return (
    <>
      <SearchInput
      // query={query}
      // searchMovies={searchMovies}
      // setQuery={setQuery}
      // // movieData={movieData}
      // setMovieData={setMovieData}
      />
      {movieAlert && <NoMoviesAlert />}
      <GenreList />
      <MovieContainer
        substractScript={substractScript}
        substractTitle={substractTitle}
        // loading={loading}
        // // movieData={movieData}
        // rated={rated}
        // setRated={setRated}
        // rateMovie={rateMovie}
        addToRated={addToRated}
        // genres={genres}
      />
      {/* <Pagination
        style={{ textAlign: "center", marginTop: "20px" }}
        current={pages}
        total={totalPages}
        onChange={(page) => setPages(page)}
        defaultCurrent={1}
      /> */}
    </>
  );
};

export default TabSearch;
