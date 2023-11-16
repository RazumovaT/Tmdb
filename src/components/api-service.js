import React from "react";
import { useState, useEffect, createContext, useCallback } from "react";

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


  const searchMovies = useCallback(
    async (query) => {
      let checked = false;
      setLoading(true);
      try {
        if (query) {
          setGenre("");
        const url = `${API_SEARCH}${query}&language=en-US&page=${pages}`;
        const data = await fetch(url);
        const { results, total_pages, total_results } = await data.json();
        
        if (!checked) {
          setMovieData(results);
            setTotalPages(total_pages);
            setLoading(false);
            if (total_results === 0 && query) {
              setMovieAlert(true);
            }
          }
        }
      } catch (e) {
        setShowAlert(true);
      }
      return () => {
        checked = true;
      };
    },
    [pages]
  );

  useEffect(() => {
    searchMovies(query);
  }, [searchMovies, query]);

  useEffect(() => {
    let checked = false;
    async function getMovieGenre() {
      try {
        const data = await fetch(
          `${BASIC_URL}genre/movie/list?${API_KEY}&language=en-US`
        );
        const { genres } = await data.json();
        if (!checked)
         setGenres(genres);
      } catch (err) {
        setShowAlert(true);
      }
    }
    getMovieGenre();
    return () => (checked = true);
  }, []);

  const getMoviesByGenres = useCallback(async () => {
    let checked = false;
    setLoading(true);
    if (genre) {
      setQuery("");
      try {
        const data = await fetch(
          `${BASIC_URL}discover/movie?&language=en-US&${API_KEY}&with_genres=${genre}&page=${pages}`
        );
        const { results, total_pages } = await data.json();

        if (!checked) {
          setMovieData(results);
          setTotalPages(total_pages);
          setLoading(false);
        }
      } catch (e) {
        setShowAlert(true);
      }
    }
    return () => (checked = true);
  }, [genre, pages]);

  useEffect(() => {
    getMoviesByGenres();
  }, [genre, pages, getMoviesByGenres]);

  return (
    <>
      <DataContext.Provider
        value={{
          movieData,
          genres,
          loading,
          showAlert,
          setShowAlert,
          totalPages,
          pages,
          setPages,
          movieAlert,
          query,
          setQuery,
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
