import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import bot_avatar from "../images/bot_avatar.png";
import chat from "../images/chat.png";
import upload from "../images/upload.png";
import logout from "../images/logout.png";
import LogoutMenu from "./LogoutMenu";
import { getUserAvatar } from "../utils/userInfoUtils";

function NavigationBar() {
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);
    const [userAvatar, setUserAvatar] = useState(bot_avatar);

    useEffect(() => {
        async function fetchUserAvatar() {
            const avatarUrl = await getUserAvatar();
            if (avatarUrl) {
                setUserAvatar(avatarUrl);
            } else {
                setUserAvatar(bot_avatar);
            }
        }
        fetchUserAvatar();
    }, [])

    const navigate = useNavigate();

    function toggleLogoutMenu() {
        setShowLogoutMenu(!showLogoutMenu);
    }

    function cancelLogout() {
        setShowLogoutMenu(false);
    }

    function redirectToUserInfo() {
        navigate("/user_info");
    }

    function redirectToChat() {
        navigate("/");
    }

    function redirectToUpload() {
        navigate("/upload");
    }
        

    return (
        <div className={classes.barContainer}>
            <img src={userAvatar} className={classes.userIcon} alt="使用者資訊" onClick={redirectToUserInfo}/>
            <img src={chat} className={classes.icon} alt="聊天室" onClick={redirectToChat}/>
            <div className={classes.illustration}>聊天室</div>
            <img src={upload} className={classes.icon} alt="上傳" onClick={redirectToUpload}/>
            <div className={classes.illustration}>上傳</div>
            <img src={logout} className={classes.logout} alt="登出" onClick={toggleLogoutMenu}/>
            <div className={classes.illustration2}>登出</div>
            { showLogoutMenu && <LogoutMenu cancelLogout={cancelLogout} /> }
        </div>
    );
}

export default NavigationBar;