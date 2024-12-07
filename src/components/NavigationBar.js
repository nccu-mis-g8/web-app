import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import bot_avatar from "../images/bot_avatar.png";
import chat from "../images/chat.png";
import upload from "../images/upload.png";
import notebook from "../images/notebook.png";
import logout from "../images/logout.png";
import LogoutMenu from "./LogoutMenu";

function NavigationBar() {
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);
    const [userAvatar, setUserAvatar] = useState(bot_avatar);
    const [hasPhoto, setHasPhoto] = useState(false);
    localStorage.getItem("photo");

    useEffect(() => {
        // Check if there's a user avatar in localStorage
        const storedAvatar = localStorage.getItem("photo");
        if (storedAvatar) {
            setUserAvatar(storedAvatar);
            setHasPhoto(true)
        } else {
            setUserAvatar(bot_avatar); // Use default avatar if none is found
            setHasPhoto(false);
        }
    }, []);

    const location = useLocation();
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

    function redirectToNotepad() {
        navigate("/notepad");
    }
    
    const isInChatRoom = location.pathname === "/" || location.pathname.startsWith("/message/");
    const isInUpload = location.pathname === "/upload" || location.pathname.startsWith("/upload/");
    const isInNotepad = location.pathname === "/notepad" || location.pathname.startsWith("/notepad/");

    return (
        <div className={classes.barContainer}>
            <div className={classes.iconContainer}>
                <img src={userAvatar} className={`${classes.userIcon} ${hasPhoto ? classes.userIconRadius : ''}`} alt="使用者資訊" onClick={redirectToUserInfo}/>
                <div className={classes.userInfo}>個人資料</div>
                <div className={location.pathname === "/user_info" ? classes.activeIndicator : classes.emptyIndicator}></div>
            </div>
            <div className={classes.iconContainer}>
                <img src={chat} className={classes.icon} alt="聊天室" onClick={redirectToChat}/>
                <div className={isInChatRoom ? classes.activeIndicator : classes.emptyIndicator}></div>
            </div>
            <div className={classes.iconContainer}>
                <img src={upload} className={classes.icon} alt="上傳" onClick={redirectToUpload}/>
                <div className={isInUpload ? classes.activeIndicator : classes.emptyIndicator}></div>
            </div>
            <div className={classes.iconContainer}>
                <img src={notebook} className={classes.icon} alt="記事本" onClick={redirectToNotepad} />
                <div className={isInNotepad ? classes.activeIndicator : classes.emptyIndicator}></div>
            </div>
            <img src={logout} className={classes.logout} alt="登出" onClick={toggleLogoutMenu}/>
            { showLogoutMenu && <LogoutMenu cancelLogout={cancelLogout} /> }
        </div>
    );
}

export default NavigationBar;