import React from "react";
import { useState, useEffect, createContext } from "react";

export const Context = createContext();

export const DataProvider = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [trendMovies, setTrendMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(1);
  const [pagesSearch, setPagesSearch] = useState(1);
  const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  const [movieAlert, setMovieAlert] = useState(false);
  const [query, setQuery] = useState("");

  const [rated, setRated] = useState([]);
  const [guestSessionId, setGuestSessionId] = useState("");

  const [ratedMovies, setRatedMovies] = useState(
    localStorage.getItem("ratedMovies")
      ? JSON.parse(localStorage.getItem("ratedMovies"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("ratedMovie", JSON.stringify(ratedMovies));
  }, [ratedMovies]);

  const rateMovie = async (movie, rate) => {
    const guestUrl =
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=af95f78c831f3180d61fc95fdebb33a0";
    const dataGuest = await fetch(guestUrl);
    const responseGuest = await dataGuest.json();
    setGuestSessionId(responseGuest.guest_session_id);

    const urlRate = `https://api.themoviedb.org/3/movie/${movie}/rating?${API_KEY}&guest_session_id=${responseGuest.guest_session_id}`;
    const dataRate = await fetch(urlRate, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjk1Zjc4YzgzMWYzMTgwZDYxZmM5NWZkZWJiMzNhMCIsInN1YiI6IjY0ZTUwODM4YzNjODkxMDEzYWIwMmY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c_wjXxINHG9Ou71D9R5nn8kNYnFKrmdPobAf9sE-nH8",
        "Content-Type": "application/json;charset=utf-8",
        accept: "application/json",
      },
      body: JSON.stringify({
        value: rate,
      }),
    });
    const responseRate = await dataRate.json();
    console.log(responseRate);
    // console.log(data);
    localStorage.setItem(JSON.stringify(movie), JSON.stringify(rate));

    const urlGetRated = `https://api.themoviedb.org/3/guest_session/${responseGuest.guest_session_id}/rated/movies?api_key=af95f78c831f3180d61fc95fdebb33a0`;
    const dataGetRated = await fetch(urlGetRated);
    const responseGetRated = await dataGetRated.json();
    console.log(responseGetRated);

    const dataId = await fetch(
      `https://api.themoviedb.org/3/account/20338367/rated/movies?${API_KEY}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjk1Zjc4YzgzMWYzMTgwZDYxZmM5NWZkZWJiMzNhMCIsInN1YiI6IjY0ZTUwODM4YzNjODkxMDEzYWIwMmY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c_wjXxINHG9Ou71D9R5nn8kNYnFKrmdPobAf9sE-nH8",
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    const responseId = await dataId.json();
    setRated(responseId.results);
    setTotalPagesSearch(5);
    console.log(responseId);
  };

  useEffect(
    (movie, rate) => {
      if (movie) {
        rateMovie((movie, rate));
      }
    },
    [pagesSearch, rated]
  );

  const addToRated = (movie) => {
    setRated([...ratedMovies, movie]);
    console.log(ratedMovies);
    // console.log(rated);
    localStorage.setItem(JSON.stringify(movie.id), JSON.stringify(movie));
  };

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const url = `${API_SEARCH}${query}&language=en-US&page=${pages}`;
      const data = await fetch(url);
      const { results, total_results } = await data.json();

      setMovieData(results);
      setTotalPages(results);
      setMovieAlert(false);

      if (!query.length) {
        setMovieData(trendMovies);
      }
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

  async function getMovieData() {
    try {
      setLoading(true);
      const data = await fetch(
        `${BASIC_URL}trending/movie/day?${API_KEY}&media_type=movie&page=${pages}`
      );

      const { results, total_pages } = await data.json();

      console.log(results);
      setMovieData(results);
      setTrendMovies(results);
      setLoading(false);
      setTotalPages(total_pages);
    } catch (e) {
      if (e) {
        setShowAlert(true);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieData(pages);
  }, [pages]);

  const substractScript = (text) => {
    if (text.length > 170) {
      const arr = text.split(" ");
      const secondPart = arr.splice(21);
      const newA = arr.splice(secondPart);
      const lastChar = newA.pop();
      if (lastChar === "," || lastChar === ".") {
        return newA.pop();
      }
      return newA.join(" ") + "...";
    }
    return text;
  };

  const substractTitle = (text) => {
    const arr = text.split(" ");
    if (arr.length > 5) {
      return arr.splice(0, 5).join(" ") + "...";
    }
    return text;
  };

  async function getMovieGenre() {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`
      );
      const { genres } = await data.json();
      console.log(genres);
      setGenres(genres);
    } catch (err) {
      throw new Error("Can`t connect to the Movie DB");
    }
  }
  useEffect(() => {
    getMovieGenre();
  }, []);

  return (
    <Context.Provider
      value={{
        movieData,
        genres,
        loading,
        showAlert,
        setShowAlert,
        totalPages,
        pages,
        setPages,
        pagesSearch,
        setPagesSearch,
        totalPagesSearch,
        movieAlert,
        query,
        setQuery,
        rated,
        genres,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
