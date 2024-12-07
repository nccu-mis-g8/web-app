import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import default_avatar200 from "../../images/default_avatar200.png";
import send_photo from "../../images/send_photo.png";
import question from "../../images/question.png";
import classes from "./UserInfoAvatar.module.css";
import { uploadUserAvatar } from "../../utils/userInfoUtils";
import { refresh } from "../../utils/tokenUtils";

function UserInfoMainFrame() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userAvatar, setUserAvatar] = useState(default_avatar200);

    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const lastName = localStorage.getItem("lastName");
    const firstName = localStorage.getItem("firstName");
    const name = lastName + firstName;

    useEffect(() => {
        // Check if there's a user avatar in localStorage
        const storedAvatar = localStorage.getItem("photo");
        if (storedAvatar) {
            setUserAvatar(storedAvatar);
        } else {
            setUserAvatar(default_avatar200); // Use default avatar if none is found
        }
    }, []);

    function avatarClickHandler() {
        setShowOption(!showOption);
    }

    function viewModalHandler() {
        setShowModal(true);
        setShowOption(false);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    function changeAvatarHandler() {
        setShowOption(false);
        document.getElementById("fileInput").click();
    }

    async function fileChangeHandler(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        setSelectedFile(file);

        const accessToken = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await uploadUserAvatar(formData);

            if (response.status === 200) {
                console.log("上傳成功");
                const responseData = await response.json();
                localStorage.setItem("photo", responseData.user_avatar);
                window.location.reload();
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
                if (checkReTokenStatus) {
                    const response = await uploadUserAvatar(formData);
                    if (response.status === 200) {
                        console.log("上傳成功");
                        const responseData = await response.json();
                        localStorage.setItem("photo", responseData.user_avatar);
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
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning inference model: ", error);
            redirect("/login");
        }
    }

    return (
        <div className={classes.avatarContainer}>
            <div className={classes.header}>
                <div className={classes.title}>個人資料</div>
            </div>
            <div className={classes.avatarWrapper}>
                <img src={userAvatar} alt="頭像" className={classes.avatar} />
                <div className={classes.overlay} onClick={avatarClickHandler}>
                    <i className="fas fa-pen" />
                </div>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={fileChangeHandler}
                />

                {showOption && (
                    <div className={classes.avatarOptions}>
                        <div className={classes.buttonContainer}>
                            <img src={send_photo} alt="查看" />
                            <button
                                className={classes.button}
                                onClick={viewModalHandler}
                            >
                                查看大頭貼
                            </button>
                        </div>
                        <div className={classes.buttonContainer}>
                            <img src={send_photo} alt="更換" />
                            <button
                                className={classes.button}
                                onClick={changeAvatarHandler}
                            >
                                更換大頭貼
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={classes.nameContainer}>
                <div className={classes.nameTitle}>姓名 :</div>
                <div className={classes.name}>{name}</div>
            </div>
            <div className={classes.email}>{email}</div>

            {showModal && (
                <div className={classes.modal} onClick={closeModalHandler}>
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={userAvatar}
                            alt="頭像"
                            className={classes.largeAvatar}
                        />
                        <span
                            className={classes.closeButton}
                            onClick={closeModalHandler}
                        >
                            &times;
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserInfoMainFrame;
