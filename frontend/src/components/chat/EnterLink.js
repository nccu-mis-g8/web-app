import { useState } from "react";
import { redirect } from "react-router-dom";
import close_btn from "../../images/close_button.png";
import { createModelByLink } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./EnterLink.module.css";

function EnterLink({ onClick, onClickCloseBtn }) {
    const [link, setLink] = useState("");
    const [error, setError] = useState("");

    function linkChangeHandler(e) {
        setLink(e.target.value);
    }

    async function createModelByLinkHandler() {
        try {
            const response = await createModelByLink(link);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                onClickCloseBtn();
                window.location.reload();

            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
                if (checkReTokenStatus) {
                    const response = await createModelByLink(link);
                    if (response.status === 200) {
                        onClickCloseBtn();
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
                setError(error);
            }
        } catch (error) {
            console.error("Error durning create model by link: ", error);
            redirect("/login");
        }
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
                        <input
                            className={classes.linkInput}
                            onChange={linkChangeHandler}
                        />
                    </div>
                </div>
                <div className={classes.error}>{error}</div>
                <button
                    className={classes.createBtn}
                    disabled={!link}
                    onClick={createModelByLinkHandler}
                >
                    創立聊天對象
                </button>
            </div>
        </div>
    );
}

export default EnterLink;
