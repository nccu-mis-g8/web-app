import { useState } from "react";
import default_avatar200 from "../../images/default_avatar200.png";
import image from "../../images/image.png";
import image_library from "../../images/image_library.png";
import classes from "./UserInfoAvatar.module.css";

function UserInfoMainFrame() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const lastName = localStorage.getItem("lastName");
    const firstName = localStorage.getItem("firstName");
    const name = lastName + firstName;
    const account = localStorage.getItem("account");

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
        setSelectedFile(file);
        console.log(file);
    }

    return (
        <div className={classes.avatarContainer}>
            <div className={classes.avatarWrapper}>
                <img
                    src={default_avatar200}
                    alt="頭像"
                    className={classes.avatar}
                />
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