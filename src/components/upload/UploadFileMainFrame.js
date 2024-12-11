import { useState } from "react";
import { redirect } from "react-router-dom";
import logo from "../../images/default_avatar.png";
import { uploadTxt, startTraining, uploadCsv } from "../../utils/uploadUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./UploadFileMainFrame.module.css";

function UploadFileMainFrame({ viewModal, id, modelName }) {
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
        try {
            const isTxtFile = file.type === "text/plain" || file.name.endsWith(".txt");
            const formDataUpload = new FormData();
            formDataUpload.append("user_info", JSON.stringify({ model_Id: String(id), master_name: masterName }));
            formDataUpload.append("file", file);

            const formDataTrain = new FormData();
            formDataTrain.append("model_id", id);

            let response;

            if (isTxtFile) {
                response = await uploadTxt(formDataUpload);
            } else {
                response = await uploadCsv(formDataUpload);
            }
            
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                console.log("上傳成功");
                const responseTrain = await startTraining(formDataTrain);
                // console.log("開始訓練成功");
                // viewModal();

                if (responseTrain.status === 200) {
                    console.log("開始訓練成功");
                    viewModal();
                }

            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();

                if (checkReTokenStatus) {
                    const response = await uploadTxt(formDataUpload);

                    if (response.status === 200) {
                        console.log("上傳成功");
                        const responseTrain = await startTraining(formDataTrain);
                        // console.log("開始訓練成功");
                        // viewModal();
        
                        if (responseTrain.status === 200) {
                            console.log("開始訓練成功");
                            viewModal();
                        }
                    } 

                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    redirect("/login");
                }
            }
            // 發生其他問題
            redirect("/login");
        } catch (error) {
            console.error("Error durning train model: ", error);
        }
        
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
