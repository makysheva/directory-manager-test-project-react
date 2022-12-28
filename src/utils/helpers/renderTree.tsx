import React from "react";
import {FolderItems} from "../../components/Folders/FolderItems";

export const renderTree = (arr: any[], parentIndex: number) => {
    const treeItems = arr.map((obj, itemIndex) => {
        let children;
        const index = parentIndex - itemIndex;
        if (obj.children) {
            children = (
                <ul className={obj.parent_id === null ? "open" : ""} key={obj.name + index}>
                    { renderTree(obj.children, index) }
                </ul>
            );
        }
        return(
           <FolderItems key={obj.name + itemIndex} name={obj.name} children={children} />
        );
    });

    return treeItems;
};
