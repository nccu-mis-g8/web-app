import { useState } from "react";
import nextImg from "../../images/goBack_white.png";
import default_avatar from "../../images/default_avatar.png";
import classes from "./CheckStatusMainFrame.module.css";

function CheckStatusMainFrame() {
    const [isTraining, setIsTraining] = useState(true);

    return (
        <div className={classes.outerContainer}>
            <img src={nextImg} alt="上一個" className={classes.leftImg} />
            <div className={classes.contentContainer}>
                <img src={default_avatar} alt="預設頭像" className={classes.avatar} />
                <div className={classes.name}>姓名 : </div>

                {isTraining ? (
                    <div className={classes.startTime}>開始時間 : 2024/10/16 11:04:20</div>
                ) : (
                    <div className={classes.startTime}>完成時間 : 2024/10/16 11:04:20</div>
                )}

                {isTraining ? (
                    <div className={classes.training}>狀態 : 訓練中</div>
                ) : (
                    <div className={classes.finishTraining}>狀態 : 訓練成功</div>
                )}
                
                {isTraining ? (
                    <div className={classes.blank}></div>
                ) : (
                    <div className={classes.finishHint}>已自動新增至聊天對象</div>
                )}
            </div>
            <img src={nextImg} alt="下一個" className={classes.rightImg} />
        </div>
    );
}

export default CheckStatusMainFrame;
