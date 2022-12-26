import React, {useEffect, useState} from "react";
import "./App.css";

interface TData {
  id: string;
  name: string;
  parent_id: string;
}

interface TTreeData {
  children: TData[];
  id: string;
  name: string;
  parent_id: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<TData[]>([]);
  const [isToggle, setIsToggle] = useState(false);

  const apiUrl = "http://localhost:3050/dir";

  useEffect(() => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((d) => setData(d));
  }, []);

  function createTree(arr: any[], idProp: string, parentProp: string) {
    const treeObj = Object.fromEntries(arr.map((n) => [ n[idProp], { ...n, children: [] } ]));

    return Object
        .values(treeObj)
        .filter((item: any) => !(treeObj[item[parentProp]] && treeObj[item[parentProp]].children.push(item)));
  }
  const tree = createTree(data, "id", "parent_id");

  function renderTree(arr: any[], parentIndex: number) {
    const treeItems = arr.map((obj, itemIndex) => {
      let children;
      const index = parentIndex - itemIndex;
      if (obj.children) {
        const openClass = isToggle ? "open" : "closed";
        children = (
            <ul className={openClass}>
              { renderTree(obj.children, index) }
            </ul>
        );
      }
      return(
          <li key={index}>
            <span onClick={() => setIsToggle(!isToggle)}>{obj.name}</span>
            {children}
          </li>
      );
    });
    return treeItems;
  }
  const treeList = renderTree(tree, 0);

  return (
      <div className="App">
        {treeList}
      </div>
  );
};

export default App;
