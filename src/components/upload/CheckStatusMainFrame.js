import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import nextImg from "../../images/goBack_white.png";
import default_avatar from "../../images/default_avatar.png";
import { checkModelStatus } from "../../utils/uploadUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./CheckStatusMainFrame.module.css";

function CheckStatusMainFrame({ name, avatar, id }) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [finishTime, setFinishTime] = useState("");

    if (avatar === "") {
        avatar = default_avatar;
    }

    useEffect(() => {
        async function fetchModelStatus() {
            try {
                const response = await checkModelStatus(id);
                const accessToken = localStorage.getItem("accessToken");
    
                if (response.status === 200) {
                    const responseData = await response.json();
                    const isTrained = responseData.is_trained;
                    const startTrain = responseData.start_train;
                    const startTime = responseData.model_start_time;
                    const finishTime = responseData.model_end_time;

                    if(startTrain === true && isTrained === false) {
                        setIsUploaded(true);
                        setIsTraining(true);
                    } else if (startTrain === true && isTrained === true) {
                        setIsUploaded(true);
                        setIsTraining(false);
                    } else if (startTrain === false && isTrained === false) {
                        setIsUploaded(false);
                        setIsTraining(false);
                    }
                    
                    setStartTime(startTime);
                    setFinishTime(finishTime);
                    setFetchSuccess(true);

                } else if (response.status === 404) {
                    setIsUploaded(false);
                    setIsTraining(false);
                    setFetchSuccess(true);

                } else if (response.status === 401 && accessToken) {
                    // access Token過期，用refresh Token去拿新的access Token
                    const checkReTokenStatus = await refresh();
    
                    if (checkReTokenStatus) {
                        const response = await checkModelStatus(id);
    
                        if (response.status === 200) {
                            const responseData = await response.json();
                            const isTrained = responseData.is_trained;
                            const startTrain = responseData.start_train;
                            const startTime = responseData.model_start_time;
                            const finishTime = responseData.model_end_time
                            
                            if(startTrain === true && isTrained === false) {
                                setIsUploaded(true);
                                setIsTraining(true);
                            } else if (startTrain === true && isTrained === true) {
                                setIsUploaded(true);
                                setIsTraining(false);
                            } else if (startTrain === false && isTrained === false) {
                                setIsUploaded(false);
                                setIsTraining(false);
                            }
                            
                            setStartTime(startTime);
                            setFinishTime(finishTime);
                            setFetchSuccess(true);

                        } else if (response.status === 404) {
                            setIsUploaded(false);
                            setIsTraining(false);
                            setFetchSuccess(true);
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
                console.error("Error durning get event: ", error);
            }
        }

        fetchModelStatus();
    }, [id]);

    return (
        <div className={classes.outerContainer}>
            {/* <img src={nextImg} alt="上一個" className={classes.leftImg} /> */}
            <div className={classes.contentContainer}>
                <img src={avatar} alt="預設頭像" className={classes.avatar} />
                <div className={classes.name}>姓名 : {name}</div>

                {!fetchSuccess && (
                    <div className={classes.beforeFetch}></div>
                )}

                {fetchSuccess && !isUploaded && (
                    <div className={classes.startTime}>開始時間 : 無</div>
                )}
                {fetchSuccess && isUploaded && isTraining && (
                    <div className={classes.startTime}>開始時間 : {startTime}</div>
                )}
                {fetchSuccess && isUploaded && !isTraining && (
                    <div className={classes.startTime}>完成時間 : {finishTime}</div>
                )}

                {fetchSuccess && !isUploaded && (
                    <div className={classes.notUpload}>狀態 : 尚未上傳資料</div>
                )}
                {fetchSuccess && isUploaded && isTraining && (
                    <div className={classes.training}>狀態 : 訓練中</div>
                )}
                {fetchSuccess && isUploaded && !isTraining && (
                    <div className={classes.finishTraining}>狀態 : 訓練成功</div>
                )}
                
                {fetchSuccess && !isUploaded && (
                    <div className={classes.blank}></div>
                )}
                {fetchSuccess && isUploaded && isTraining && (
                    <div className={classes.blank}></div>
                )}
                {fetchSuccess && isUploaded && !isTraining && (
                    <div className={classes.finishHint}>已自動新增至聊天對象</div>
                )}
            </div>
            {/* <img src={nextImg} alt="下一個" className={classes.rightImg} /> */}
        </div>
    );
}

export default CheckStatusMainFrame;
