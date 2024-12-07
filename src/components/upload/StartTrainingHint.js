import { useNavigate } from "react-router-dom";
import classes from "./StartTrainingHint.module.css";

function StartTrainingHint({ closeModal, goCheckStatus }) {
    const navigate = useNavigate();

    function goChatRoomHandler() {
        navigate("/");
    }

    function goCheckStatusHandler() {
        closeModal();
        goCheckStatus();
    }

    return (
        <div className={classes.container}>
            <div className={classes.firstHint}>模型已經開始訓練，請至【查看進度】確認</div>
            <div className={classes.secondHint}>模型完成訓練後會自動更新至聊天對象</div>
            <div className={classes.btnContainer}>
                <button className={classes.leftBtn} onClick={goChatRoomHandler}>返回選擇聊天室</button>
                <button className={classes.rightBtn} onClick={goCheckStatusHandler}>前往查看進度</button>
            </div>
        </div>
    );
}

export default StartTrainingHint;