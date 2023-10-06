import React, { useContext } from "react";
import MovieContainer from "./movie-container";
import SearchInput from "./search-input";
import NoMoviesAlert from "./no-movies-alert";
import { GenreList } from "./genre-list";
import { Pagination } from "antd";
import { DataContext } from "./api-service";

const TabSearch = ({ substractScript, substractTitle }) => {
  const { movieAlert, pages, setPages, movieData, totalPages } =
    useContext(DataContext);
  return (
    <>
      <SearchInput />
      <GenreList />
      {movieAlert && !movieData.length && <NoMoviesAlert />}
      <MovieContainer
        substractScript={substractScript}
        substractTitle={substractTitle}
      />
      {movieData.length ? (
        <Pagination
          style={{ textAlign: "center", marginTop: "20px" }}
          current={pages}
          total={totalPages}
          onChange={(page) => setPages(page)}
          defaultCurrent={1}
        />
      ) : null}
    </>
  );
};

export default TabSearch;
