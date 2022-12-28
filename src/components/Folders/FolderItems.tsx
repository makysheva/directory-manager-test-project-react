import React, {FC, useState} from "react";
import {IFolderItems, IMenuCords} from "../../types";
import {initialState} from "../../utils/constants/menuCords";
import {ContextMenu} from "../ContextMenu";

import styles from "./Folders.module.scss";

export const FolderItems: FC<IFolderItems> = ({
  name,
  children,
}) => {
    const [openMenuItem, setOpenMenuItem] = useState(false);
    const [menuCords, setMenuCords] = useState<IMenuCords>(initialState);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMenuCords({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
        setOpenMenuItem(!openMenuItem);
    };

    const handleClose = () => {
        setMenuCords(initialState);
    };

    return(
        <li className={styles.inner}>
            <div className={styles.field}>
                <div onContextMenu={handleClick}>{name}</div>
                <img
                    src={openMenuItem ? "images/caret-up.svg" : "images/caret-down.svg"}
                    alt={name}
                    className={styles.arrow}
                />
            </div>
            <div>{children}</div>
            <ContextMenu menuCords={menuCords} handleClick={handleClick} handleClose={handleClose}  />
        </li>
    );
};
