import React from "react";
import { useState, useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import { Tabs } from "antd";
import { Offline, Online } from "react-detect-offline";

import AlertMessage from "./components/alert-message";
import OfflineScreen from "./components/offline-screen";
import TabSearch from "./components/tab-search";
import TabRated from "./components/tab-rated";
import { DataContext } from "./components/api-service";
import { ApiService } from "./components/api-service";

const root = document.getElementById("root");
const root1 = createRoot(root);

const BASIC_URL = "https://api.themoviedb.org/3/";

export function App() {
  const { showAlert, genres } = useContext(DataContext);

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

  const addToRated = (movie, value) => {
    if (ratedMovies) {
      const check = ratedMovies.every((item) => item.id !== movie.id);

      if (check) {
        const update = [...ratedMovies];
        setRatedMovies([...update, movie]);
      } else return;

      localStorage.setItem(JSON.stringify(movie.id), JSON.stringify(value));
    }
  };

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

  const tabItems = [
    {
      label: "Search",
      key: "1",
      children: (
        <TabSearch
          substractScript={substractScript}
          substractTitle={substractTitle}
          addToRated={addToRated}
        />
      ),
    },
    {
      label: "Rated",
      key: "2",
      children: (
        <TabRated
          substractScript={substractScript}
          substractTitle={substractTitle}
          addToRated={addToRated}
          ratedMovies={ratedMovies}
          genres={genres}
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
            {" "}
            <ApiService>
              <Tabs
                centered
                items={tabItems}
                style={{
                  margin: "auto",
                }}
                destroyInactiveTabPane={true}
              >
                <TabSearch />
                <TabRated />
              </Tabs>
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
