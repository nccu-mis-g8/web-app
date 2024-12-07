import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import classes from "./ChatRoomHeader.module.css";
import goBack from "../../images/goBack.png";
import share from "../../images/share.png";
import question from "../../images/question.png";
import { getShareLink } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";

function ChatRightHeader({name, modelName, viewInfoModal}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    function goBackHandler() {
        navigate("/");
    }

    async function shareHandler() {
        const formData = new FormData();
        formData.append("modelname", modelName);

        try {
            const response = await getShareLink(formData);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                const responseData = await response.json();
                await navigator.clipboard.writeText(responseData.link);
                setShowTooltip(true);
                setTimeout(() => {
                    setShowTooltip(false); // 1.5 秒後隱藏提示
                }, 1500);

            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
                if (checkReTokenStatus) {
                    const response = await getShareLink(formData);
                    if (response.status === 200) {
                        const responseData = await response.json();
                        await navigator.clipboard.writeText(responseData.link);
                        setShowTooltip(true);
                        setTimeout(() => {
                            setShowTooltip(false); // 1.5 秒後隱藏提示
                        }, 1500);
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
            console.error("Error durning get share link: ", error);
            redirect("/login");
        }
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
                    <div className={classes.infoBtn}>
                        <img src={question} alt="更多資訊" className={classes.question} onClick={viewInfoModal} />
                        <div className={classes.lightRays}>
                            <div className={classes.lightRay}></div>
                            <div className={classes.lightRay}></div>
                            <div className={classes.lightRay}></div>
                            <div className={classes.lightRay}></div>
                            <div className={classes.lightRay}></div>
                        </div>
                    </div>
                </div>
            </div>
            {showTooltip && (
                <div className={classes.tooltip}>已複製分享連結</div>
            )}
        </div>
    );
}

export default ChatRightHeader;
