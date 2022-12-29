import React, {useEffect, useState} from "react";

import {API_URL} from "./api";
import {Folders} from "./components/Folders";
import {IData} from "./types";
import {AppContext} from "./utils/context";

import "./styles/index.scss";

const App: React.FC = () => {
    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((d) => setData(d));
    }, []);

    return (
        <AppContext.Provider value={data}>
            <div className="app">
                <Folders />
            </div>
        </AppContext.Provider>
  );
};

export default App;
