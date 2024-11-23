﻿import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ChatRoomHeader.module.css";
import goBack from "../../images/goBack.png";
import share from "../../images/share.png";
import question from "../../images/question.png";

function ChatRightHeader({name}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    function goBackHandler() {
        navigate("/");
    }

    function shareHandler() {
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false); // 1.5 秒後隱藏提示
        }, 1500);
    }

    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <img src={goBack} className={classes.goBack} alt="返回" onClick={goBackHandler} />
                    <span className={classes.name}>{name}</span>
                </div>
                <div className={classes.right}>
                    <img src={share} alt="分享" className={classes.share} onClick={shareHandler} />
                    <img src={question} alt="更多資訊" className={classes.question} />
                </div>
            </div>
            {showTooltip && (
                <div className={classes.tooltip}>已複製分享連結</div>
            )}
        </div>
    );
}

export default ChatRightHeader;
