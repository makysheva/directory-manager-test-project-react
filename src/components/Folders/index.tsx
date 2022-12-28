import React, {useContext} from "react";
import {AppContext} from "../../utils/context";
import {createTree} from "../../utils/helpers/createTree";
import {renderTree} from "../../utils/helpers/renderTree";

export const Folders = () => {
    const data = useContext(AppContext);

    const tree = createTree(data, "id", "parent_id");

    const treeList = renderTree(tree, 0);

    return <div>{treeList}</div>;
};
