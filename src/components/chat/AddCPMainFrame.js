import { useState } from "react";
import { redirect } from "react-router-dom";
import close_btn from "../../images/close_button.png";
import default_avatar from "../../images/default_avatar.png";
import classes from "./AddCPMainFrame.module.css";
import { createModel } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";

function AddCPMainFrame({ onClick, onClickCloseBtn }) {
    const [name, setName] = useState("");
    const [personality, setPersonality] = useState("");
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

    async function setDefaultFile() {
        try {
            const response = await fetch(default_avatar);
            const blob = await response.blob();
            const defaultFile = new File([blob], "default_avatar.png", { type: blob.type });
            setFile(defaultFile);
            setFileName("default_avatar.png");
        } catch (error) {
            console.error("Error loading default avatar:", error);
        }
    }

    async function createModelHandler(e) {
        e.preventDefault(); // 阻止表單默認的提交行為
        let file_final = file;

        if (!file) {
             file_final = await setDefaultFile();
        }

        const formData = new FormData();
        formData.append("model_original_name", name);
        formData.append("anticipation", personality);
        formData.append("file", file_final);

        try {

            const response = await createModel(formData);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                onClickCloseBtn();
                console.log("創建模型成功");
                window.location.reload();
            } else if (response.status === 400) {
                const responseData = await response.json();
                const error = responseData.error;
                console.log("錯誤訊息: " + error);
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
        
                if (checkReTokenStatus) {
                    const response = await createModel(formData);
        
                    if (response.status === 200) {
                        onClickCloseBtn();
                        console.log("創建模型成功");
                        window.location.reload();
                    }
                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    redirect("/login");
                }
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning create model: ", error);
            redirect("/login");
        }
    }

    function personalityChangerHandler(e) {
        setPersonality(e.target.value);
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
                    <div className={classes.inputContainer2}>
                        <div className={classes.name}>個性留言 </div>
                        <span className={classes.starSign}>*</span>
                        <span className={classes.colon}>:</span>
                        <input className={classes.personalityInput} onChange={personalityChangerHandler} />
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
                <button className={classes.createBtn} disabled={!name || !personality} onClick={createModelHandler} >創立聊天對象</button>
            </div>
        </div>
    );
}

export default AddCPMainFrame;
