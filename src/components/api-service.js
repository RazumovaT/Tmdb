import React from "react";
import { useState, useEffect, createContext } from "react";
import App from "/Users/razumova/star-db/src/index.js";

export const DataContext = createContext("");

const BASIC_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=af95f78c831f3180d61fc95fdebb33a0";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=af95f78c831f3180d61fc95fdebb33a0&query=";
const guestUrl = `${BASIC_URL}authentication/guest_session/new?${API_KEY}`;

export const ApiService = (props) => {
  const [movieData, setMovieData] = useState([]);
  // const [trendMovies, setTrendMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(1);
  // const [pagesSearch, setPagesSearch] = useState(1);
  // const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  const [movieAlert, setMovieAlert] = useState(false);
  const [query, setQuery] = useState("");

  // const [results, setResults] = useState([]);

  // const [rated, setRated] = useState([]);
  const [guestSessionId, setGuestSessionId] = useState("");

  const [ratedMovies, setRatedMovies] = useState(
    localStorage.getItem("ratedMovies")
      ? JSON.parse(localStorage.getItem("ratedMovies"))
      : []
  );

  useEffect(() => {
    const data = localStorage.getItem("ratedMovies");
    if (data) setRatedMovies(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
  }, [ratedMovies]);
  console.log(localStorage);
  // const createGuestSession = async () => {
  //   const dataGuest = await fetch(guestUrl);
  //   const responseGuest = await dataGuest.json();
  //   return setGuestSessionId(responseGuest.guest_session_id);
  // };
  // useEffect(() => {
  //   createGuestSession();
  // }, []);
  // console.log(guestSessionId);

  // const rateMovie = async (movie, rate) => {
  //   const urlRate = `${BASIC_URL}movie/${movie.id}/rating?${API_KEY}&guest_session_id=${guestSessionId}`;
  //   const dataRate = await fetch(urlRate, {
  //     method: "POST",
  //     headers: {
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjk1Zjc4YzgzMWYzMTgwZDYxZmM5NWZkZWJiMzNhMCIsInN1YiI6IjY0ZTUwODM4YzNjODkxMDEzYWIwMmY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c_wjXxINHG9Ou71D9R5nn8kNYnFKrmdPobAf9sE-nH8",
  //       "Content-Type": "application/json;charset=utf-8",
  //       accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       value: rate,
  //     }),
  //   });
  //   const responseRate = await dataRate.json();
  //   console.log(responseRate);
  //   // console.log(data);
  //   // setRatedMovies(movie);
  // };

  // useEffect(
  //   (movie, rate) => {
  //     if (movie) {
  //       rateMovie((movie, rate));
  //     }
  //   },
  //   [pages, rated]
  // );

  // const getRatedMovie = async () => {
  //   const urlGetRated = `${BASIC_URL}guest_session/${guestSessionId}/rated/movies?${API_KEY}`;
  //   const dataGetRated = await fetch(urlGetRated);

  //   const { results, total_pages } = await dataGetRated.json();
  //   console.log(results);
  //   setRated(results);

  //   setTotalPages(total_pages);
  // };
  // useEffect(() => {
  //   getRatedMovie();
  // }, []);

  // console.log(rated);

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const url = `${API_SEARCH}${query}&language=en-US&page=${pages}`;
      const data = await fetch(url);
      const { results, total_pages, total_results } = await data.json();
      console.log(results);

      setMovieData(results);
      setTotalPages(total_pages);

      // if (!query.length) {
      //   setMovieData(trendMovies);
      // }
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
    searchMovies(query, pages);
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

  const getMoviesByGenres = async (id) => {
    setLoading(true);
    const data = await fetch(
      `${BASIC_URL}discover/movie?&language=en-US&${API_KEY}&with_genres=${id}`
    );
    console.log(pages);
    const { results, total_pages } = await data.json();
    setMovieData(results);
    setTotalPages(total_pages);
    setLoading(false);
  };
  useEffect(
    (id) => {
      getMoviesByGenres(id);
    },
    [pages]
  );

  const addToRated = (movie, value) => {
    if (ratedMovies) {
      const check = ratedMovies.every((item) => item.id !== movie.id);

      // console.log(movie);
      if (check) {
        const update = [...ratedMovies];
        setRatedMovies([...update, movie]);
      } else return;

      // console.log(rated);
      localStorage.setItem(JSON.stringify(movie.id), JSON.stringify(value));
    }
  };

  return (
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
        // rated,
        genres,
        totalPages,
        getMoviesByGenres,
        // rateMovie,
        ratedMovies,
        addToRated,
        // getRatedMovie,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
