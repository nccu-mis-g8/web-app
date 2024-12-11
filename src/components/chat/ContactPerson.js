import { useState } from "react";
import { redirect } from "react-router-dom";
import def_avatar from "../../images/default_avatar.png";
import classes from "./ContactPerson.module.css";
import { deleteModel } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";

function ContactPerson({ name, modelId, personality, photo, isSelected, onClick, isShared }) {
    const [showModal, setShowModal] = useState(false);

    const handleRightClick = (event) => {
        event.preventDefault(); // 阻止預設右鍵選單
        if(isShared === false) {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    async function handleConfirmDelete() {

        try {
            const response = await deleteModel(modelId);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                setShowModal(false);
                console.log("刪除模型成功");
                window.location.reload();
            } else if (response.status === 400) {
                const responseData = await response.json();
                const error = responseData.error;
                console.log("錯誤訊息: " + error);
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
        
                if (checkReTokenStatus) {
                    const response = await deleteModel(modelId);
        
                    if (response.status === 200) {
                        setShowModal(false);
                        console.log("刪除模型成功");
                        window.location.reload();
                    }
                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    return redirect("/login");
                }
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning delete model: ", error);
            redirect("/login");
        }
    };

    return (
        <div
            className={`${classes.container} ${
                isSelected ? classes.isSelected : ""
            } ${!showModal ? classes.disableInteraction : ""}`}
            onClick={onClick}
            onContextMenu={handleRightClick}
        >
            <img src={photo} alt="模型頭像" className={classes.avatar} />
            <div className={classes.content}>
                <div className={classes.name}>姓名： {name}</div>
                <div className={classes.personality}>
                    個性留言： {personality}
                </div>
            </div>
            {showModal && (
                <div className={classes.modalBackdrop} onClick={handleCloseModal}>
                    <div className={classes.modal} onClick={(event) => event.stopPropagation()}>
                        <p>是否要刪除此模型</p>
                        <div className={classes.modalButtons}>
                            <button
                                className={classes.cancelButton}
                                onClick={handleCloseModal}
                            >
                                否
                            </button>
                            <button
                                className={classes.confirmButton}
                                onClick={handleConfirmDelete}
                            >
                                是
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactPerson;
