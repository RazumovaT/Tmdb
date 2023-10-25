import React from "react";
import { useContext } from "react";
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
  const { showAlert } = useContext(DataContext);

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
