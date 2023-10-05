import React from "react";
import { useState, useEffect, createContext } from "react";

export const DataContext = createContext("");

const BASIC_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=af95f78c831f3180d61fc95fdebb33a0";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=af95f78c831f3180d61fc95fdebb33a0&query=";

export const ApiService = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(1);
  const [movieAlert, setMovieAlert] = useState(false);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      setGenre("");
      const url = `${BASIC_URL}search/movie?${API_KEY}&query=${query}&language=en-US&page=${pages}`;
      const data = await fetch(url);
      const { results, total_pages, total_results } = await data.json();

      setMovieData(results);
      setTotalPages(total_pages);

      if (total_results === 0 && query) {
        setMovieAlert(true);
      }
    } catch (e) {
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies(query);
  }, [query, pages]);

  async function getMovieGenre() {
    try {
      const data = await fetch(
        `${BASIC_URL}genre/movie/list?${API_KEY}&language=en-US`
      );
      const { genres } = await data.json();
      setGenres(genres);
    } catch (err) {
      throw new Error("Can`t get genres at the Movie DB");
    }
  }
  useEffect(() => {
    getMovieGenre();
  }, []);

  const getMoviesByGenres = async () => {
    if (genre) {
      setQuery("");
      setLoading(true);
      try {
        const data = await fetch(
          `${BASIC_URL}discover/movie?&language=en-US&${API_KEY}&with_genres=${genre}&page=${pages}`
        );
        const { results, total_pages } = await data.json();

        setMovieData(results);
        setTotalPages(total_pages);

        setLoading(false);
      } catch (e) {
        throw new Error("Can`t get movies by genres");
      }
    }
  };

  useEffect(() => {
    getMoviesByGenres();
  }, [pages, genre]);

  return (
    <>
      <DataContext.Provider
        value={{
          movieData,
          loading,
          showAlert,
          totalPages,
          pages,
          setPages,
          movieAlert,
          query,
          setQuery,
          genres,
          getMoviesByGenres,
          setGenre,
          genre,
        }}
      >
        {props.children}
      </DataContext.Provider>
    </>
  );
};
