import { useState } from "react";
import close_btn from "../../images/close_button.png";
import classes from "./EnterLink.module.css";

function EnterLink({ onClick, onClickCloseBtn }) {
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    
    function linkChangeHandler(e) {
        setLink(e.target.value);
    }

    async function createModelByLinkHandler() {
        onClickCloseBtn();
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
                        <div className={classes.link}>模型連結</div>
                        <span className={classes.starSign}>*</span>
                        <span className={classes.colon}>:</span>
                        <input className={classes.linkInput} onChange={linkChangeHandler} />
                    </div>
                </div>
                <div className={classes.error}>{error}</div>
                <button className={classes.createBtn} disabled={!link} onClick={createModelByLinkHandler} >創立聊天對象</button>
            </div>
        </div>
    );
}

export default EnterLink;