import { useState } from "react";
import logo from "../../images/default_avatar.png";
import classes from "./UploadFileMainFrame.module.css";

function UploadFileMainFrame({ viewModal }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [masterName, setMasterName] = useState(".");
    const [isTxt, setIsTxt] = useState(false);

    function fileChangeHandler(e) {
        const file = e.target.files[0];
        const isTxtFile = file.type === "text/plain" || file.name.endsWith(".txt");

        if (isTxtFile) {
            setIsTxt(true);
            setMasterName("");
        }

        if (file) {
            setFileName(file.name);
            setFile(file);
        } else {
            setFileName("");
            setFile(null);
        }
    }

    function masterChangeHandler(e) {
        setMasterName(e.target.value);
    }

    async function trainingHandler() {
        viewModal();
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.inputContainer} ${!isTxt ? classes.notTxt : ''} ${isTxt ? classes.isTxt : ''}`}>
                <div className={classes.content}>選擇訓練檔案資料 :</div>
                <input
                    id="fileInput"
                    type="file"
                    accept=".txt, .csv"
                    onChange={fileChangeHandler}
                    className={classes.fileInput}
                />
                <div className={classes.actualFileInput}>
                    <div className={classes.fileName}>{fileName}</div>
                    <label htmlFor="fileInput" className={classes.fileBtn}>
                        選擇檔案
                    </label>
                </div>
            </div>
            {isTxt && <div className={`${classes.inputContainer} ${isTxt ? classes.isTxt2 : ''}`}>
                <div className={classes.content}>訓練對象名稱 :</div>
                <input type="text" className={classes.masterName} onChange={masterChangeHandler} />
            </div>}
            <div className={classes.hintContainer}>
                <img src={logo} alt="Logo" className={classes.logo} />
                <div className={classes.right}>
                    <div className={classes.hintBubble}>本平台支援 txt 及 csv 格式喔</div>
                    <button className={classes.trainingBtn} disabled={!file || !masterName} onClick={trainingHandler}>開始訓練</button>
                </div>
            </div>
        </div>
    );
}

export default UploadFileMainFrame;
