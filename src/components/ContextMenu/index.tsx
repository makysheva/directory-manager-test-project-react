import React, {FC} from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {IContextMenu} from "../../types";
import styles from "./ContextMenu.module.scss";

const items = ["Создать папку", "Редактировать папку", "Удалить папку"];

export const ContextMenu: FC<IContextMenu> = ({
  handleClick,
  handleClose,
  menuCords,
}) => {
    return(
        <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
            <Menu
                keepMounted
                open={menuCords.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    menuCords.mouseY !== null && menuCords.mouseX !== null
                        ? { top: menuCords.mouseY, left: menuCords.mouseX }
                        : undefined
                }
            >
                {
                    items.map((item, i) => (
                        <MenuItem key={item + i} className={styles.item} onClick={handleClose}>{item}</MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};
