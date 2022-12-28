import React, {ReactElement} from "react";

export interface IMenuCords {
    mouseX: number | null;
    mouseY: number | null;
}

export interface IData {
    id: string;
    name: string;
    parent_id: string;
}

export interface IContextMenu {
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleClose: () => void;
    menuCords: IMenuCords;
}

export interface IFolderItems {
    name: string;
    children: ReactElement | undefined;
    objChildLength: number;
}