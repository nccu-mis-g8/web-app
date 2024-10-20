import { useState } from "react";
import { Form } from "react-router-dom";
import close_btn from "../../images/close_button.png";
import classes from "./AddCPMainFrame.module.css";

function AddCPMainFrame({ onClick, onClickCloseBtn }) {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState();

    function fileChangeHandler(e) {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
        } else {
            setFileName("");
            setFile(null);
        }
    }

    function nameChangeHandler(e) {
        setName(e.target.value);
    }

    return (
        <div className={classes.container} onClick={onClick}>
            <div className={classes.header}>
                <img
                    src={close_btn}
                    alt="關閉"
                    className={classes.closeImg}
                    onClick={onClickCloseBtn}
                />
            </div>
            <div className={classes.inputFrame}>
                <div className={classes.inputWrapper}>
                    <div className={classes.inputContainer}>
                        <div className={classes.name}>姓名 (模型名稱) </div>
                        <span className={classes.starSign}>*</span>
                        <span className={classes.colon}>:</span>
                        <input className={classes.nameInput} onChange={nameChangeHandler} />
                    </div>
                    <div className={classes.inputContainer}>
                        <div className={classes.avatar}>頭貼 (模型圖示)</div>
                        <span className={classes.colon2}>:</span>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={fileChangeHandler}
                            className={classes.avatarInput}
                        />
                        <div className={classes.actualAvatarInput}>
                            <div className={classes.fileName}>{fileName}</div>
                            <label
                                htmlFor="fileInput"
                                className={classes.avatarBtn}
                            >
                                選擇圖片
                            </label>
                        </div>
                    </div>
                </div>
                <button className={classes.createBtn} disabled={!name} >創立聊天對象</button>
            </div>
        </div>
    );
}

export default AddCPMainFrame;
