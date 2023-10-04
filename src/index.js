import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { createRoot } from "react-dom/client";
import { Row, Spin, Col, Space, Card, Tabs, Pagination } from "antd";
import { Offline, Online } from "react-detect-offline";

import MovieContainer from "./components/movie-container";
import AlertMessage from "./components/alert-message";
import OfflineScreen from "./components/offline-screen";
import SearchInput from "./components/search-input";
import NoMoviesAlert from "./components/no-movies-alert";
import TabSearch from "./components/tab-search";
import PagePagination from "./components/pagination";
import TabRated from "./components/tab-rated";
import { GenreList } from "./components/genre-list";
import { method } from "lodash";
import { DataContext } from "./components/api-service";
import { ApiService } from "./components/api-service";
const root = document.getElementById("root");
const root1 = createRoot(root);

const BASIC_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=af95f78c831f3180d61fc95fdebb33a0";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=af95f78c831f3180d61fc95fdebb33a0&query=";

export function App() {
  const {
    showAlert,
    ratedMovies,
    setRatedMovies,
    pages,
    totalPages,
    setPages,
    getRatedMovie,
  } = useContext(DataContext);

  // const [movieData, setMovieData] = useState([]);
  // const [trendMovies, setTrendMovies] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [showAlert, setShowAlert] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pages, setPages] = useState(1);
  // const [pagesSearch, setPagesSearch] = useState(1);
  // const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  // const [movieAlert, setMovieAlert] = useState(false);
  // const [query, setQuery] = useState("");

  // const [results, setResults] = useState([]);

  // const [rated, setRated] = useState([]);
  // const [guestSessionId, setGuestSessionId] = useState("");

  // const [ratedMovies, setRatedMovies] = useState(
  //   localStorage.getItem("ratedMovies")
  //     ? JSON.parse(localStorage.getItem("ratedMovies"))
  //     : []
  // );

  // const createGuestSession = async () => {
  //   const guestUrl =
  //     "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=af95f78c831f3180d61fc95fdebb33a0";
  //   const data = await fetch(guestUrl);
  //   const response = await data.json();
  //   setGuestSessionId(response.guest_session_id);
  //   // console.log(response);
  // };

  // useEffect(() => {
  //   createGuestSession();
  // });
  // console.log(guestSessionId);

  // const rateMovie = async (movie, rate) => {
  //   const guestUrl =
  //     "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=af95f78c831f3180d61fc95fdebb33a0";
  //   const dataGuest = await fetch(guestUrl);
  //   const responseGuest = await dataGuest.json();
  //   setGuestSessionId(responseGuest.guest_session_id);

  //   const urlRate = `https://api.themoviedb.org/3/movie/${movie.id}/rating?${API_KEY}&guest_session_id=${responseGuest.guest_session_id}`;
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
  //   localStorage.setItem(JSON.stringify(movie), JSON.stringify(rate));

  //   const urlGetRated = `https://api.themoviedb.org/3/guest_session/${responseGuest.guest_session_id}/rated/movies?api_key=af95f78c831f3180d61fc95fdebb33a0`;
  //   const dataGetRated = await fetch(urlGetRated);
  //   const { results, total_pages } = await dataGetRated.json();
  //   console.log(results);

  //   setRated(results);
  //   // setTotalPagesSearch(total_pages);
  // };

  // useEffect(
  //   (movie, rate) => {
  //     if (movie) {
  //       rateMovie((movie, rate));
  //     }
  //   },
  //   [pagesSearch, rated]
  // );

  //  const addToRated = (movie) => {
  //    const check = ratedMovies.every((item) => item.id !== movie.id);

  //    // console.log(movie);
  //    if (check) {
  //      setRatedMovies([...ratedMovies, movie]);
  //    } else return;

  //    // console.log(rated);
  //    // localStorage.setItem(JSON.stringify(movie.id), JSON.stringify(movie));
  //  };

  // const getRatedMovie = async () => {
  //   const urlGetRate = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?${API_KEY}`;
  //   const dataGetRated = await fetch(urlGetRate);
  //   console.log(data);
  //   setRated(data);
  //   console.log(rated);
  // };
  // getRatedMovie();

  // const searchMovies = async (query) => {
  //   try {
  //     setLoading(true);
  //     const url = `${API_SEARCH}${query}&language=en-US&page=${pages}`;
  //     const data = await fetch(url);
  //     const { results, total_results } = await data.json();
  //     console.log(results);

  //     setMovieData(results);
  //     setTotalPages(total_results);
  //     setMovieAlert(false);

  //     // if (!query.length) {
  //     //   setMovieData(trendMovies);
  //     // }
  //     if (total_results === 0 && query) {
  //       setMovieAlert(true);
  //     }
  //   } catch (e) {
  //     setShowAlert(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   searchMovies(query, pages);
  // }, [query, pages]);

  // async function getMovieData() {
  //   try {
  //     setLoading(true);
  //     const data = await fetch(
  //       `${BASIC_URL}trending/movie/day?${API_KEY}&media_type=movie&page=${pages}`
  //     );

  //     const { results, total_pages } = await data.json();

  //     console.log(results);
  //     // setMovieData(results);
  //     // setTrendMovies(results);
  //     setLoading(false);
  //     setTotalPages(total_pages);
  //   } catch (e) {
  //     if (e) {
  //       setShowAlert(true);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getMovieData(pages);
  // }, [pages]);

  // const updateMovie = (movie, value) => {
  //   console.log({ ...movie, value: value });
  //   console.log(value);
  //   return { ...movie, rating: value };
  // };

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

  // async function getMovieGenre() {
  //   try {
  //     const data = await fetch(
  //       `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-US`
  //     );
  //     const { genres } = await data.json();
  //     setGenres(genres);
  //   } catch (err) {
  //     throw new Error("Can`t get genres at the Movie DB");
  //   }
  // }
  // useEffect(() => {
  //   getMovieGenre();
  // }, []);

  // const getMoviesByGenres = async (id) => {
  //   setLoading(true);
  //   const data = await fetch(
  //     `https://api.themoviedb.org/3/discover/movie?&language=en-US&page=${pages}&${API_KEY}&with_genres=${id}`
  //   );
  //   console.log(pages);
  //   const { results, total_pages } = await data.json();
  //   setMovieData(results);
  //   setTotalPages(total_pages);
  //   setLoading(false);

  // setResults(results);
  // try {
  //   for (let genre of genres) {
  //     const data = await fetch(
  //       `https://api.themoviedb.org/3/discover/movie?${API_KEY}&with_genres=${genre.id}`
  //     );
  //     const { results } = await data.json();
  //     // results.map((result) => console.log(result));
  //     setResults(results);
  //     // console.log(results);
  //   }
  // } catch (err) {
  //   throw new Error("Can`t connect to the Movie DB");
  // }
  // };
  // useEffect((id) => {
  //   getMoviesByGenres(id);
  // }, []);
  // useEffect(
  //   (id) => {
  //     getMovieGenre(id, pages);
  //   },
  //   [pages]
  // );

  const items = [
    {
      label: "Search",
      key: "1",
      children: (
        <TabSearch
          // query={query}
          // searchMovies={searchMovies}
          // setQuery={setQuery}
          // movieData={movieData}
          // setMovieData={setMovieData}
          substractScript={substractScript}
          substractTitle={substractTitle}
          // loading={loading}
          // movieAlert={movieAlert}
          // rated={rated}
          // setRated={setRated}
          // rateMovie={rateMovie}
          // addToRated={addToRated}
          // pages={pages}
          // setPages={setPages}
          // totalPages={totalPages}
          // genres={genres}
        />
      ),
    },
    {
      label: "Rated",
      key: "2",
      children: (
        <TabRated
          // rated={rated}
          // setRated={setRated}
          substractScript={substractScript}
          substractTitle={substractTitle}
          // // totalPagesSearch={totalPagesSearch}
          // pagesSearch={pagesSearch}
          // setPagesSearch={setPagesSearch}
          // rateMovie={rateMovie}
          // addToRated={addToRated}
          // // genres={genres}
          onClick={() => getRatedMovie()}
        />
      ),
    },
  ];

  return (
    <>
      <Online>
        {showAlert ? (
          <AlertMessage BASIC_URL={BASIC_URL} />
        ) : (
          <>
            <ApiService>
              {" "}
              {/* <DataContext.Provider */}
              {/* value={{
                  genres,
                  ratedMovies,
                  // updateMovie,
                  getMoviesByGenres,
                  results,
                  substractTitle,
                  substractScript,
                }}
              > */}
              <Tabs
                centered
                items={items}
                style={{
                  margin: "auto",
                }}
                destroyInactiveTabPane={true}
              >
                <TabSearch />

                <TabRated
                // rated={rated}
                // setMovieData={setMovieData}
                // substractScript={substractScript}
                // substractTitle={substractTitle}
                // loading={loading}
                // // totalPagesSearch={totalPagesSearch}
                // pagesSearch={pagesSearch}
                // setPagesSearch={setPagesSearch}
                />
              </Tabs>
              {true ? (
                <Pagination
                  style={{ textAlign: "center", marginTop: "20px" }}
                  current={pages}
                  total={totalPages}
                  onChange={(page) => setPages(page)}
                  defaultCurrent={1}
                />
              ) : null}
              {/* </DataContext.Provider> */}
            </ApiService>
          </>
        )}
      </Online>

      <Offline>
        <OfflineScreen />
      </Offline>
    </>
  );
}

root1.render(<App />);
