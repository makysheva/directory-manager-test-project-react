import {Modal} from "@material-ui/core";
import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {IModalBlock} from "../../types";

import {deleteData, editData, postData} from "../../api";
import {CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER} from "../../utils/constants/contextMenuItems";
import {AppContext, TreeContext} from "../../utils/context";
import {generateId} from "../../utils/helpers/generateId";
import {getModalStyle} from "../../utils/helpers/getModalStyle";
import {
    isUniqueGeneratedName,
    isUniqueModifiedName,
} from "../../utils/helpers/isUniqueName";
import styles from "./ModalBlock.module.scss";

export const ModalBlock: FC<IModalBlock> = ({
    type,
    modalOpen,
    setModalOpen,
    folderName,
}) => {
    const [modalStyle] = useState(getModalStyle);
    const [createFolderName, setCreateFolderName] = useState("");
    const [editFolderName, setEditFolderName] = useState(folderName);
    const [idDeletedFolder, setIdDeletedFolder] = useState("");
    const {id, parent_id, children} = useContext(TreeContext);
    const data = useContext(AppContext);

    const btnName = type.split(" ")[0];

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleCreateName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setCreateFolderName(value);
    }, []);

    const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setEditFolderName(value);
    }, []);

    const isCreateFolderType = type === CREATE_FOLDER;

    const handleClick = useCallback(async () => {
        switch (type) {
            case CREATE_FOLDER:
                if (createFolderName === "") {
                    alert("Введите название папки");
                    return;
                } else if (isUniqueGeneratedName(children, createFolderName)) {
                    await postData({
                            id: isCreateFolderType ? generateId() : id,
                            name: createFolderName,
                            parent_id: isCreateFolderType ? id : parent_id,
                    });
                    setModalOpen(false);
                    } else {
                        alert("Папка с таким именем есть в директории");
                    }
                break;
            case EDIT_FOLDER:
                if (!isUniqueModifiedName(data, editFolderName)) {
                    await editData(id, {
                        name: editFolderName,
                        parent_id,
                    });
                    setModalOpen(false);
                } else {
                    alert("Папка с таким именем есть в директории");
                }
                break;

            case DELETE_FOLDER:
                if (children) {
                    await deleteData(id);
                    setModalOpen(false);
                    return children.every(async (obj, i) => {
                        await deleteData(obj.id);
                        setModalOpen(false);
                    });
                }
                break;
        }
    }, [children, createFolderName, editFolderName, id, isCreateFolderType, parent_id, type, setModalOpen]);

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
                                <input onChange={handleChangeName} value={editFolderName} />
                                : null
                        }
                        {
                            type === DELETE_FOLDER ?
                                <div>Вы действительно хотите удалить папку?</div>
                                : null
                        }
                    </div>
                    <div>
                        <button
                            onClick={handleClick}
                        >{btnName}</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
