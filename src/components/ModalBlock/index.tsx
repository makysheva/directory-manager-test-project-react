import {Modal} from "@material-ui/core";
import React, {FC, useState} from "react";
import {IModalBlock} from "../../types";

import {CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER} from "../../utils/constants/contextMenuItems";
import {getModalStyle} from "../../utils/helpers/getModalStyle";
import styles from "./ModalBlock.module.scss";

export const ModalBlock: FC<IModalBlock> = ({
    type,
    modalOpen,
    setModalOpen,
    folderName,
}) => {
    const [modalStyle] = useState(getModalStyle);
    const [createFolderName, setCreateFolderName] = useState("");
    const [editName, setEditName] = useState(folderName);

    const btnName = type.split(" ")[0];

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleCreateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setCreateFolderName(value);
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setEditName(value);
    };

    const handleDelete = () => {
        setModalOpen(false);
        alert("Папка удалена");
    };

    const handleClick = () => {
        if (createFolderName.length !== 0) {
            alert("Папка создана");
            setModalOpen(false);
        } else {
            alert("Введите название папки");
        }
    };

    return(
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
            >
                <div className={styles.modal} style={modalStyle}>
                    <div className={styles.header}>
                        <div>{type}</div>
                        <div onClick={handleClose} className={styles.close}>
                            <img
                                src="/images/close-icon.svg"
                                alt="close"
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        {
                            type === CREATE_FOLDER ?
                                <input onChange={handleCreateName} value={createFolderName} />
                                : null
                        }
                        {
                            type === EDIT_FOLDER ?
                                <input onChange={handleChangeName} value={editName} />
                                : null
                        }
                        {
                            type === DELETE_FOLDER ?
                                <div>Вы действительно хотите удалить папку?</div>
                                : null
                        }
                    </div>
                    <div>
                        <button onClick={type === DELETE_FOLDER ? handleDelete : handleClick}>{btnName}</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
