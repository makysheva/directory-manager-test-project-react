import React from "react";
import {IData, ITree} from "../../types";

export const AppContext = React.createContext<IData[]>([]);
export const TreeContext = React.createContext<ITree>({} as ITree);
