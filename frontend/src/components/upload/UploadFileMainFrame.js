import { useState } from "react";
import logo from "../../images/default_avatar.png";
import classes from "./UploadFileMainFrame.module.css";

function UploadFileMainFrame({ viewModal }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

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

    async function trainingHandler() {
        viewModal();
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <div className={classes.content}>選擇訓練檔案資料 :</div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className={classes.fileInput}
                />
                <div className={classes.actualFileInput}>
                    <div className={classes.fileName}>{fileName}</div>
                    <label htmlFor="fileInput" className={classes.fileBtn}>
                        選擇圖片
                    </label>
                </div>
            </div>
            <div className={classes.hintContainer}>
                <img src={logo} alt="Logo" className={classes.logo} />
                <div className={classes.right}>
                    <div className={classes.hintBubble}>本平台支援 txt 及 csv 格式喔</div>
                    <button className={classes.trainingBtn} disabled={!file} onClick={trainingHandler}>開始訓練</button>
                </div>
            </div>
        </div>
    );
}

export default UploadFileMainFrame;
