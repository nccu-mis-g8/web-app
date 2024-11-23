import { useState } from "react";
import nextImg from "../../images/goBack_white.png";
import default_avatar from "../../images/default_avatar.png";
import classes from "./CheckStatusMainFrame.module.css";

function CheckStatusMainFrame({name, avatar}) {
    const [isUploaded, setIsUploaded] = useState(true);
    const [isTraining, setIsTraining] = useState(false);

    if (avatar === "") {
        avatar = default_avatar;
    }

    return (
        <div className={classes.outerContainer}>
            <img src={nextImg} alt="上一個" className={classes.leftImg} />
            <div className={classes.contentContainer}>
                <img src={avatar} alt="預設頭像" className={classes.avatar} />
                <div className={classes.name}>姓名 : {name}</div>

                {!isUploaded && (
                    <div className={classes.startTime}>開始時間 : 無</div>
                )}
                {isUploaded && isTraining && (
                    <div className={classes.startTime}>開始時間 : 2024/11/17 15:04:20</div>
                )}
                {isUploaded && !isTraining && (
                    <div className={classes.startTime}>完成時間 : 2024/11/17 15:39:44</div>
                )}

                {!isUploaded && (
                    <div className={classes.notUpload}>狀態 : 尚未上傳資料</div>
                )}
                {isUploaded && isTraining && (
                    <div className={classes.training}>狀態 : 訓練中</div>
                )}
                {isUploaded && !isTraining && (
                    <div className={classes.finishTraining}>狀態 : 訓練成功</div>
                )}
                
                {!isUploaded && (
                    <div className={classes.blank}></div>
                )}
                {isUploaded && isTraining && (
                    <div className={classes.blank}></div>
                )}
                {isUploaded && !isTraining && (
                    <div className={classes.finishHint}>已自動新增至聊天對象</div>
                )}
            </div>
            <img src={nextImg} alt="下一個" className={classes.rightImg} />
        </div>
    );
}

export default CheckStatusMainFrame;
