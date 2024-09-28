import { useState, useEffect } from "react";
import default_avatar200 from "../../images/default_avatar200.png";
import image from "../../images/image.png";
import image_library from "../../images/image_library.png";
import classes from "./UserInfoAvatar.module.css";
import { getUserAvatar } from "../../utils/userInfoUtils";

function UserInfoMainFrame() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userAvatar, setUserAvatar] = useState(default_avatar200);

    const userId = localStorage.getItem("userId");
    const lastName = localStorage.getItem("lastName");
    const firstName = localStorage.getItem("firstName");
    const name = lastName + firstName;
    const account = localStorage.getItem("account");

    useEffect(() => {
        async function fetchUserAvatar() {
            const avatarUrl = await getUserAvatar();
            if (avatarUrl) {
                setUserAvatar(avatarUrl);
            } else {
                setUserAvatar(default_avatar200);
            }
        }
        fetchUserAvatar();
    }, [])

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

        const formData = new FormData();
        const userInfo = JSON.stringify({ user_Id: userId });
        formData.append("user_info", userInfo);
        formData.append("file", file);

        try {
            const response = await fetch(
                "http://127.0.0.1:5001/userinfo/user/upload_photo",
                {
                    method: "POST",
                    body: formData,
                }
            );

            console.log(response);

            if (response.status === 200) {
                console.log("上傳成功");
                alert("上傳成功!");
                const responseUrl = await getUserAvatar();
                if(responseUrl) {
                    setUserAvatar(responseUrl);
                } else {
                    alert("重載大頭貼時發生錯誤，請稍後再試");
                }
            } else if (response.status === 400) {
                const responseData = await response.json();
                const error = responseData.message;
                console.log("錯誤訊息" + error);
                alert("請上傳正確格式的圖片");
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className={classes.avatarContainer}>
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
                            <img src={image} alt="查看" />
                            <button
                                className={classes.button}
                                onClick={viewModalHandler}
                            >
                                查看大頭貼
                            </button>
                        </div>
                        <div className={classes.buttonContainer}>
                            <img src={image_library} alt="更換" />
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

            <div className={classes.name}>{name}</div>
            <div className={classes.account}>{account}</div>

            {showModal && (
                <div className={classes.modal} onClick={closeModalHandler}>
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={default_avatar200}
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
